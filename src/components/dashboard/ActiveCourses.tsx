import {
  Book,
  Calculator,
  FlaskConical,
  Globe,
  type LucideProps,
} from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type Course = {
  id: string;
  name: string;
  icon: string;
  completion: number;
};

type ActiveCoursesProps = {
  courses: Course[];
};

const iconMap: {
  [key: string]: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
} = {
  Book: Book,
  Calculator: Calculator,
  FlaskConical: FlaskConical,
  Globe: Globe,
};

export default function ActiveCourses({ courses }: ActiveCoursesProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <CardHeader>
        <CardTitle>Cursos Activos</CardTitle>
        <CardDescription>Tu progreso en los cursos actuales.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {courses.map(course => {
            const Icon = iconMap[course.icon];
            return (
              <li key={course.id}>
                <div className="flex items-center gap-4 mb-1">
                  {Icon && (
                    <div className="bg-secondary p-2 rounded-md">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <span className="font-medium flex-1">{course.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {course.completion}%
                  </span>
                </div>
                <Progress value={course.completion} />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
