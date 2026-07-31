export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: [
    {
      id: string;
      text: string;
      isCorrect: boolean;
    },
  ];
  exam: {
    id: string;
    title: string;
  };
}

export interface ExamAnswer {
  questionId: string;
  answerId: string;
}
