export interface ExamSubmission {
  examId: string;
  answers: { questionId: string; answerId: string }[];
  startedAt: string;
}

export interface SubmissionPayload {
  submission: {
    id: string;
    userId: string;
    examId: string;
    examTitle: string;
    exam: {
      id: string;
      title: string;
      duration: number;
    };
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    startedAt: string;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
  };
  analytics: [
    {
      questionId: string;
      questionText: string;
      selectedAnswer: { id: string; text: string };
      isCorrect: boolean;
      correctAnswer: { id: string; text: string };
    },
  ];
}
