"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ from next/navigation
import { QuestionEditor as QuestionEditorComponent } from "./FilInTheBlanksEditor"; // Import your QuestionEditor component

interface EditorProps {
  quizId: string;
  questionId: string;
  onSave: () => void;
  isSaving: boolean;
}

const QuestionEditor = () => {
  const router = useRouter();
  const params = useParams();

  const quizId = params.quizid as string;
  const questionId = params.questionid as string;

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push(`/quizs/${quizId}`);
    }, 800);
  };

  // Render the editor component
  const renderQuestionEditor = () => {
    if (!quizId || !questionId) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      );
    }

    // Pass props to the QuestionEditorComponent
    const editorProps: EditorProps = {
      quizId,
      questionId,
      onSave: handleSave,
      isSaving,
    };

    return <QuestionEditorComponent {...editorProps} />;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-2 bg-white border-b text-sm text-gray-500">
        <span className="mx-1">Quizzes</span> / 
        <span className="mx-1">{quizId}</span> / 
        <span className="mx-1">Question</span> / 
        <span className="mx-1">{questionId}</span>
      </div>
      {renderQuestionEditor()}
    </div>
  );
};

export default QuestionEditor;
