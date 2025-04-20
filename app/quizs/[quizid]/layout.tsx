"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MenuIcon,
  Clock,
  Star,
  Import,
  Database,
  FileText,
  Settings,
  ArrowLeft,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { collection, doc, getDoc, getDocs, query, setDoc, where, writeBatch } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Quiz admin specific components
const BulkTimeUpdate = () => {
  const [timeLimit, setTimeLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const updateAllQuestionsTime = async () => {
    if (!params.quizid) return alert("Quiz ID is missing.");
    if (!timeLimit) return alert("Please select a time.");
  
    try {
      setLoading(true);
      const q = query(collection(db, "questions"), where("quizId", "==", params.quizid));
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) {
        alert("No questions found to update.");
        return;
      }
  
      const batch = writeBatch(db);
      snapshot.docs.forEach((docSnap) => {
        const questionRef = doc(db, "questions", docSnap.id);
        batch.update(questionRef, { timeLimit: Number(timeLimit) }); // convert to number
      });
  
      await batch.commit();
      alert("Time updated for all questions!");
    } catch (error) {
      console.error("Error updating time:", error);
      alert("Failed to update time.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Bulk Time Update</CardTitle>
        <CardDescription>Update time for all questions at once</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <select
                className="w-full rounded border p-2 bg-white"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              >
                <option value="" disabled>
                  Select time
                </option>
                <option value="30">30 seconds</option>
                <option value="45">45 seconds</option>
                <option value="60">60 seconds</option>
                <option value="90">90 seconds</option>
                <option value="120">2 minutes</option>
              </select>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={updateAllQuestionsTime}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Time"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const IntroductionForm = () => {
  const [introduction, setIntroduction] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchIntroduction = async () => {
      if (!params.quizid) return;

      const docRef = doc(db, "quizzes", Array.isArray(params.quizid) ? params.quizid[0] : params.quizid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.introduction) {
          setIntroduction(data.introduction);
        }
      }
    };

    fetchIntroduction();
  }, [params.quizid]);

  const saveIntroduction = async () => {
    if (!params.quizid) {
      alert("Quiz ID is missing.");
      return;
    }

    try {
      setLoading(true);
      await setDoc(
        doc(db, "quizzes", Array.isArray(params.quizid) ? params.quizid[0] : params.quizid),
        { introduction },
        { merge: true }
      );
      alert("Introduction saved!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save introduction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Introduction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <textarea
            className="w-full rounded border p-2 bg-white"
            placeholder="Add or edit the introduction text here..."
            rows={4}
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
          <Button className="w-full" onClick={saveIntroduction} disabled={loading}>
            {loading ? "Saving..." : "Save Introduction"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const RulesForm = () => {
  const [rules, setRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchRules = async () => {
      if (!params.quizid) return;

      const docRef = doc(db, "quizzes", Array.isArray(params.quizid) ? params.quizid[0] : params.quizid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        if (data.rules && Array.isArray(data.rules)) {
          setRules(data.rules);
        }
      }
    };

    fetchRules();
  }, [params.quizid]);

  const saveRules = async () => {
    if (!params.quizid) return alert("Quiz ID missing.");

    try {
      setLoading(true);
      await setDoc(
        doc(db, "quizzes", Array.isArray(params.quizid) ? params.quizid[0] : params.quizid),
        { rules },
        { merge: true }
      );
      alert("Rules saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save rules.");
    } finally {
      setLoading(false);
    }
  };

  const addRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule("");
    }
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Rules</CardTitle>
        <CardDescription>Set the rules for the competition</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <input
            type="text"
            className="w-full rounded border p-2 bg-white"
            placeholder="Write a rule..."
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
          />
          <Button className="w-full" onClick={addRule}>
            Add Rule
          </Button>

          <ul className="space-y-1">
            {rules.map((rule, index) => (
              <li
                key={index}
                className="flex items-center justify-between border p-2 rounded"
              >
                <span>{rule}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRule(index)}
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>

          <Button className="w-full mt-2" onClick={saveRules} disabled={loading}>
            {loading ? "Saving..." : "Save Rules"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


const ParticipantForm = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchParticipant = async () => {
      if (!params.quizid) return;

      const docRef = doc(db, "quizzes", Array.isArray(params.quizid) ? params.quizid[0] : params.quizid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        if (data.participants && Array.isArray(data.participants)) {
          setParticipants(data.participants);
        }
      }
    };

    fetchParticipant();
  }, [params.quizid]);

  const saveParticipant = async () => {
    if (!params.quizid) return alert("Quiz ID missing.");

    try {
      setLoading(true);
      await setDoc(
        doc(db, "quizzes", Array.isArray(params.quizid) ? params.quizid[0] : params.quizid),
        { participants },
        { merge: true }
      );
      alert("Participant saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save rules.");
    } finally {
      setLoading(false);
    }
  };

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    }
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Participant</CardTitle>
        <CardDescription>Set the participant for the competition</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <input
              type="text"
              className="w-full rounded border p-2 bg-white"
              placeholder="Write a rule..."
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
          </div>
          <div>
            <Button className="w-full" onClick={addParticipant}>
              Add Participant
            </Button>
          </div>
          <ul className="space-y-1">
            {participants.map((participant, index) => (
              <li
                key={index}
                className="flex items-center justify-between border p-2 rounded"
              >
                <span>{participant}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeParticipant(index)}
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>
          <Button className="w-full mt-2" onClick={saveParticipant} disabled={loading}>
            {loading ? "Saving..." : "Save Participant"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


export default function QuizAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed hidden h-full border-r bg-background transition-all duration-300 md:block z-10",
          isSidebarOpen ? "w-80" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="mr-2 underline"
              >
                Back
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-2"
            >
              Back
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="h-8 w-8 bg-emerald-500 text-white rounded-full"
          >
            {isSidebarOpen ? "←" : "→"}
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          {isSidebarOpen ? (
            <div className="p-4">
              <BulkTimeUpdate />
              <IntroductionForm/>
              <RulesForm/>
              <ParticipantForm/>
            </div>
          ) : (
            <nav className="flex flex-col items-center gap-4 p-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Bulk Operations"
              >
                <Star className="h-4 w-4" />
              </Button>
            </nav>
          )}
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">Quiz Editor</span>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="bulk-update">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span>Bulk Operations</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <BulkTimeUpdate />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 md:ml-16",
          isSidebarOpen && "md:ml-80"
        )}
      >
        <div className=" py-8">{children}</div>
      </main>
    </div>
  );
}
