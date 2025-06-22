"use client";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="p-4 shadow mb-8 bg-gray-100 flex gap-4">
        <Link href="/" className="hover:underline text-blue-600 font-medium">
          Home
        </Link>
        <Link
          href="/about"
          className="hover:underline text-blue-600 font-medium"
        >
          About
        </Link>
        <Link
          href="/ai-editor"
          className="hover:underline text-blue-600 font-medium"
        >
          AI Editor
        </Link>
      </nav>
      <main className="px-4">{children}</main>
    </div>
  );
}
