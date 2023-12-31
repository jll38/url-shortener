import React from "react";
import Link from "next/link";
export function Footer({}) {
  return (
    <footer className="h-[100px] w-full bg-moonstone text-white flex flex-col justify-center items-center relative bottom-0">
      <div>
        © 2023 |{" "}
        <a target="_blank" href="http://jlechner.com">
          jlechner.com
        </a>
      </div>
      <Link href="/privacy">Privacy Policy</Link>
    </footer>
  );
}
