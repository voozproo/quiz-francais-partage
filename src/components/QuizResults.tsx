
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Facebook, RefreshCw, Trophy, Star } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  onRestart
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return { message: "Exceptionnel !", emoji: "🏆", color: "from-yellow-400 to-orange-500" };
    if (percentage >= 80) return { message: "Excellent !", emoji: "🌟", color: "from-green-400 to-emerald-500" };
    if (percentage >= 70) return { message: "Très bien !", emoji: "👏", color: "from-blue-400 to-indigo-500" };
    if (percentage >= 60) return { message: "Bien !", emoji: "👍", color: "from-purple-400 to-pink-500" };
    if (percentage >= 50) return { message: "Pas mal !", emoji: "😊", color: "from-indigo-400 to-purple-500" };
    return { message: "Peut mieux faire !", emoji: "💪", color: "from-red-400 to-pink-500" };
  };

  const result = getResultMessage();

  const shareText = `J'ai obtenu ${score}/${totalQuestions} (${percentage}%) au Quiz Culture Générale ! ${result.emoji} Pouvez-vous faire mieux ?`;
  const shareUrl = window.location.href;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Culture Générale',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 animate-scale-in">
          {/* Trophy Animation */}
          <div className="mb-8">
            <div className={`bg-gradient-to-r ${result.color} rounded-full p-6 inline-block mb-4 animate-pulse`}>
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {result.message}
            </h1>
            <div className="text-6xl mb-4">{result.emoji}</div>
          </div>

          {/* Score Display */}
          <div className="bg-white/20 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-bold text-white mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-2xl text-white/80 mb-4">
              {percentage}% de réussite
            </div>
            
            {/* Score Visualization */}
            <div className="flex justify-center space-x-1 mb-4">
              {Array.from({ length: totalQuestions }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 ${
                    index < score ? 'text-yellow-400 fill-current' : 'text-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Recommencer le Quiz
            </Button>

            {/* Social Sharing */}
            <div className="pt-4">
              <h3 className="text-white text-lg mb-4 flex items-center justify-center">
                <Share2 className="w-5 h-5 mr-2" />
                Partagez votre score !
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={shareOnTwitter}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-200"
                >
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </Button>
                
                <Button
                  onClick={shareOnFacebook}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-200"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                
                {navigator.share && (
                  <Button
                    onClick={shareNative}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-200"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Partager
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
