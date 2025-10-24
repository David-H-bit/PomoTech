"use client"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react";
import Header from "./Header";

type Mode = "pomodoro" | "short" | "long"
type Task = {
  id: number;
  name: string;
}


export default function Home() {
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); // minutes * seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<Mode>("pomodoro")
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([])

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prevT => (prevT > 0 ? prevT - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    const times = {
      pomodoro: 25 * 60,
      short: 5 * 60,
      long: 10 * 60
    };

    setTimeLeft(times[mode]);
    setIsRunning(false)
  }, [mode])

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  const addTask = () => {
    setShowModal(false);
    setTaskList(prev => [...prev, {id: Date.now(), name: taskName}])
    setTaskName("")
  }

  return (
   <div className={`duration-400 ease-in flex flex-col min-h-screen flex-1 items-center ${mode === "pomodoro" ? "bg-fuchsia-300" : mode === "short" ? "bg-green-300" : mode ==="long" ? "bg-blue-300": "bg-gray-100"}`}>
    <Header/>
      <Card className="w-1/3 h-fit bg-white/50">
        <CardHeader className="flex flex-row items-center justify-between text-xl">
          <CardTitle className={`p-2 cursor-pointer rounded duration-400 ease-in text-gray-800 ${mode === "pomodoro" ? "bg-fuchsia-400 font-bold text-black" : ""}`} onClick={() => setMode("pomodoro")}>Pomodoro</CardTitle>
          <CardTitle className={`p-2 cursor-pointer rounded duration-400 ease-in text-gray-800 ${mode === "short" ? "bg-green-400 font-bold text-black" : ""}`} onClick={() => setMode("short")}>Short break</CardTitle>
          <CardTitle className={`p-2 cursor-pointer rounded duration-400 ease-in text-gray-800 ${mode === "long" ? "bg-blue-400 font-bold text-black" : ""}`} onClick={() => setMode("long")}>Long break</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CardDescription className="text-8xl bold text-black">
          {formatTime(minutes)}:{formatTime(seconds)}
          </CardDescription>
          <CardAction className="mb-2 mt-6">
            <Button className="text-2xl py-6 px-20 cursor-pointer" onClick={() => setIsRunning(prevI => !prevI)}>{isRunning ? "Stop" : "Start"}</Button>
          </CardAction>
        </CardContent>
      </Card>
      <p>#1</p>
      <h4>nextJS</h4>
      <div className="flex flex-row justify-between w-1/3 border-b-2 border-black">
        <h4>Tasks</h4>
        <button>...</button>
      </div>
      {taskList && (
        taskList.map((task) => (
          <Card key={task.id} className="flex flex-row w-1/3 justify-between items-center mt-4 cursor-pointer py-3">
            <CardHeader className="flex items-center">
              <CardTitle>{task.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row gap-4 items-center">
              <CardDescription>1/5(placeholder)</CardDescription>
              <CardAction>
                <Button className="cursor-pointer">...(future edit button(s))</Button>
              </CardAction>
            </CardContent>
          </Card>
        ))
      )}
      <Card className="flex flex-row w-1/3 justify-center items-center mt-4 cursor-pointer border-dashed border-4 border-black/50 bg-white/20 py-3">
        <CardHeader className="flex items-center justify-center w-full">
          <CardTitle onClick={() => setShowModal(true)}>Add task</CardTitle>
        </CardHeader>
      </Card>
      {showModal && (
        <div className="fixed flex inset-0 justify-center items-center bg-black/50 z-20">
          <div className={`flex flex-col rounded-xl p-4 border-4 bg-white w-1/3 h-1/3 ${mode === "pomodoro" ? "border-fuchsia-500/50" : mode === "short" ? "border-green-500/50" : mode ==="long" ? "border-blue-500/50": "bg-gray-100"}`}>
            <input className="w-fit m-2 text-xl p-1 rounded border border-black/50" type="text" placeholder="Enter your task here" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            <Button className="text-xl py-2 px-8 cursor-pointer w-fit m-2" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant={"secondary"} className="text-xl py-2 px-8 border-black border-2 cursor-pointer w-fit m-2" onClick={addTask}>Save</Button>
          </div>
        </div>
      )}
   </div>
  );
}