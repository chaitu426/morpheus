import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <Sidebar />
        <main className="flex-1 rounded bg-white p-6 shadow-sm">{children}</main>
      </div>
    </div>
  );
}
