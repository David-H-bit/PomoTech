import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center pb-6 w-full">
        <nav className="flex flex-row justify-between p-4 border-b border-black gap-8 w-1/2">
            <Link href={"/"} className="flex flex-row items-center gap-2"><img src="/logo.svg" alt="Logo image/Home link" className="h-10"/><p className="text-xl">PomoTech</p></Link>
            <div className="flex flex-row justify-center items-center gap-8">
                <Link href={"/settings"} className="">Settings</Link>
                <Link href={"/preferences"} className="">Preferences</Link>
            </div>
        </nav>
    </div>
  )
}
