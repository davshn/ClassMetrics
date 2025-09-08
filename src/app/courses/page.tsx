'use client';

import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import { studentData, coursesData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Book, Calculator, FlaskConical, Globe, BrainCog, LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const iconMap: {
  [key: string]: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
} = {
  Book: Book,
  Calculator: Calculator,
  FlaskConical: FlaskConical,
  Globe: Globe,
  BrainCog: BrainCog,
};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = coursesData.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Courses</h1>
            <div className="relative w-full max-w-sm">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search courses..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => {
                const Icon = iconMap[course.icon];
                return (
                <Link href={`/courses/${course.id}`} key={course.id}>
                    <Card className="shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center gap-4">
                        {Icon && (
                        <div className="bg-secondary p-3 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>
                        )}
                        <div className='flex-1'>
                        <CardTitle className="text-xl">{course.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-muted-foreground">Progress</span>
                                <span className="text-sm font-bold">{course.completion}%</span>
                            </div>
                            <Progress value={course.completion} />
                        </div>
                    </CardContent>
                    </Card>
                </Link>
                );
            })
          ) : (
            <p className="text-muted-foreground col-span-full text-center">No courses found matching your search.</p>
          )}
        </div>
      </main>
    </div>
  );
}
