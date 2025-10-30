"use client"

import { createContext, useContext, useState, ReactNode } from "react";

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
    setAudioOneUrl: (audio: string) => void;
    setAudioTwoUrl: (audio: string) => void;
    setAudioThreeUrl: (audio: string) => void;
    setSelectedAudio: (audio: string) => void;
    setAutoStartSessions: (toggle: boolean) => void;
    setStartStopShortcut: (shortcut: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({children} : {children: ReactNode}){
    const [color1, setColor1] = useState("#FF0000");
    const [color2, setColor2] = useState("#00FF00");
    const [color3, setColor3] = useState("#0000FF");
    const [transparency, setTransparency] = useState(0.7)
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
    const [shortTime, setShortTime] = useState(5 * 60);
    const [longTime, setLongTime] = useState(10 * 60);
    const [audioOneUrl, setAudioOneUrl] = useState("/sounds/soundOne.wav");
    const [audioTwoUrl, setAudioTwoUrl] = useState("/sounds/soundTwo.wav");
    const [audioThreeUrl, setAudioThreeUrl] = useState("/sounds/soundThree.wav");
    const [selectedAudio, setSelectedAudio] = useState(audioOneUrl);
    const [AutoStartSessions, setAutoStartSessions] = useState(false);
    const [startStopShortcut, setStartStopShortcut] = useState("");

    return (
    <AppContext.Provider value={{ color1, color2, color3, transparency, pomodoroTime, shortTime, longTime, audioOneUrl, audioTwoUrl,
    audioThreeUrl, selectedAudio, AutoStartSessions, startStopShortcut, setColor1, setColor2, setColor3, setTransparency, 
    setPomodoroTime, setLongTime, setShortTime, setAudioOneUrl, setAudioTwoUrl, setAudioThreeUrl, setSelectedAudio,
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