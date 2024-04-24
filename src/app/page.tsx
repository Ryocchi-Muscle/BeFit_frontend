"use client";

import React from "react";
import { AuthProvider } from "./components/context/authContext";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
        {/* <Header session={null} /> */}
        {/* ヒーローセクション */}
        <section className="text-white bg-blue-500 p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to FitAPP</h1>
          <p className="mb-8">Your  journey starts here.</p>
          <a
            href="#services"
            className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold"
          >
            Explore
          </a>
        </section>
        {/* サービスセクション */}
        <section id="services" className="p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-w-sm bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Personal Training</h3>
              <p>Customized training programs to fit your individual needs.</p>
            </div>
            <div className="max-w-sm bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Group Classes</h3>
              <p>Engage in fun and effective workouts with a group.</p>
            </div>
            <div className="max-w-sm bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Nutrition Plans</h3>
              <p>
                Personalized nutrition plans to complement your fitness regime.
              </p>
            </div>
          </div>
        </section>
        {/* お問い合わせセクション */}
        <footer className="bg-gray-200 text-black p-4 mt-auto text-center">
          @Ryocchi-Muscle
        </footer>
      </AuthProvider>
    </div>
  );
}
