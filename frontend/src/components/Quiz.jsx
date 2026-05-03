import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2, XCircle, Award, Loader2, RefreshCw } from 'lucide-react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState('loading'); // loading, ready, playing, finished
  const [error, setError] = useState(null);

  const fetchQuiz = async () => {
    setQuizState('loading');
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/quiz');
      setQuestions(response.data.quiz);
      setQuizState('ready');
      resetQuizState();
    } catch (err) {
      console.error("Failed to fetch quiz:", err);
      setError("Could not generate quiz. Please check if the backend is running and Gemini API key is set.");
      setQuizState('error');
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const resetQuizState = () => {
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  const handleStart = () => {
    setQuizState('playing');
  };

  const handleSelectAnswer = (option) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    
    setIsAnswerChecked(true);
    if (selectedAnswer === questions[currentQuestionIdx].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setQuizState('finished');
    }
  };

  if (quizState === 'loading') {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
        <h3 className="text-xl font-bold text-gray-800">Generating your dynamic quiz...</h3>
        <p className="text-gray-500 mt-2">Our AI is creating fresh questions about the election process.</p>
      </div>
    );
  }

  if (quizState === 'error') {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-red-200 p-12 flex flex-col items-center justify-center min-h-[400px]">
        <XCircle className="text-red-500 mb-4" size={48} />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h3>
        <p className="text-red-600 mb-6 text-center max-w-md">{error}</p>
        <button 
          onClick={fetchQuiz}
          className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <RefreshCw size={20} /> Try Again
        </button>
      </div>
    );
  }

  if (quizState === 'ready') {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
        <Award className="text-orange-600 mb-6" size={64} />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Election Knowledge Check</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-lg">
          Test what you've learned with this 5-question AI-generated quiz. The questions are different every time!
        </p>
        <button 
          onClick={handleStart}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-4 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizState === 'finished') {
    const percentage = (score / questions.length) * 100;
    let message = "";
    if (percentage === 100) message = "Perfect! You're a civic expert!";
    else if (percentage >= 60) message = "Great job! You know your stuff.";
    else message = "Good try! Review the timeline to learn more.";

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="relative mb-8">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
              strokeDasharray={2 * Math.PI * 88} 
              strokeDashoffset={2 * Math.PI * 88 * (1 - score / questions.length)}
              className={`${percentage >= 60 ? 'text-green-500' : 'text-yellow-500'} transition-all duration-1000 ease-out`} 
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-gray-800">
            {score}/{questions.length}
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{message}</h2>
        <p className="text-gray-600 mb-8">You scored {percentage}% on the election knowledge check.</p>
        
        <div className="flex gap-4">
          <button 
            onClick={fetchQuiz}
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <RefreshCw size={20} /> Generate New Quiz
          </button>
        </div>
      </div>
    );
  }

  // Playing state
  const currentQ = questions[currentQuestionIdx];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-orange-600 h-2 transition-all duration-300" 
          style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-end mb-6">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Question {currentQuestionIdx + 1} of {questions.length}</span>
          <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">Score: {score}</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
          {currentQ.question}
        </h3>

        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQ.answer;
            
            let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ";
            
            if (!isAnswerChecked) {
              btnClass += isSelected 
                ? "border-blue-600 bg-blue-50 text-blue-900" 
                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700";
            } else {
              if (isCorrect) {
                btnClass += "border-green-500 bg-green-50 text-green-900";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-red-500 bg-red-50 text-red-900";
              } else {
                btnClass += "border-gray-200 text-gray-400 opacity-60";
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswerChecked}
                className={btnClass}
              >
                <span className="font-medium text-lg">{option}</span>
                {isAnswerChecked && isCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                {isAnswerChecked && isSelected && !isCorrect && <XCircle className="text-red-500" size={24} />}
              </button>
            );
          })}
        </div>

        {isAnswerChecked && (
          <div className={`p-6 rounded-xl mb-8 border ${selectedAnswer === currentQ.answer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h4 className={`font-bold mb-2 flex items-center gap-2 ${selectedAnswer === currentQ.answer ? 'text-green-800' : 'text-red-800'}`}>
              {selectedAnswer === currentQ.answer ? "Correct!" : "Not quite."}
            </h4>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold block mb-1">Answer: {currentQ.answer}</span>
              {currentQ.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-end border-t border-gray-100 pt-6">
          {!isAnswerChecked ? (
            <button 
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button 
              onClick={handleNextQuestion}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors"
            >
              {currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
