"use client";

// import React, { useState } from "react";
// import {
//   Image as ImageIcon,
//   Square,
// } from "lucide-react";
// import { QuestionEditor } from "./FilInTheBlanksEditor";

// // Quiz Type Selector Component
// const QuizTypeSelector: React.FC<{
//   onSelectQuizType: (
//     quizType:
//       | "fill-blanks"
//   ) => void;
// }> = ({ onSelectQuizType }) => {
//   const quizTypes: {
//     id:
//       | "fill-blanks"
//     name: string;
//     icon: React.ReactNode;
//   }[] = [

//     {
//       id: "fill-blanks",
//       name: "Fill in the Blanks",
//       icon: <Square className="h-4 w-4" />,
//     },
   
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-8">
//       <h2 className="text-xl font-bold text-purple-900 mb-4">
//         Select Question Type
//       </h2>
//       <div className="grid grid-cols-2 gap-3">
//         {quizTypes.map((type) => (
//           <button
//             key={type.id}
//             className="flex items-center p-3 border rounded-md hover:bg-purple-50 transition-colors"
//             onClick={() => onSelectQuizType(type.id)}
//           >
//             <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded mr-2">
//               {typeof type.icon === "string" ? type.icon : type.icon}
//             </div>
//             <span>{type.name}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const QuizBuilder = () => {
//   const [selectedQuizType, setSelectedQuizType] = useState<
//     | null
//     | "multiple-choice"
//     | "image-based"
//     | "reorder"
//     | "fill-blanks"
//     | "matching"
//     | "true-false"
//   >(null);

//   const renderQuizEditor = () => {
//     const commonProps = {
//       quizId: "dummyQuizId", 
//       questionId: "dummyQuestionId", 
//       onSave: () => console.log("Saving..."), // Implement actual save logic
//       isSaving: false, // Update based on state
//     };
//     switch (selectedQuizType) {
//       case "multiple-choice":
//       case "fill-blanks":
//         return <QuestionEditor {...commonProps} />;
//       default:
//         return (
//           <QuizTypeSelector
//             onSelectQuizType={(
//               quizType:
//                 | "fill-blanks"
//             ) => setSelectedQuizType(quizType)}
//           />
//         );
//     }
//   };

//   return <div className="min-h-screen bg-gray-100">{renderQuizEditor()}</div>;
// };

// export default QuizBuilder;

import React, { useState } from "react";
import { Square } from "lucide-react";
import { QuestionEditor } from "./FilInTheBlanksEditor";

// Quiz Type Selector Component
const QuizTypeSelector: React.FC<{
  onSelectQuizType: (quizType: "fill-blanks") => void;
}> = ({ onSelectQuizType }) => {
  const quizTypes = [
    {
      id: "fill-blanks" as const,
      name: "Fill in the Blanks",
      icon: <Square className="h-4 w-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-purple-900 mb-4">
        Select Question Type
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {quizTypes.map((type) => (
          <button
            key={type.id}
            className="flex items-center p-3 border rounded-md hover:bg-purple-50 transition-colors"
            onClick={() => onSelectQuizType(type.id)}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded mr-2">
              {type.icon}
            </div>
            <span>{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Quiz Builder Component
const QuizBuilder = () => {
  const [selectedQuizType, setSelectedQuizType] = useState<"fill-blanks" | null>(null);

  const renderQuizEditor = () => {
    if (selectedQuizType === "fill-blanks") {
      return (
        <QuestionEditor
          quizId="dummyQuizId"
          questionId="dummyQuestionId"
          onSave={() => console.log("Saving...")}
          isSaving={false}
        />
      );
    }

    return <QuizTypeSelector onSelectQuizType={setSelectedQuizType} />;
  };

  return <div className="min-h-screen bg-gray-100">{renderQuizEditor()}</div>;
};

export default QuizBuilder;
