"use client";

import React from "react";
import { AuthProvider } from "./components/context/authContext";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <AuthProvider>
        <main className="flex-grow">
          {/* ヒーローセクション */}
          <section className="text-white bg-blue-500 p-6 md:p-12 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Welcome to FitAPP
            </h1>
            <p className="mb-8">Your journey starts here.</p>
            <a
              href="#services"
              className="bg-white text-blue-500 px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold"
            >
              Explore
            </a>
          </section>
          {/* サービスセクション */}
          <section id="services" className="p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Our Services
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="w-full sm:w-1/2 lg:w-1/3 max-w-xs bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Personal Training
                </h3>
                <p>
                  Customized training programs to fit your individual needs.
                </p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 max-w-xs bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Group Classes
                </h3>
                <p>Engage in fun and effective workouts with a group.</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 max-w-xs bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Nutrition Plans
                </h3>
                <p>
                  Personalized nutrition plans to complement your fitness
                  regime.
                </p>
              </div>
            </div>
          </section>
        </main>
        <footer className="footer footer-center p-10 base-100 text-base-300 rounded mt-auto gap-y-1 bg-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-end">
              <span className="text-sm">©2024 Be Fit</span>
            </div>
          </div>
        </footer>
      </AuthProvider>
    </div>
  );
}
