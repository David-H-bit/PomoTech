"use client"
import Header from "../Header";
import { useAppContext } from "../AppContext";
import Color from "color";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Settings() {

    const { color1, pomodoroTime, longTime, shortTime, transparency, audioOneUrl, audioTwoUrl, audioThreeUrl,
    selectedAudio, startStopShortcut, AutoStartSessions, setPomodoroTime, setLongTime, setShortTime,
    setSelectedAudio, setAutoStartSessions, setStartStopShortcut} = useAppContext();
    const audioRef = useRef<any>(null)
    const [audioVolume, setAudioVolume] = useState<number>(() => {
      if (typeof window === "undefined") return 0.5;
      const saved = localStorage.getItem("settingsData");
      return saved ? JSON.parse(saved).audioVolume ?? 0.5 : 0.5;
    });
    const [keysModal, setKeysModal] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return; // make sure we're on client
      audioRef.current = new Audio(selectedAudio);
      audioRef.current.volume = audioVolume
    }, [selectedAudio])

    useEffect(() => {
      if (audioRef.current) audioRef.current.volume = audioVolume;
    }, [audioVolume]);

    useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("settingsData");
    const data = saved ? JSON.parse(saved) : {};
    localStorage.setItem(
      "settingsData",
      JSON.stringify({
        ...data,
        audioVolume,
        selectedAudio,
      })
      );
    }, [audioVolume, selectedAudio]);

    const selectAudio = (audio: string) => {
      setSelectedAudio(audio);
      if (!audioRef.current) return;
      audioRef.current.src = audio;
      audioRef.current.play();
    }

    const displayKey = (key: string) => {
      if (key === " ") return "spacebar";
      return key;
    }

  return (
    <div style={{backgroundColor: Color(color1).alpha(transparency).rgb().string()}} className="min-h-screen flex flex-col items-center">
      <Header/>
      <div className="w-2/3">
        <h1 className="flex text-5xl items-center justify-center mb-2">Settings</h1>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Time settings (minutes)</h4>
          <ul>
            <li className="flex flex-row w-1/3 justify-between mb-2">
              <p className="text-lg">Pomodoro length</p>
                <input type="number" className="border border-black rounded px-2 w-16 bg-white/30" value={pomodoroTime / 60} onChange={(e) => setPomodoroTime(Number(e.target.value) * 60)}/>
            </li>
            <li className="flex flex-row w-1/3 justify-between mb-2">
              <p className="text-lg">Short break length</p>
              <input type="number" className="border border-black rounded px-2 w-16 bg-white/30" value={shortTime / 60} onChange={(e) => setShortTime(Number(e.target.value) * 60)}/>
            </li>
            <li className="flex flex-row w-1/3 justify-between mb-2">
              <p className="text-lg">Long break length</p>
              <input type="number" className="border border-black rounded px-2 w-16 bg-white/30 appearance-auto" value={longTime / 60} onChange={(e) => setLongTime(Number(e.target.value) * 60)}/>
            </li>
          </ul>
        </div>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Audio settings</h4>
          <ul>
            <li className="flex flex-row w-1/3 justify-between mb-2">
              <p className="text-lg">Alert sound</p>
              <select name="alertSoundMenu" id="alertSoundMenu" value={selectedAudio} onChange={(e) => selectAudio(e.target.value)} className="border border-black rounded px-1 bg-white/30">
                <option value={audioOneUrl}>Audio 1</option>
                <option value={audioTwoUrl}>Audio 2</option>
                <option value={audioThreeUrl}>Audio 3</option>
              </select>
            </li>
            <li className="flex flex-row w-1/3 justify-between mb-2">
              <p className="text-lg">Audio volume</p>
              <input type="range" min={0} max={1} step={0.01} className="w-1/3 accent-black" value={audioVolume} onChange={(e) => setAudioVolume(Number(e.target.value))}/>
            </li>
          </ul>
        </div>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Task settings</h4>
          <ul>
            <li className="flex flex-row w-1/3 justify-between items-center mb-2">
              <p className="text-lg">Auto-start next session</p>
              <Switch checked={AutoStartSessions} onCheckedChange={setAutoStartSessions}/>
            </li>
          </ul>
          </div>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Miscellaneous</h4>
          <ul>
            <li className="my-4 ">
                <Button onClick={() => setKeysModal(true)} className="text-black cursor-pointer shadow-[0_2px_0_black] active:shadow-none active:translate-y-0.5 hover:bg-white/60 bg-white/30 rounded px-3 py-1 text-lg border-black border">Choose keyboard shortcuts</Button>
            </li>
          </ul>
        </div>
      </div>
      {keysModal && 
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="relative flex flex-col justify-between rounded-xl p-6 border bg-white border-black w-1/3 h-1/3">
            <div className="flex flex-row items-center gap-4">
              <h1 className="text-lg font-semibold">Start/Stop Timer</h1>
              <div
                tabIndex={0}
                className="border border-black rounded p-2 w-28 text-center cursor-text focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                onKeyDown={(e) => {
                  e.preventDefault();
                  setStartStopShortcut(e.key);
                }}>
                {startStopShortcut ? displayKey(startStopShortcut) : "Empty"}
              </div>
            </div>
            <div className="flex justify-start  gap-4 mt-4">
              <Button
                className="flex items-center justify-center h-10 w-14 p-0 rounded border border-black bg-white hover:bg-black/20 transition duration-75 cursor-pointer shadow-[0_2px_0_black] active:shadow-[0_0_0] active:translate-y-0.5"
                onClick={() => setKeysModal(false)}>
                <img src="save-svgrepo-com.svg" alt="save button" className="h-6" />
              </Button>
            </div>    
          </div>
        </div>
      }
    </div>
  )
}
