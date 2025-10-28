"use client"
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "./AppContext";

export default function Header() {

  const [tabActive, setTabActive] = useState(false)
  const { color1, color2, color3, transparency, setColor1, setColor2, setColor3, setTransparency } = useAppContext();

  return (
    <div className="flex justify-center pb-6 w-full">
        <nav className="flex flex-row justify-between p-4 border-b border-black gap-8 w-1/2">
            <Link href={"/"} className="flex flex-row items-center gap-2"><img src="/timer-time-second-minute-svgrepo-com.svg" alt="Logo image/Home link" className="h-10"/><p className="text-xl">PomoTech</p></Link>
            <div className="flex flex-row justify-center items-center gap-8">
                <Link href={"/settings"} className="">Settings</Link>
                <button onClick={() => setTabActive(prev => !prev)} className="cursor-pointer">Preferences</button>
            </div>
        </nav>
        <div className={`absolute flex flex-col text-2xl p-4 justify-center rounded bg-white/25 border-2 border-black ${tabActive ? "opacity-100 translate-0" : "opacity-0 translate-y-50 pointer-events-none invisible"} duration-400 w-2xs h-68 top-18 transition-all right-8`}>
          <div className="flex flex-row items-center justify-between mb-4">
            <h1>Pomodoro</h1>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)}/>
          </div>
          <div className="flex flex-row items-center justify-between mb-4">
            <h1>Short</h1>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)}/>
          </div>
          <div className="flex flex-row items-center justify-between mb-4">
            <h1>Long</h1>
            <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)}/>
          </div>
          <div className="flex flex-row items-center justify-between mb-4">
            <h1>Transparency</h1>
            <input type="number" className="w-12 px-2 border-black border-2 rounded bg-white/50 text-xl" value={transparency} onChange={(e) => setTransparency(Number(e.target.value))}/>
          </div>
        </div>
    </div>
  )
}
