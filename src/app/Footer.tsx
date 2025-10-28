import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Stay Focused, Get More Done
          </h2>
          <p className="text-gray-600">
            An online Pomodoro timer - Inspired by pomofocus.io — Built as a personal project.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What is Pomodoro Technique?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The Pomodoro Technique is a time management method developed by Francesco Cirillo 
              in the late 1980s. It uses a timer to break work into focused intervals, 
              traditionally 25 minutes in length, separated by short breaks. Each interval 
              is known as a "pomodoro," from the Italian word for tomato, after the 
              tomato-shaped kitchen timer Cirillo used as a university student.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How to use this app
            </h3>
            <ol className="text-gray-600 text-sm space-y-2">
              <li className="flex">
                <span className="font-semibold mr-2">1.</span>
                <span>Add tasks to work on today</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">2.</span>
                <span>Set estimate pomodoros (1 = 25min of work) for each task</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">3.</span>
                <span>Select a task to work on</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">4.</span>
                <span>Start timer and focus on the task for 25 minutes</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">5.</span>
                <span>Take a break for 5 minutes when the alarm rings</span>
              </li>
              <li className="flex">
                <span className="font-semibold mr-2">6.</span>
                <span>After 3 pomodoros, you will have a longer break of 10 minutes (by default)</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Features
            </h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Customizable timer:</strong> Adjust work and break intervals to fit your workflow</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Task management:</strong> Add, edit, and track your daily tasks</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Progress tracking:</strong> Monitor completed pomodoros and stay motivated</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Responsive design:</strong> Works seamlessly on desktop and mobile</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>No registration needed:</strong> Start boosting your productivity immediately</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p className="mb-4 md:mb-0">
              © {new Date().getFullYear()} PomoTech. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}