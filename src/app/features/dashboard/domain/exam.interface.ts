export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: {
    id: string;
    title: string;
  };
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ExamsRes {
  status: true;
  code: 200;
  payload: {
    data: {
      id: string;
      title: string;
      description: string;
      image: string;
      duration: number;
      questionsCount: number;
      diplomaId: string;
      diploma: {
        id: string;
        title: string;
      };
      immutable: boolean;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}
export interface ExamRes {
  status: true;
  code: 200;
  payload: {
    exam: {
      id: string;
      title: string;
      description: string;
      image: string;
      duration: number;
      questionsCount: number;
      diplomaId: string;
      diploma: {
        id: string;
        title: string;
      };
      immutable: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface SubmitRes {
  status: boolean;
  code: number;
  payload: {
    submission: {
      id: string;
      examId: string;
      examTitle: string;
      score: number;
      totalQuestions: number;
      correctAnswers: number;
      wrongAnswers: number;
      submittedAt: string;
    };
    analytics: {
      questionId: string;
      questionText: string;
      selectedAnswer: {
        id: string;
        text: string;
      };
      isCorrect: boolean;
      correctAnswer: {
        id: string;
        text: string;
      };
    }[];
  };
}
