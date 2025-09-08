import Header from '@/components/dashboard/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { studentData, coursesData } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';


export default function GradesPage() {
  const completedCourses = coursesData.filter(course => course.completion === 100);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>My Grades</CardTitle>
                    <CardDescription>A summary of your performance in completed courses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {completedCourses.length > 0 ? (
                             completedCourses.map(course => (
                                <div key={course.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                        <span className="font-medium">{course.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{studentData.courseGrades[course.name as keyof typeof studentData.courseGrades]}%</p>
                                        <p className="text-sm text-muted-foreground">Final Grade</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No completed courses yet.</p>
                                <p>Keep up the great work!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}