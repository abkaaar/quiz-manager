import { useState, useEffect } from "react";
import {
  ChevronDown,
  Award,
  Clock,
  Save,
  ImageIcon,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Common Question Editor Header Component
export interface QuestionEditorHeaderProps {
  points: number;
  onPointsChange: (points: number) => void;
  timeLimit: number;
  onTimeLimitChange: (seconds: number) => void;
  onSaveQuestion: () => void;
  isSaving: boolean;
  isRequired?: boolean;
  onIsRequiredChange?: (isRequired: boolean) => void;
}

export const QuestionEditorHeader = ({
  points,
  onPointsChange,
  timeLimit,
  onTimeLimitChange,
  onSaveQuestion,
  isSaving,
}: QuestionEditorHeaderProps) => {
  const [pointsMenuOpen, setPointsMenuOpen] = useState(false);
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-2 border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 relative">
            <button
              className="flex items-center bg-white border rounded-md px-3 py-1 text-sm"
              onClick={() => setPointsMenuOpen(!pointsMenuOpen)}
            >
              <Award className="mr-1 h-4 w-4" />
              {points} point{points !== 1 ? "s" : ""}
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {pointsMenuOpen && (
              <div className="absolute mt-1 w-24 bg-white rounded-md shadow-lg z-10 border">
                {[1, 2, 3, 5, 10].map((value) => (
                  <div
                    key={value}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onPointsChange(value);
                      setPointsMenuOpen(false);
                    }}
                  >
                    {value} point{value !== 1 ? "s" : ""}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mr-2 relative">
            <button
              className="flex items-center bg-white border rounded-md px-3 py-1 text-sm"
              onClick={() => setTimeMenuOpen(!timeMenuOpen)}
            >
              <Clock className="mr-1 h-4 w-4" />
              {timeLimit} seconds
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {timeMenuOpen && (
              <div className="absolute mt-1 w-32 bg-white rounded-md shadow-lg z-10 border">
                {[15, 30, 45, 60, 90, 120].map((value) => (
                  <div
                    key={value}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onTimeLimitChange(value);
                      setTimeMenuOpen(false);
                    }}
                  >
                    {value} seconds
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className={`${
              isSaving ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
            } text-white flex items-center px-4 py-1 rounded-md text-sm`}
            onClick={onSaveQuestion}
            disabled={isSaving}
          >
            <Save className="mr-1 h-4 w-4" />
            {isSaving ? "Saving..." : "Save question"}
          </button>
        </div>
      </div>
    </>
  );
};

interface QuestionContentAreaProps {
  questionText: string;
  onQuestionTextChange: (text: string) => void;
}

export const QuestionContentArea = ({
  questionText,
  onQuestionTextChange,
}: QuestionContentAreaProps) => (
  <div className="bg-purple-900 rounded-lg p-4 min-h-64 relative">
    {/* Upload button (optional file upload logic can be added later) */}
    <div className="mb-4">
      <label className="p-2 bg-purple-800 rounded-md hover:bg-purple-700 cursor-pointer inline-flex items-center">
        <ImageIcon className="h-5 w-5 text-white mr-2" />
        <span className="text-white">Upload Image</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              console.log("Selected file:", file);
            }
          }}
        />
      </label>
    </div>

    {/* Question input */}
    <textarea
      className="bg-transparent text-white text-2xl min-h-48 resize-none focus:outline-none placeholder-opacity-60 w-full"
      placeholder="Type question here"
      value={questionText}
      onChange={(e) => onQuestionTextChange(e.target.value)}
    />
  </div>
);

// Main QuestionEditor Component
const QuestionEditor = () => {
  const [points, setPoints] = useState(1);
  const [timeLimit, setTimeLimit] = useState(30);
  const [questionText, setQuestionText] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Form validation
  const isFormValid = () => {
    if (!questionText.trim()) return false;
    return true;
  };

  // Save question to Firebase
  const saveQuestion = async () => {
    if (!isFormValid()) {
      setSaveError("Please complete all required fields.");
      return;
    }

    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      // Prepare the question data based on type
      const questionData = {
        points,
        timeLimit,
        questionText,
        createdAt: serverTimestamp(),
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, "questions"), questionData);

      console.log("Question saved with ID:", docRef.id);
      setSaveSuccess(true);

      // Optionally reset the form or redirect
      resetForm();
    } catch (error) {
      console.error("Error saving question:", error);
      setSaveError("Failed to save question. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setQuestionText("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <QuestionEditorHeader
        points={points}
        onPointsChange={setPoints}
        timeLimit={timeLimit}
        onTimeLimitChange={setTimeLimit}
        onSaveQuestion={saveQuestion}
        isSaving={isSaving}
      />

      <div className="max-w-4xl mx-auto p-4">
        <QuestionContentArea
          questionText={questionText}
          onQuestionTextChange={setQuestionText}
        />

        {/* Save status messages */}
        {saveSuccess && (
          <div className="mt-4 bg-green-100 text-green-700 p-2 rounded">
            Question saved successfully!
          </div>
        )}

        {saveError && (
          <div className="mt-4 bg-red-100 text-red-700 p-2 rounded">
            {saveError}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionEditor;
