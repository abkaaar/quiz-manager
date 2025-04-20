"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { db } from "@/utils/firebase";
import { useParams } from "next/navigation";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionComponent from "@/app/quizs/[quizid]/questions/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Quiz {
  id: string;
  name: string;
  subject: string;
  grade: string;
  imageUrl?: string;
  description?: string;
  questions?: any[];
  createdAt?: any;
  createdBy?: string;
}

const QuizDetail = () => {
  const router = useRouter();
  const Params = useParams();
  const id = Array.isArray(Params.quizid) ? Params.quizid[0] : Params.quizid;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [quizName, setQuizName] = useState(quiz?.name || "");
  const [subject, setSubject] = useState(quiz?.subject || "");
  const [grade, setGrade] = useState(quiz?.grade || "");
  const [image, setImage] = useState<File | null>(null);


  // Function to handle navigation when quiz type is selected
  const handleQuizTypeSelect = async (quizType: string) => {
    setQuestionOpen(false); // Close the dialog

    // Create a new question ID (in a real app, this would likely come from an API call)
    // const newQuestionId = `${Date.now()}`;
    const q = query(collection(db, "questions"), where("quizId", "==", id));
    const querySnapshot = await getDocs(q);
    const questionCount = querySnapshot.size;

    const newQuestionId = (questionCount + 1).toString(); // Sequential ID

    // Navigate to the appropriate quiz editor page with the nested route structure
    router.push(`/quizs/${id}/question/${newQuestionId}?type=${quizType}`);
  };

  useEffect(() => {
    if (quiz) {
      setQuizName(quiz.name);
      setSubject(quiz.subject);
      setGrade(quiz.grade);
    }
  }, [quiz]);

  const handleSave = async () => {
    if (!quiz) return;

    setLoading(true);
    try {
      const updatedQuiz = {
        name: quizName,
        subject,
        grade,
      };

      await updateDoc(doc(db, "quizzes", quiz.id), updatedQuiz);
      setSettingsOpen(false);
      setQuiz((prev) => (prev ? { ...prev, ...updatedQuiz } : prev)); // Update state locally
    } catch (error) {
      console.error("Error updating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("Quiz ID is missing.");
      setLoading(false);
      return;
    }
    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "quizzes", id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const quizData = { id: docSnap.id, ...docSnap.data() } as Quiz;
    
          // Now fetch the questions separately
          const q = query(collection(db, "questions"), where("quizId", "==", id));
          const querySnapshot = await getDocs(q);
    
          const fetchedQuestions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
    
          setQuiz({ ...quizData, questions: fetchedQuestions });
        } else {
          setError("Quiz not found.");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuiz();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading quiz...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <Link href="/quizs">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Back to Quizzes
          </button>
        </Link>
      </div>
    );

  if (!quiz) return null;

  return (
    <>
      <nav className="bg-white p-4 text-black border-b border-gray-200 container mx-auto gap-2 flex justify-end items-center fixed top-0 left-0 right-0">
        <span className="text-sm font-medium mr-4">{quiz.name}</span>

        <div className="flex items-center gap-2">
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Quiz</DialogTitle>
                <DialogDescription>
                  Update the quiz details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-2">
                  <Label htmlFor="name" className="text-gray-500">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <Label htmlFor="subject" className="text-gray-500">
                    Subject
                  </Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="pe">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 items-center gap-2">
                  <Label htmlFor="grade" className="text-gray-500">
                    Grade
                  </Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="secondary">
                        Secondary School
                      </SelectItem>
                      <SelectItem value="primary">Primary School</SelectItem>
                      <SelectItem value="kindergarten">Kindergarten</SelectItem>
                      <SelectItem value="nursery">Nursery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => router.push("/quizs")}
                >
                  Delete Quiz
                </Button>

                <Button onClick={handleSave} disabled={loading} size="sm">
                  {loading ? "Saving..." : "Save Quiz"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* <Button variant={"outline"} size={"sm"} className="mr-2">
            Preview
          </Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size={"sm"}
                className="bg-emerald-500 hover:bg-emerald-400"
              >
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Quiz</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-gray-700 mb-2">
                  Share the quiz with participants using the link below:
                </p>
                <Input
                  readOnly
                  value={`http://localhost:3000/quizs/p/${quiz.id}`}
                  className="w-full"
                />
              </div>
              <DialogFooter>
                <Button
                  size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `http://localhost:3000/quizs/p/${quiz.id}`
                    )
                  }
                >
                  Copy Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <div className="p-6 mx-auto h-auto bg-slate-200 mt-4">
        <div className="bg-white rounded-lg  shadow-md p-3 mb-3 w-full">
          <div className="flex justify-between items-center">
            <div className="">
              {quiz.questions && quiz.questions.length > 0 ? (
                <h2 className="text-xl font-semibold">
                  {quiz.questions.length} questions
                </h2>
              ) : (
                <span className="text-gray-500">No questions added yet</span>
              )}
            </div>
            <Button
              variant="outline"
              className="bg-emerald-100 border-emerald-200 text-emerald-500"
              onClick={() => handleQuizTypeSelect("fill-blanks")}
            >
              Add question
            </Button>
          </div>
        </div>
        <QuestionComponent />
      </div>
    </>
  );
};

export default QuizDetail;
{
  /* <QuestionDialog quizId={quiz.id} /> */
}
