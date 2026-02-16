import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/50 px-6 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">Morpheus</Link>
        <nav className="flex gap-4">
          <Link href="/dashboard-user" className="text-sm text-zinc-600">User</Link>
          <Link href="/dashboard-tutor" className="text-sm text-zinc-600">Tutor</Link>
          <Link href="/dashboard-admin" className="text-sm text-zinc-600">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
