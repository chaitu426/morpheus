import Link from "next/link";

export default function Sidebar() {
  const items = [
    { href: "/dashboard-admin", label: "Overview" },
    { href: "/dashboard-admin/users", label: "Users" },
    { href: "/dashboard-admin/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 shrink-0 border-r bg-white p-4">
      <nav>
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className="block rounded px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
