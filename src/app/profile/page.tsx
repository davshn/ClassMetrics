import Header from '@/components/dashboard/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { studentData } from '@/lib/data';

export default function ProfilePage() {
    const getInitials = (name: string) => {
        if (!name) return '??';
        return name
          .split(' ')
          .map((n: string) => n[0])
          .join('');
      };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24 text-3xl">
                            <AvatarImage src={studentData.avatarUrl} alt={studentData.name} />
                            <AvatarFallback>{getInitials(studentData.name)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-3xl">{studentData.name}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">{studentData.major}</CardDescription>
                </CardHeader>
                <CardContent className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 rounded-lg bg-secondary">
                            <p className="text-sm text-muted-foreground">Student ID</p>
                            <p className="text-lg font-semibold">{studentData.studentId}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="text-lg font-semibold">{studentData.email}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                            <p className="text-sm text-muted-foreground">Enrollment Date</p>
                            <p className="text-lg font-semibold">{studentData.enrollmentDate}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                            <p className="text-sm text-muted-foreground">Average Grade</p>
                            <p className="text-lg font-semibold">{studentData.averageGrade}%</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                            <p className="text-sm text-muted-foreground">Weekly Study Hours</p>
                            <p className="text-lg font-semibold">{studentData.timeSpentStudying}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                            <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                            <p className="text-lg font-semibold">{Object.keys(studentData.courseGrades).length}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
