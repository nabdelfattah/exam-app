import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
})
export class CircularProgressComponent implements OnInit, OnChanges, OnDestroy {
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() thresholds: { value: number; color: string }[] = [];
  @Input() autoClock: boolean = false;
  @Input() durationMs: number = 60000; // مدة اللفة الكاملة للدائرة (60 ثانية)

  private percentage = signal(0);
  private elapsedSeconds = signal(0); // إجمالي الثواني اللي عدت (بيكمل يزيد، مش بيرجع صفر)

  readonly radius = 45;
  readonly circumference = 2 * Math.PI * this.radius;

  strokeDasharray = `${this.circumference} ${this.circumference}`;

  strokeDashoffset = computed(() => {
    return ((this.circumference * (100 - this.percentage())) / 100).toString();
  });

  progressColor = computed(() => this.getThresholdColor(this.percentage()));

  // بيتحول لصيغة 05:13
  timerDisplay = computed(() => {
    const total = this.elapsedSeconds();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  });

  private rafId: number | null = null;
  private startTime: number | null = null;
  private lastSecondTick = -1;

  ngOnInit() {
    if (this.autoClock) {
      this.startClock();
    } else {
      this.updateProgress();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.autoClock) {
      this.updateProgress();
    }
  }

  ngOnDestroy() {
    this.stopClock();
  }

  private startClock() {
    const tick = (timestamp: number) => {
      if (this.startTime === null) {
        this.startTime = timestamp;
      }

      const totalElapsedMs = timestamp - this.startTime;

      // الدائرة: تلف بشكل smooth وتكمل لفة كل durationMs
      const cyclePercentage = ((totalElapsedMs % this.durationMs) / this.durationMs) * 100;
      this.percentage.set(cyclePercentage);

      // النص: يتحدث مرة واحدة بس كل ثانية، بيعد تصاعديًا من غير حد
      const totalSeconds = Math.floor(totalElapsedMs / 1000);
      if (totalSeconds !== this.lastSecondTick) {
        this.lastSecondTick = totalSeconds;
        this.elapsedSeconds.set(totalSeconds);
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private stopClock() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.startTime = null;
    this.lastSecondTick = -1;
  }

  updateProgress() {
    const pct = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.percentage.set(pct);
  }

  getThresholdColor(percentage: number): string {
    let selectedColor = 'var(--color-default)';
    for (let threshold of this.thresholds) {
      if (percentage <= threshold.value) {
        selectedColor = threshold.color;
        break;
      }
    }
    return selectedColor;
  }

  private pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
