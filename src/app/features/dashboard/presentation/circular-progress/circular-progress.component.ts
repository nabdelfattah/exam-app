import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
})
export class CircularProgressComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() thresholds: { value: number; color: string }[] = [];

  strokeDasharray: string = '';
  strokeDashoffset: string = '';
  progressColor: string = 'var(--color-primary)';

  ngOnChanges(changes: SimpleChanges) {
    this.updateProgress();
  }

  updateProgress() {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    const progress = (circumference * (100 - percentage)) / 100;

    this.strokeDasharray = `${circumference} ${circumference}`;
    this.strokeDashoffset = progress.toString();
    this.progressColor = this.getThresholdColor(percentage);
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
}
