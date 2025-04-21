"use client";

import React from "react";
import { Book, Users, Award, Clock, Settings, BarChart, MessageSquare, Info, PlusCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const HowItWorksPage = () => {
  return (
    <>
    <Navbar/>
 <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 mb-10 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How Quiz Manager Works</h1>
        <p className="text-lg opacity-90 max-w-3xl">
          A complete guide to creating, managing, and participating in interactive quizzes for your ceremonies, events, or classroom activities.
        </p>
      </div>

      {/* Steps Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Settings size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Create</h3>
          <p className="text-gray-600">Set up your quiz with custom questions, time limits, and point values</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Users size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Share</h3>
          <p className="text-gray-600">Invite participants through a unique link or code to join your quiz</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Award size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Engage</h3>
          <p className="text-gray-600">Participants select questions, reveal answers, and earn points</p>
        </div>
      </div>

      {/* Detailed Walkthrough */}
      <div className="space-y-16">
        {/* For Quiz Creators */}
        <section>
          <div className="flex items-center mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white mr-4">
              <span className="text-lg font-bold">1</span>
            </div>
            <h2 className="text-2xl font-bold">For Quiz Creators</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Settings className="mr-2 h-5 w-5 text-indigo-500" />
                Creating Your Quiz
              </h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <PlusCircle size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Create a New Quiz</h4>
                    <p className="text-gray-600">
                      Start by clicking "Create Quiz" from your dashboard. Give your quiz a title, 
                      description, and optionally set a cover image for participants to recognize it.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <MessageSquare size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Add Questions</h4>
                    <p className="text-gray-600">
                      Add questions one by one. Each question can have:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-600">
                      <li>Custom question text</li>
                      <li>Time limit (how long participants have to answer)</li>
                      <li>Point value (higher for more difficult questions)</li>
                      <li>The correct answer</li>
                    </ul>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <Settings size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Configure Quiz Settings</h4>
                    <p className="text-gray-600">
                      Customize your quiz with additional settings:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-600">
                      <li>Welcome message for participants</li>
                      <li>Rules and instructions</li>
                      <li>Quiz access settings (public or private)</li>
                      <li>Whether participants can see others scores</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-indigo-500" />
                Sharing Your Quiz
              </h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <Info size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Generate Access Link</h4>
                    <p className="text-gray-600">
                      Once your quiz is ready, generate a unique link or code from the "Share" tab.
                      This link can be shared with participants via email, message, or displayed on a screen.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <BarChart size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Monitor Participation</h4>
                    <p className="text-gray-600">
                      Once shared, you can monitor who has joined your quiz in real-time from the 
                      dashboard. See how many questions each participant has attempted and their current scores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Quiz Participants */}
        <section>
          <div className="flex items-center mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white mr-4">
              <span className="text-lg font-bold">2</span>
            </div>
            <h2 className="text-2xl font-bold">For Quiz Participants</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Book className="mr-2 h-5 w-5 text-indigo-500" />
                Taking a Quiz
              </h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <CheckCircle size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Join with Link or Code</h4>
                    <p className="text-gray-600">
                      Access the quiz by clicking the link provided by the quiz creator or enter the 
                      access code on the join page. You will first see a welcome screen explaining the 
                      quiz and its rules.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <MessageSquare size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Select Questions</h4>
                    <p className="text-gray-600">
                      Once the quiz begins, you will see a grid of available questions. Click on any 
                      question to open it. Each question displays:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-600">
                      <li>The question text</li>
                      <li>A countdown timer showing how much time is left</li>
                      <li>The point value of the question</li>
                      <li>Options to select your answer</li>
                    </ul>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <Clock size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Answer Questions</h4>
                    <p className="text-gray-600">
                      Select your answer within the time limit. After submitting or when time runs out, 
                      the correct answer will be revealed. You will be able to see if you answered correctly 
                      and how many points you earned.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-indigo-500" />
                Scoring and Results
              </h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <BarChart size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Track Your Progress</h4>
                    <p className="text-gray-600">
                      As you answer questions, they will move from the "Available Questions" to 
                      "Attempted Questions" section. This helps you keep track of what you have completed.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <Award size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">View Final Results</h4>
                    <p className="text-gray-600">
                      After answering all questions, you will see your final score and performance. If enabled by 
                      the quiz creator, you might also see how your score compares to other participants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips and Best Practices */}
        <section>
          <div className="flex items-center mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white mr-4">
              <span className="text-lg font-bold">3</span>
            </div>
            <h2 className="text-2xl font-bold">Tips and Best Practices</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-indigo-500" />
                    For Quiz Creators
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Vary question difficulty</span> - Mix easier 
                        and harder questions with appropriate point values to keep all participants engaged.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Set appropriate time limits</span> - Allow 
                        enough time for reading and thinking, but keep it challenging.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Write clear questions</span> - Make sure 
                        questions are unambiguous and have a single correct answer.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Test your quiz</span> - Try it yourself 
                        before sharing with participants to catch any issues.
                      </p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-indigo-500" />
                    For Quiz Participants
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Read the rules first</span> - Understand 
                        how scoring works and what to expect before starting.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Watch the timer</span> - Keep an eye on 
                        the countdown to make sure you submit your answer in time.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Consider point values</span> - Higher 
                        point questions are usually more challenging but worth spending more time on.
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-800">Use a reliable device</span> - Make sure 
                        your device has a stable internet connection and enough battery.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-lg font-medium text-indigo-600 mb-2">How many questions can I add to a quiz?</h4>
              <p className="text-gray-600">
                You can add up to 50 questions to a single quiz. We recommend between 5-20 questions 
                for most ceremonies and events to keep participants engaged.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-indigo-600 mb-2">Can I edit a quiz after creating it?</h4>
              <p className="text-gray-600">
                Yes, you can edit your quiz at any time before participants start taking it. Once 
                participants have begun, you can still make minor edits but cannot remove questions.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-indigo-600 mb-2">How do participants join my quiz?</h4>
              <p className="text-gray-600">
                Participants can join your quiz by clicking on the unique link you share or by entering 
                the quiz code on our homepage. No account creation is required for participants.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-indigo-600 mb-2">Can I see who has taken my quiz?</h4>
              <p className="text-gray-600">
                Yes, as the quiz creator you can see a list of all participants, their progress, and 
                their scores in real-time from your dashboard.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-indigo-600 mb-2">Is there a limit to how many people can take my quiz?</h4>
              <p className="text-gray-600">
                Our standard plan allows up to 100 participants per quiz. If you need more capacity for 
                larger events, please contact us about our premium plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 text-white shadow-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your First Quiz?</h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Start engaging your audience with interactive quizzes that make your ceremonies and events more memorable.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-sm transition-colors">
            Create Quiz
          </button>
          <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors">
            View Examples
          </button>
        </div>
      </div>
    </div>    </>
   
  );
};

export default HowItWorksPage;