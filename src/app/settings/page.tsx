"use client"
import Header from "../Header";
import { useAppContext } from "../AppContext";
import Color from "color";
import { useEffect, useRef } from "react";

export default function Settings() {

    const { color1, pomodoroTime, longTime, shortTime, transparency, audioOneUrl, audioTwoUrl, audioThreeUrl, selectedAudio, setPomodoroTime, setLongTime, setShortTime, setSelectedAudio} = useAppContext();
    const audioRef = useRef<any>(null)

    useEffect(() => {
        if (typeof window === "undefined") return; // make sure we're on client
        audioRef.current = new Audio(selectedAudio);
      }, [selectedAudio])

    const selectAudio = (audio: string) => {
      const newAudio = audio;
      setSelectedAudio(newAudio);
      audioRef.current.src = newAudio;
      audioRef.current.play();
    }

  return (
    <div style={{backgroundColor: Color(color1).alpha(transparency).rgb().string()}} className="min-h-screen flex flex-col items-center">
      <Header/>
      <div className="w-2/3">
        <h1 className="flex text-5xl items-center justify-center mb-2">Settings</h1>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Time settings (minutes)</h4>
          <ul>
            <li className="flex flex-row w-1/2 justify-between mb-2">
              <p>Pomodoro length</p>
              <input type="text" className="border border-black rounded px-2 w-16 bg-white/30" value={pomodoroTime / 60} onChange={(e) => setPomodoroTime(Number(e.target.value) * 60)}/>
            </li>
            <li className="flex flex-row w-1/2 justify-between mb-2">
              <p>Short break length</p>
              <input type="text" className="border border-black rounded px-2 w-16 bg-white/30" value={shortTime / 60} onChange={(e) => setShortTime(Number(e.target.value) * 60)}/>
            </li>
            <li className="flex flex-row w-1/2 justify-between mb-2">
              <p>Long break length</p>
              <input type="text" className="border border-black rounded px-2 w-16 bg-white/30" value={longTime / 60} onChange={(e) => setLongTime(Number(e.target.value) * 60)}/>
            </li>
          </ul>
        </div>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Audio settings</h4>
          <ul>
            <li className="flex flex-row w-1/2 justify-between mb-2">
              <p>Alert sound</p>
              <select name="alertSoundMenu" id="alertSoundMenu" value={selectedAudio} onChange={(e) => selectAudio(e.target.value)} className="border border-black rounded px-1 bg-white/30">
                <option value={audioOneUrl}>Audio 1</option>
                <option value={audioTwoUrl}>Audio 2</option>
                <option value={audioThreeUrl}>Audio 3</option>
              </select>
            </li>
            <li className="flex flex-row w-1/2 justify-between mb-2">
              <p >Volume control</p>
              <input type="text" placeholder="not implemented yet"/>
            </li>
          </ul>
        </div>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Task settings</h4>
          <ul>
            <li>
              <p>Auto-start next session toggle</p>
              <input type="text" placeholder="not implemented yet"/>
            </li>
          </ul>
          </div>
        <div className="border-b border-l pl-2 border-black mb-4">
          <h4 className="border-b border-black/50 w-fit text-3xl font-bold mb-2">Miscellaneous</h4>
          <ul>
            <li>
              <p>Enable/disable keyboard shortcuts</p>
              <input type="text" placeholder="not implemented yet"/>
            </li>
            <li>
              <p>Choose shortcuts</p>
              <input type="text" placeholder="not implemented yet"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
