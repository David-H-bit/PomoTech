"use client"

import { createContext, useContext, useState, ReactNode, use, useEffect } from "react";

type AppContextType = {
    color1: string;
    color2: string;
    color3: string;
    transparency: number;
    pomodoroTime: number;
    shortTime: number;
    longTime: number;
    audioOneUrl: string;
    audioTwoUrl: string;
    audioThreeUrl: string;
    selectedAudio: string;
    startStopShortcut: string
    AutoStartSessions: boolean;
    setColor1: (color: string) => void;
    setColor2: (color: string) => void;
    setColor3: (color: string) => void;
    setTransparency: (transparency: number) => void;
    setPomodoroTime: (time: number) => void;
    setShortTime: (time: number) => void;
    setLongTime: (time: number) => void;
    setSelectedAudio: (audio: string) => void;
    setAutoStartSessions: (toggle: boolean) => void;
    setStartStopShortcut: (shortcut: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({children} : {children: ReactNode}){
    const audioOneUrl = "/sounds/soundOne.wav";
    const audioTwoUrl = "/sounds/soundTwo.wav";
    const audioThreeUrl = "/sounds/soundThree.wav";
    const [color1, setColor1] = useState("#FF0000");
    const [color2, setColor2] = useState("#00FF00");
    const [color3, setColor3] = useState("#0000FF");
    const [transparency, setTransparency] = useState(0.7)
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
    const [shortTime, setShortTime] = useState(5 * 60);
    const [longTime, setLongTime] = useState(10 * 60);
    const [selectedAudio, setSelectedAudio] = useState(audioOneUrl);
    const [AutoStartSessions, setAutoStartSessions] = useState(false);
    const [startStopShortcut, setStartStopShortcut] = useState("");

    useEffect(() => {
      const saved = localStorage.getItem("appData");
      if (!saved) return;
      const data = JSON.parse(saved);

      if (data.color1 !== undefined) setColor1(data.color1);
      if (data.color2 !== undefined) setColor2(data.color2);
      if (data.color3 !== undefined) setColor3(data.color3);
      if (data.transparency !== undefined) setTransparency(data.transparency);
      if (data.pomodoroTime !== undefined) setPomodoroTime(data.pomodoroTime);
      if (data.shortTime !== undefined) setShortTime(data.shortTime);
      if (data.longTime !== undefined) setLongTime(data.longTime);
      if (data.selectedAudio !== undefined) setSelectedAudio(data.selectedAudio);
      if (data.AutoStartSessions !== undefined) setAutoStartSessions(data.AutoStartSessions);
      if (data.startStopShortcut !== undefined) setStartStopShortcut(data.startStopShortcut);
    }, [])

    useEffect(() => {
      localStorage.setItem("appData", JSON.stringify({
        color1, color2, color3, transparency, pomodoroTime, shortTime, longTime, selectedAudio, AutoStartSessions, startStopShortcut
      }))
    }, [color1, color2, color3, transparency, pomodoroTime, shortTime, longTime, selectedAudio, AutoStartSessions, startStopShortcut])

    return (
    <AppContext.Provider value={{ color1, color2, color3, transparency, pomodoroTime, shortTime, longTime, selectedAudio, 
    AutoStartSessions, startStopShortcut, audioOneUrl, audioTwoUrl, audioThreeUrl, setColor1, setColor2, setColor3, setTransparency, 
    setPomodoroTime, setLongTime, setShortTime, setSelectedAudio,
    setAutoStartSessions, setStartStopShortcut}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
}