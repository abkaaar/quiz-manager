import QuizSettings from "@/components/quiz-settings";
import { Separator } from "@/components/ui/separator";
import { signInWithGoogle, logout } from '@/auth/auth';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, TrophyIcon } from 'lucide-react';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('Signed in user:', user);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (

    <> 
      <div className="min-h-screen bg-slate-50">

        <Navbar />
        {/* Hero Section */}

        <main className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
          {/* Logo in Badge */}
        
            <Brain className="w-20 h-20 text-blue-600 bg-white p-1 shadow-2xl mb-8 rounded-xl border-emerald-500 border-4" />

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 max-w-5xl mb-6">
            Test Your Knowledge &
            <br />
            Have Fun! 🎉
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-12">
            Create and share quizzes that meet the needs of every student.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-in" className="hidden md:block">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-md">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
           
         
          </div>
        </main>

        {/* Background Effect - Can be improved with actual SVG or better CSS */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-50 via-blue-100 to-transparent opacity-70" />
          <div className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-60" />
          <div className="absolute right-1/4 bottom-1/3 w-96 h-96 rounded-full bg-emerald-100 blur-3xl opacity-60" />
        </div>


       <Footer/>


      </div>
    </>
  );
}
