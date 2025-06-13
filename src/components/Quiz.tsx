import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { QuizResults } from './QuizResults';
import { quizData } from '../data/quizData';
import { Button } from '@/components/ui/button';
import { Brain, Star } from 'lucide-react';

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    // Add a small delay before enabling the next button
    setTimeout(() => {
      const isCorrect = answerIndex === quizData[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setUserAnswers([...userAnswers, answerIndex]);
    }, 500);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setIsStarted(false);
    setShowFeedback(false);
  };

  const startQuiz = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 inline-block mb-6">
              <Brain className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 font-serif">
              Quiz Culture Générale
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Testez vos connaissances avec notre quiz interactif !
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 animate-scale-in">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-white text-lg">{quizData.length} questions</span>
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-white/70 text-lg">
              Répondez aux questions et partagez votre score avec vos amis !
            </p>
          </div>

          <Button 
            onClick={startQuiz}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-xl rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Commencer le Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults 
        score={score} 
        totalQuestions={quizData.length} 
        onRestart={resetQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block mb-4">
            <span className="text-white text-lg font-medium">
              Question {currentQuestion + 1} sur {quizData.length}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            />
          </div>
        </div>

        <QuestionCard
          question={quizData[currentQuestion]}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNextQuestion}
          canProceed={showFeedback}
          showFeedback={showFeedback}
        />
      </div>
    </div>
  );
};
