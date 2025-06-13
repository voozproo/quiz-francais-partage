
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check, X } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onNext: () => void;
  canProceed: boolean;
  showFeedback: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  canProceed,
  showFeedback
}) => {
  const getAnswerStyle = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index
        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
        : 'bg-white/20 text-white hover:bg-white/30';
    }

    // Show feedback
    const isCorrect = index === question.correctAnswer;
    const isSelected = selectedAnswer === index;
    const wasSelectedAndWrong = isSelected && !isCorrect;

    if (isCorrect) {
      return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg';
    }
    
    if (wasSelectedAndWrong) {
      return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg';
    }

    return 'bg-white/10 text-white/60';
  };

  const getAnswerIcon = (index: number) => {
    if (!showFeedback) {
      return String.fromCharCode(65 + index);
    }

    const isCorrect = index === question.correctAnswer;
    const isSelected = selectedAnswer === index;
    const wasSelectedAndWrong = isSelected && !isCorrect;

    if (isCorrect) {
      return <Check className="w-4 h-4" />;
    }
    
    if (wasSelectedAndWrong) {
      return <X className="w-4 h-4" />;
    }

    return String.fromCharCode(65 + index);
  };

  const getAnswerIconStyle = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index 
        ? 'bg-white text-purple-600' 
        : 'bg-white/20 text-white';
    }

    const isCorrect = index === question.correctAnswer;
    const isSelected = selectedAnswer === index;
    const wasSelectedAndWrong = isSelected && !isCorrect;

    if (isCorrect) {
      return 'bg-white text-green-600';
    }
    
    if (wasSelectedAndWrong) {
      return 'bg-white text-red-600';
    }

    return 'bg-white/10 text-white/60';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-8 text-center leading-relaxed">
        {question.question}
      </h2>
      
      <div className="grid gap-4 mb-8">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && onAnswerSelect(index)}
            disabled={showFeedback}
            className={`
              p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-[1.02]
              ${getAnswerStyle(index)}
              ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold
                ${getAnswerIconStyle(index)}
              `}>
                {getAnswerIcon(index)}
              </div>
              <span className="text-lg">{answer}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            px-8 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200
            ${canProceed
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }
          `}
        >
          <span>Question Suivante</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
