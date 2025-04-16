"use client";

import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import React, { useState, useEffect } from "react";
import { Clock, Award, X } from "lucide-react";

interface Question {
  id: string;
  questionText: string;
  timeLimit: number;
  points: number;
  answer: string;
  questionNumber: number;
}

const ParticipantQuestions = () => {
  // Steps: 1=Welcome, 2=Rules, 3=Quiz, 4=Results
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [attemptedQuestions, setAttemptedQuestions] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState<number | null>(null);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const params = useParams();
  const quizId = params.quizid as string;

  // multi-step page

  // Handle step navigation
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const goToWelcome = () => {
    setCurrentStep(1);
    // resetQuiz();
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (currentStep === 1) return 33;
    if (currentStep === 2) return 66;
    return 100;
  };

  // Determine if all questions are attempted
  const allQuestionsAttempted =
    questions.length === attemptedQuestions.length && questions.length > 0;

  // Show results when all questions are attempted
  useEffect(() => {
    if (allQuestionsAttempted && currentStep === 3) {
      setCurrentStep(4);
    }
  }, [allQuestionsAttempted, currentStep]);

  // quextions
  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(
        collection(db, "questions"),
        where("quizId", "==", quizId)
      );
      const snapshot = await getDocs(q);
      const fetchedQuestions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Question[];
      setQuestions(fetchedQuestions);
    };

    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setShowAnswer(false);
    setTimeLeft(question.timeLimit);
    setStartTime(Date.now()); // capture the start time
    setTimeSpent(null); // reset time spent
  };

  const closeQuestionDetails = () => {
    setSelectedQuestion(null);
  };

  useEffect(() => {
    if (!selectedQuestion || timeLeft === null || timeLeft <= 0 || showAnswer)
      return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedQuestion, timeLeft, showAnswer]);

  const handleShowAnswer = () => {
    if (selectedQuestion && startTime) {
      if (timerRef.current) clearInterval(timerRef.current);
      const spent = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(spent);
      setShowAnswer(true);
      setAttemptedQuestions((prev) => [...prev, selectedQuestion.id]);
    }
  };

  return (
    <div className="p-4 mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      {/* Step 1: Welcome */}
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome to the Ceremony
          </h1>
          <div className="flex justify-center mb-8">
            <span className="text-6xl">🎉</span>
          </div>
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 mb-4">
            Welcome to our special ceremony! We're delighted to have you join us
            for this memorable occasion. Today's event includes a fun quiz that
            will test your knowledge and make this gathering even more
            enjoyable.
          </p>
          <p className="text-gray-700 mb-6">
            Before we begin, we'd like to thank everyone for participating and
            bringing your enthusiasm to make this ceremony a success. The quiz
            is designed to be both entertaining and informative, so get ready
            for some fun challenges ahead!
          </p>
          <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Continue to Rules
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Rules */}
      {currentStep === 2 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Rules of the Quiz
          </h1>
          <div className="flex justify-center mb-8">
            <span className="text-6xl">📜</span>
          </div>
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Please Read Carefully
          </h2>
          <p className="text-gray-700 mb-4">
            To ensure everyone has a fair and enjoyable experience, please
            follow these simple rules:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              The quiz consists of {questions.length} multiple-choice questions
            </li>
            <li>Each question has a time limit shown on the timer</li>
            <li>Each question is worth points based on difficulty</li>
            <li>Choose your answer within the time limit</li>
            <li>You can't go back to previous questions once answered</li>
            <li>Your final score will be revealed at the end</li>
            <li>Have fun and do your best!</li>
          </ul>
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Quiz */}
      {currentStep === 3 && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Quiz Questions</h2>

          {/* Questions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {questions
              .filter((q) => !attemptedQuestions.includes(q.id))
              .map((question) => (
                <div
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className="aspect-square flex items-center justify-center bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl font-bold">
                    Q{question.questionNumber}
                  </span>
                </div>
              ))}
          </div>

          {attemptedQuestions.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-2">
                Attempted Questions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                {questions
                  .filter((q) => attemptedQuestions.includes(q.id))
                  .map((question) => (
                    <div
                      key={question.id}
                      className="aspect-square flex items-center justify-center bg-gray-100 text-gray-500 border rounded-lg shadow-sm"
                    >
                      <span className="text-2xl font-bold">
                        Q{question.questionNumber}
                      </span>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* Question Details Modal */}
          {selectedQuestion && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-10">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-xl font-bold">
                    Question {selectedQuestion.questionNumber}
                  </h3>
                  <button
                    onClick={closeQuestionDetails}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div>
                  <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 mb-6">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      TIME REMAINING
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-8 w-8 mr-3 text-indigo-600" />
                      <span className="text-5xl font-bold text-indigo-700">
                        {timeLeft}
                      </span>
                      <span className="text-2xl font-semibold text-indigo-600 ml-2">
                        seconds
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full  mt-4">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${
                            ((timeLeft ?? 0) /
                              (selectedQuestion?.timeLimit ?? 1)) *
                            100
                          }%`,
                        }}
                      ></div>

                      <div className="flex items-center justify-center">
                        {timeSpent !== null && (
                          <div className="mt-3 text-sm text-indigo-700">
                            You spent{" "}
                            <span className="font-semibold">
                              {timeSpent} seconds
                            </span>{" "}
                            answering.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Question stats */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{selectedQuestion.points} points</span>
                    </div>
                  </div>

                  {/* Question text */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Question
                    </h4>
                    <p className="text-lg">{selectedQuestion.questionText}</p>
                  </div>

                  {/* Answer */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Answer
                    </h4>
                    {!showAnswer ? (
                      <button
                        onClick={handleShowAnswer}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Show Answer
                      </button>
                    ) : (
                      <p className="p-3 bg-green-50 border border-green-100 rounded-md mt-2">
                        {selectedQuestion.answer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}



       {/* Step 4: Results */}
       {currentStep === 4 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Results</h1>
          <div className="text-center mb-6">
            <span className="text-6xl">🎊</span>
          </div>
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Score</h3>
            {/* <p className="text-4xl font-bold text-indigo-700">
              {score} / {questions.reduce((total, q) => total + q.points, 0)} points
            </p> */}
          </div>
          {/* <div className="text-center mb-8">
            {score === questions.reduce((total, q) => total + q.points, 0) ? (
              <p className="text-lg text-gray-700">Perfect score! You're a ceremony expert!</p>
            ) : score > questions.reduce((total, q) => total + q.points, 0) / 2 ? (
              <p className="text-lg text-gray-700">Great job! You know your ceremony traditions well!</p>
            ) : (
              <p className="text-lg text-gray-700">Thanks for participating! You've learned some new ceremony facts today.</p>
            )}
          </div> */}
          <div className="flex justify-center space-x-4">
            <button 
              // onClick={restartQuiz} 
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Restart Quiz
            </button>
            <button 
              onClick={goToWelcome} 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Back to Welcome
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ParticipantQuestions;
