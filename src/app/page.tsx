'use client'

import { BrainCircuit, FileText, Link, ImageIcon, Video } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function Home() {


  //useRouter to redirect user to /login after clicking get started
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-[#0d1126] text-white relative overflow-hidden">


      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <BrainCircuit className="w-5 h-5" />
          CHRONOS
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
        onClick={handleGetStarted}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 mt-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
          Your Personal AI Knowledge Base
          <br />
          <span className="text-gray-400">To Remember You</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl">
          Chronos makes your life easy. It remembers everything.
          Chat with your doc,note and sites.
        </p>
      </section>

      {/* Icon Network with brain centered and no grid */}
      <section className="relative mt-24 flex justify-center">
        <div className="relative w-full max-w-6xl h-[200px]">
          {/* SVG overlay for connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lines connecting Brain Center to Left Icons */}
            <line x1="50%" y1="50%" x2="20%" y2="35%" stroke="#6b46c1" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="20%" y2="65%" stroke="#38a169" strokeWidth="2" />

            {/* Lines connecting Brain Center to Right Icons */}
            <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="#d53f8c" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="80%" y2="65%" stroke="#dd6b20" strokeWidth="2" />
          </svg>

          {/* Brain Center */}
          <div
            className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-gray-900 rounded-full border border-gray-600 shadow-[0_0_10px_#6b46c1]">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            <span className="mt-2 text-sm text-gray-400 font-medium">Chronos</span>
          </div>

          {/* Left Top Icon */}
          <div
            className="absolute top-[35%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Left Bottom Icon */}
          <div
            className="absolute top-[65%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full">
              <Link className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Right Top Icon */}
          <div
            className="absolute top-[35%] left-[80%] transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Right Bottom Icon */}
          <div
            className="absolute top-[65%] left-[80%] transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full">
              <Video className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
