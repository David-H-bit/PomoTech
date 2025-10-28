"use client"

import { createContext, useContext, useState, ReactNode } from "react";

type ColorContextType = {
    color1: string;
    color2: string;
    color3: string;
    setColor1: (color: string) => void;
    setColor2: (color: string) => void;
    setColor3: (color: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export function ColorProvider({children} : {children: ReactNode}){
    const [color1, setColor1] = useState("#FF0000");
    const [color2, setColor2] = useState("#00FF00");
    const [color3, setColor3] = useState("#0000FF");

    return (
    <ColorContext.Provider value={{ color1, color2, color3, setColor1, setColor2, setColor3}}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColorContext() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
}