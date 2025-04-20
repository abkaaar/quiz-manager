"use client";

import { useParams } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  GripVertical,
  Edit,
  Trash,
  Check,
  X,
  Copy,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";

interface Question {
  id: string;
  questionText: string;
  timeLimit: number;
  answer: string;
  questionNumber: number;
}

const QuestionComponent = () => {
  // Sample questions data
  const [questions, setQuestions] = useState<Question[]>([]);

  const [editId, setEditId] = useState<string | null>(null);
  const [editedQuestion, setEditedQuestion] = useState<Partial<Question>>({});

  const params = useParams();
  const quizId = params.quizid as string;

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

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "questions", id));
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleEdit = async (id: string) => {
    const questionRef = doc(db, "questions", id);
    await updateDoc(questionRef, {
      questionText: editedQuestion.questionText,
      timeLimit: editedQuestion.timeLimit,
    });

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              ...editedQuestion,
            }
          : q
      )
    );
    setEditId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {questions.map((question) => (
        <div key={question.id} className="border rounded-lg shadow-sm bg-white">
          {/* Question header */}
          <div className="flex items-center p-4 border-b">
            <button className="p-2 hover:bg-gray-100 rounded">
              <GripVertical className="h-4 w-4 text-gray-500" />
            </button>
            <span className="">{question.questionNumber}</span>

            {editId === question.id ? (
              <>
                <input
                  type="number"
                  value={editedQuestion.timeLimit ?? ""}
                  onChange={(e) =>
                    setEditedQuestion({
                      ...editedQuestion,
                      timeLimit: Number(e.target.value),
                    })
                  }
                  className="w-16 border rounded px-2 py-1 text-sm mr-2"
                />
             
              </>
            ) : (
              <>
                {/* Time button */}
                <div className="ml-4 relative">
                  <button className="flex items-center px-3 py-1 border rounded-md text-sm">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {question.timeLimit}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </>
            )}

         

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Action buttons */}

            {/* <button className="p-2 ml-1 hover:bg-gray-100 rounded">
              <Edit className="h-4 w-4 text-gray-600" />
            </button> */}

            {editId === question.id ? (
              <>
                <button
                  onClick={() => handleEdit(question.id)}
                  className="p-2 ml-1 hover:bg-gray-100 rounded"
                >
                  <Check className="h-4 w-4 text-green-600" />
                </button>
                <button
                  onClick={() => {
                    setEditId(null);
                    setEditedQuestion({});
                  }}
                  className="p-2 ml-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-red-600" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setEditId(question.id);
                  setEditedQuestion({
                    questionText: question.questionText,
                    timeLimit: question.timeLimit,
                  });
                }}
                className="p-2 ml-1 hover:bg-gray-100 rounded"
              >
                <Edit className="h-4 w-4 text-gray-600" />
              </button>
            )}

            <button
              onClick={() => handleDelete(question.id)}
              className="p-2 ml-1 hover:bg-gray-100 rounded"
            >
              <Trash className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Question content */}
          <div className="p-6">
            {editId === question.id ? (
              <input
              value={editedQuestion.questionText ?? ""}
              onChange={(e) =>
                setEditedQuestion({ ...editedQuestion, questionText: e.target.value })
              }
              className="text-lg border p-2 w-full mb-4"
            />
            ) : (
              <h3 className="text-lg font-medium mb-4">
                {question.questionText}
              </h3>
            )}
            <div>
              <p className="text-gray-600 mb-2">Answer</p>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <p>{question.answer}</p>
              </div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default QuestionComponent;
