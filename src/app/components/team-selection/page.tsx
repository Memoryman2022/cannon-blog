// app/admin/add-lineup/page.tsx
import TeamSelection from "../TeamSelection";

export default function AddLineupPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Your Lineup</h1>
      <TeamSelection />
    </main>
  );
}
