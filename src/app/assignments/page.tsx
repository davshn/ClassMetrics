import Header from '@/components/dashboard/Header';
import { studentData } from '@/lib/data';

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        <p>This is where assignments can be submitted.</p>
      </main>
    </div>
  );
}
