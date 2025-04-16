"use client";

import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  QuestionEditorHeader,
  QuestionContentArea,
} from "./QuestionHeaderContent";

interface QuestionEditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  quizId,
  onSave,
  isSaving,
}) => {
  const router = useRouter();

  // Declare the setIsSaving state setter function
  const [isSavingState, setIsSavingState] = useState(false);

  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);

  const saveQuestion = async () => {
    if (!questionText.trim() || !answer.trim()) {
      alert("Please fill in the question and answer");
      return;
    }

    const q = query(collection(db, "questions"), where("quizId", "==", quizId)); // Query to get the questions for the specific quiz
    const snapshot = await getDocs(q);
    const questionNumber = snapshot.size + 1;

    try {
      const questionPayload = {
        quizId,
        type: "question-and-answer",
        questionText,
        answer,
        points,
        timeLimit,
        questionNumber, 
        createdAt: serverTimestamp(),
      };

      // Start saving
      setIsSavingState(true);

      await addDoc(collection(db, "questions"), questionPayload);


       // Fetch the current number of questions in the quiz
       const quizDocRef = doc(db, "quizzes", quizId);
       const quizDoc = await getDoc(quizDocRef);
 
       if (quizDoc.exists()) {
         const quizData = quizDoc.data();
         const currentQuestionCount = quizData?.questions || 0;
 
         // 3. Update the question count for the quiz
         await updateDoc(quizDocRef, {
           questions: currentQuestionCount + 1, // Increment the question count
         });
       }

      // Stop saving and navigate to questions page
      setIsSavingState(false);
      router.push(`/quizs/${quizId}`); // Navigate to the questions page

    } catch (err) {
      console.error("Failed to save question:", err);
      setIsSavingState(false); // Stop saving on error
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <QuestionEditorHeader
        points={points}
        onPointsChange={setPoints}
        timeLimit={timeLimit}
        onTimeLimitChange={setTimeLimit}
        isRequired={false}
        onIsRequiredChange={() => {}}
        onSaveQuestion={saveQuestion}
        isSaving={isSavingState} // Pass isSavingState here
      />

      {/* Question content area */}
      <div className="max-w-5xl mx-auto mt-4">
        <QuestionContentArea
          questionText={questionText}
          onQuestionTextChange={setQuestionText}
        />

        {/* Answer options */}
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="mb-2 text-gray-700 font-medium">Answer:</div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-grow w-full p-2 border rounded-lg"
            placeholder="Type answer here"
          />
        </div>
      </div>
    </div>
  );
};
