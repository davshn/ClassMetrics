import { BookOpen, GraduationCap, Upload } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function QuickAccess() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
        <CardDescription>Your most frequent actions.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button asChild>
          <Link href="/courses">
            <BookOpen className="mr-2 h-4 w-4" />
            Access Classes
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/assignments">
            <Upload className="mr-2 h-4 w-4" />
            Submit Assignments
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/grades">
            <GraduationCap className="mr-2 h-4 w-4" />
            View Grades
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
