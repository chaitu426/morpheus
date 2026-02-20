import DashboardShell from "../../components/DashboardShell";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
