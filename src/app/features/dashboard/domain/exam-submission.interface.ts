export interface ExamSubmission {
  examId: string;
  answers: { questionId: string; answerId: string }[];
  startedAt: string;
}
