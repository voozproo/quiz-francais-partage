
// Utility functions for shuffling questions and answers
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const shuffleQuestions = (questions: any[]) => {
  return shuffleArray(questions);
};

export const shuffleAnswersWithMapping = (question: any) => {
  // Create array of answers with their original indices
  const answersWithIndices = question.answers.map((answer: string, index: number) => ({
    answer,
    originalIndex: index
  }));
  
  // Shuffle the answers
  const shuffledAnswers = shuffleArray(answersWithIndices);
  
  // Find the new position of the correct answer
  const newCorrectAnswer = shuffledAnswers.findIndex(
    item => item.originalIndex === question.correctAnswer
  );
  
  return {
    ...question,
    answers: shuffledAnswers.map(item => item.answer),
    correctAnswer: newCorrectAnswer
  };
};
