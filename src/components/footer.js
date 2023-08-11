import React from "react";
import Link from "next/link";
export function Footer({}) {
  return <footer className="h-[100px] bg-moonstone text-white flex flex-col justify-center items-center ">
        <div>© 2023 | <a target="_blank" href="http://jlechner.com">jlechner.com</a></div>
        <Link href="/privacy">Privacy Policy</Link>
      </footer>;
}
  