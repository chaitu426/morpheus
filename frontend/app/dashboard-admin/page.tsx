import Button from "../components/Button";

export default function AdminPage() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <div>
          <Button>New user</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded border p-4">Users: <strong>—</strong></div>
        <div className="rounded border p-4">Active: <strong>—</strong></div>
        <div className="rounded border p-4">Errors: <strong>—</strong></div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-medium">Recent activity</h2>
        <div className="space-y-2">(empty — add real data from backend)</div>
      </div>
    </section>
  );
}
