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
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { useAppContext } from "./AppContext";
import Color from "color";

type Mode = "pomodoro" | "short" | "long"
type Task = {
  id: number;
  name: string;
  pomodoros: number;
  pomodorosFinished: number;
}

export default function Home() {
  
  const [timeLeft, setTimeLeft] = useState(25 * 60); // minutes * seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isActive, setIsACtive] = useState(false) // for button styling
  const [mode, setMode] = useState<Mode>("pomodoro")
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([])
  const [pomodoros, setPomodoros] = useState(1);
  const [pomodorosDone, setPomodorosDone] = useState(0); // This is for the TOTAL pomodoros done for short/long functionality, not task specific
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null) // This is for the TASK SPECIFIC pomodoros
  const { color1, color2, color3, transparency, pomodoroTime, shortTime, longTime, selectedAudio, setColor1, setColor2, setColor3, setTransparency, setPomodoroTime, setLongTime, setShortTime } = useAppContext();
  const audioRef = useRef<any>(null) // TypeScript thinks Audio is a runtime value, not just a type, so using any here is 'okay'

  useEffect(() => {
    if (typeof window === "undefined") return; // make sure we're on client
    audioRef.current = new Audio(selectedAudio);
  }, [selectedAudio])

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prevT => (prevT > 0 ? prevT - 1 : 0))
    }, 1000)

    if (timeLeft === 0){
      if (audioRef.current) {
        audioRef.current.src = selectedAudio;
        audioRef.current.play();
      }
      setIsRunning(false)
      if (mode === "pomodoro"){
        setTaskList(taskList.map(task => task.id === selectedTaskId ? {...task, pomodorosFinished: task.pomodorosFinished === task.pomodoros ? task.pomodorosFinished : task.pomodorosFinished + 1} : task))
        setPomodorosDone((prev) => {
          if (prev === 3){
            setMode("long")
            return 0;
          } else {
            setMode("short")
            return prev + 1;
          }
        })
      }
      else {setMode("pomodoro")};
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode])

  useEffect(() => {
    const times = {
      pomodoro: pomodoroTime,
      short: shortTime,
      long: longTime
    };

    setTimeLeft(times[mode]);
    setIsRunning(false)
  }, [mode])

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  const openAddModal = () => {
    setIsEditing(false)
    setShowModal(true)
  }

  const addTask = () => {
    if (taskName.trim().length === 0){
      window.alert("Task name cannot be 0 characters");
      return
    }
    if (isEditing && setEditTaskId !== null){
      setTaskList((prev) => 
        prev.map(task => task.id === editTaskId ? {...task, name: taskName , pomodoros: pomodoros} : task)
      )
    } else {
      setTaskList(prev => [...prev, {id: Date.now(), name: taskName, pomodoros: pomodoros, pomodorosFinished: 0}])
    }

    setShowModal(false);
    setIsEditing(false);
    setEditTaskId(null);
    setTaskName("");
    setPomodoros(1);
  }

  const cancelTask = () => {
    setShowModal(false)
    setTaskName("")
    setPomodoros(1)
  }

  const editTask = (id: number) => {
    const selectedTask = taskList.find((task) => id === task.id)
    if (!selectedTask) return;
    setTaskName(selectedTask.name)
    setPomodoros(selectedTask.pomodoros)
    setEditTaskId(id)
    setIsEditing(true)
    setShowModal(true)
  }

  const deleteTask = (id: number) => {
    setTaskList(prev => prev.filter(task => task.id !== id))
  }

  const selectTask = (id: number) => {
    if(selectedTaskId === id){
      setSelectedTaskId(null)
      return
    }
    const selectedTask = taskList.find((task) => id === task.id)
    if(selectedTask!.pomodorosFinished >= selectedTask!.pomodoros){
      return
    } else {
      setSelectedTaskId(id)
    }
  }

  return (
  <div
    style={{
      backgroundColor:
        mode === "pomodoro"
          ? Color(color1).alpha(transparency).rgb().string()
          : mode === "short"
          ? Color(color2).alpha(transparency).rgb().string()
          : mode === "long"
          ? Color(color3).alpha(transparency).rgb().string()
          : Color(color1).alpha(transparency).rgb().string(),
    }}
    className={`duration-400 ease-in flex flex-col min-h-screen flex-1 items-center `}>
    <Header />
    <Card className="w-1/3 h-fit bg-white/50">
      <CardHeader className="flex flex-row items-center justify-between text-xl">
        <CardTitle
          style={{backgroundColor: mode === "pomodoro" ? Color(color1).alpha(transparency).rgb().string() : undefined}}
          className={`p-2 cursor-pointer rounded duration-400 ease-in text-gray-800`}
          onClick={() => setMode("pomodoro")}>
          Pomodoro
        </CardTitle>
        <CardTitle
          style={{backgroundColor: mode === "short" ? Color(color2).alpha(transparency).rgb().string() : undefined}}
          className={`p-2 cursor-pointer rounded duration-400 ease-in text-gray-800`}
          onClick={() => setMode("short")}>
          Short break
        </CardTitle>
        <CardTitle
        style={{backgroundColor: mode === "long" ? Color(color3).alpha(transparency).rgb().string() : undefined}}
          className={`p-2 cursor-pointer rounded duration-400 ease-in text-gray-800`}
          onClick={() => setMode("long")}>
          Long break
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <CardDescription className="text-8xl bold text-black">
          {formatTime(minutes)}:{formatTime(seconds)}
        </CardDescription>
        <CardAction className="mb-2 mt-6 flex justify-center items-center relative">
          <Button
            className="text-2xl py-6 px-20 cursor-pointer bg-white/90 text-black border-black border shadow-[0_4px_0_black] active:shadow-[0_1px_0_black] active:translate-y-[3px] transition-all duration-75 hover:bg-white/90 hover:scale-105"
            onClick={() => setIsRunning((prevI) => !prevI)}>
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button
            onClick={() => setTimeLeft(0)}
            className={`absolute -right-20 duration-300 active:duration-0 bg-transparent hover:bg-black/20 cursor-pointer active:bg-black/40 ${
              isRunning ? "opacity-100" : "opacity-0"
            }`}>
            <img
              src="/fast-forward-button-svgrepo-com.svg"
              alt="Fast forward button"
              className="w-6"
            />
          </Button>
        </CardAction>
      </CardContent>
    </Card>
    <div className="flex flex-row justify-between w-1/3 border-b-2 border-black mt-12">
      <h4>Tasks</h4>
      <button></button>
    </div>
    {taskList &&
      taskList.map((task) => (
        <Card
          onClick={() => selectTask(task.id)}
          key={task.id}
          className={`flex flex-row w-1/3 justify-between items-center mt-4 cursor-pointer py-2 border-2 border-transparent ${
            selectedTaskId === task.id ? "border-black" : ""
          }`}>
          <CardHeader className="flex items-center text-xl w-75">
            <CardTitle className="font-medium">{task.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row gap-4 items-center">
            <CardDescription className="text-xl text-black">
              {task.pomodorosFinished}/{task.pomodoros}
            </CardDescription>
            <CardAction className="flex flex-row gap-4">
              <Button onClick={(e) => {
                e.stopPropagation()
                editTask(task.id)}} 
                className="cursor-pointer text-black bg-white border border-black hover:bg-black/20 duration-75 shadow-[0_2px_0_black] active:shadow-[0_0_0] active:translate-y-0.5 p-3">
                <img src="edit-svgrepo-com.svg" alt="" className="w-6"/>
              </Button>
              <Button onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id)}}
                className="cursor-pointer text-black bg-white border border-black hover:bg-black/20 duration-75 shadow-[0_2px_0_black] active:shadow-[0_0_0] active:translate-y-0.5 p-3">
                <img src="trash-can-svgrepo-com.svg" alt="" className="w-6"/>
              </Button>
            </CardAction>
          </CardContent>
        </Card>
      ))}
    <Card onClick={openAddModal} className="flex flex-row w-1/3 justify-center items-center mt-4 cursor-pointer border-dashed border-4 border-black/50 bg-white/20 py-3">
      <CardHeader className="flex items-center justify-center w-full">
        <CardTitle>Add task</CardTitle>
      </CardHeader>
    </Card>
    {showModal && (
      <div className="fixed flex inset-0 justify-center items-center bg-black/50 z-20">
        <div
          className={`relative flex flex-col rounded-xl p-4 border-2 bg-white w-1/3 h-1/3`}
          style={{borderColor:
            mode === "pomodoro"
              ? Color(color1).darken(0.2).hex()
              : mode === "short"
              ? Color(color2).darken(0.2).hex()
              : mode === "long"
              ? Color(color3).darken(0.2).hex()
              : "black"
          }}>
          <input
            className="w-fit m-2 text-xl p-1 mb-6 rounded border border-black/50"
            type="text"
            placeholder="Enter your task here"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <h4 className="ml-2 font-bold text-xl">Pomodoros amount</h4>
          <div className="flex flex-row gap-4 items-center">
            <input
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] border rounded px-2 py-1 w-12 m-2 text-xl p-1 border-black/50"
              placeholder="1"
              type="number"
              value={pomodoros}
              min={1}
              max={99}
              onChange={(e) =>
                setPomodoros(Number(e.target.value) === 1 ? 1 : Number(e.target.value))
              }/>
            <Button onClick={() => setPomodoros((prev) => prev + 1)} className="bg-black/20 hover:bg-black/35 cursor-pointer active:-translate-y-1 duration-75">
              <img src="/up-arrow-svgrepo-com.svg" alt="up arrow" className="w-4" />
            </Button>
            <Button onClick={() => setPomodoros(pomodoros === 1 ? 1 : (prev) => prev - 1)} className="bg-black/20 hover:bg-black/35 cursor-pointer active:translate-y-1 duration-75">
              <img src="/down-arrow-svgrepo-com.svg" alt="up arrow" className="w-4" />
            </Button>
          </div>
          <div className="absolute flex flex-row justify-between ml-2 bottom-0 mb-4 gap-8">
            <Button className="flex items-center justify-center h-10 w-14 p-0 rounded border border-black bg-black/20 hover:bg-black/35 transition duration-75 cursor-pointer shadow-[0_2px_0_black] active:shadow-[0_0_0] active:translate-y-0.5"
            onClick={addTask}>
              <img src="save-svgrepo-com.svg" alt="save button" className="h-6"/>
            </Button>
            <Button className="flex items-center justify-center h-10 w-14 p-0 rounded border border-black bg-black/20 hover:bg-black/35 transition duration-75 cursor-pointer shadow-[0_2px_0_black] active:shadow-[0_0_0] active:translate-y-0.5"
            onClick={cancelTask}>
              <img src="cancel2-svgrepo-com.svg" alt="cancel button" className="h-6"/>
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}