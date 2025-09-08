import Header from '@/components/dashboard/Header';
import { coursesData, studentData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = coursesData.find(c => c.id === params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Button asChild variant="outline">
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{course.name}</CardTitle>
              <CardDescription>This is a placeholder page for the {course.name} course.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Course content, syllabus, and materials will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}