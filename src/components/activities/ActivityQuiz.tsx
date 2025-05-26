import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QuizItem {
  image: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

interface ActivityQuizProps {
  title: string;
  description: string;
  quizItems: QuizItem[];
  onComplete: () => void;
}

const ActivityQuiz: React.FC<ActivityQuizProps> = ({
  title,
  description,
  quizItems,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === quizItems[currentQuestion].correctAnswer;
    setLastAnswer(isCorrect ? 'correct' : 'incorrect');
    setShowExplanation(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setLastAnswer(null);
    
    if (currentQuestion < quizItems.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / quizItems.length) * 100;

  if (showResults) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Activity Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            You scored {score} out of {quizItems.length}!
          </p>
          <p className="text-muted-foreground">
            {score === quizItems.length
              ? "Perfect score! Amazing job! 🌟"
              : score >= quizItems.length / 2
              ? "Great effort! Keep practicing! 💪"
              : "Keep trying, you'll get better! 🎯"}
          </p>
          <Button onClick={onComplete} className="w-full">
            Return to Activities
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video relative rounded-lg overflow-hidden border">
          <img
            src={quizItems[currentQuestion].image}
            alt="Question"
            className="object-contain w-full h-full"
          />
        </div>
        
        {!showExplanation ? (
          <div className="grid grid-cols-2 gap-4">
            {quizItems[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 text-lg"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Alert variant={lastAnswer === 'correct' ? 'default' : 'destructive'}>
              {lastAnswer === 'correct' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {lastAnswer === 'correct' 
                  ? 'That\'s correct! Well done! 🎉'
                  : 'Not quite right. Let\'s learn why! 💪'}
              </AlertDescription>
            </Alert>
            
            {quizItems[currentQuestion].explanation && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{quizItems[currentQuestion].explanation}</p>
              </div>
            )}
            
            <Button onClick={handleNext} className="w-full">
              {currentQuestion < quizItems.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          </div>
        )}
        
        <p className="text-center text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {quizItems.length}
        </p>
      </CardContent>
    </Card>
  );
};

export default ActivityQuiz; 