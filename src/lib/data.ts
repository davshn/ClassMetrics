import type { PrioritizeTasksInput } from "@/ai/flows/ai-task-prioritization";

export const studentData: PrioritizeTasksInput["studentPerformance"] & { name: string; avatarUrl: string; studentId: string; email: string, major: string, enrollmentDate: string } = {
  name: 'Alex Doe',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  studentId: 'STU-12345',
  email: 'alex.doe@example.com',
  major: 'Computer Science',
  enrollmentDate: '2022-08-20',
  averageGrade: 88,
  courseGrades: {
    'Universal History': 75,
    'Advanced Calculus': 92,
    'Organic Chemistry': 85,
    'Spanish Literature': 95,
  },
  timeSpentStudying: 15,
};

export const coursesData = [
  {
    id: '1',
    name: 'Universal History',
    icon: 'Book',
    completion: 70,
  },
  {
    id: '2',
    name: 'Advanced Calculus',
    icon: 'Calculator',
    completion: 85,
  },
  {
    id: '3',
    name: 'Organic Chemistry',
    icon: 'FlaskConical',
    completion: 60,
  },
  {
    id: '4',
    name: 'Spanish Literature',
    icon: 'Globe',
    completion: 95,
  },
];

export const tasksData: (PrioritizeTasksInput["tasks"][0] & { status: 'pending' | 'completed' })[] = [
  {
    id: 'task1',
    name: 'Essay on the French Revolution',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'high',
    course: 'Universal History',
    status: 'pending',
  },
  {
    id: 'task2',
    name: 'Solve derivative problems set',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'medium',
    course: 'Advanced Calculus',
    status: 'pending',
  },
  {
    id: 'task3',
    name: 'Lab practice: Nomenclature',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'high',
    course: 'Organic Chemistry',
    status: 'pending',
  },
  {
    id: 'task4',
    name: 'Analysis of "Don Quixote"',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'low',
    course: 'Spanish Literature',
    status: 'pending',
  },
    {
    id: 'task5',
    name: 'Cold War questionnaire',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'medium',
    course: 'Universal History',
    status: 'pending',
  },
];

export const performanceData = {
  weekly: [
    { day: 'Mon', performance: 75 },
    { day: 'Tue', performance: 80 },
    { day: 'Wed', performance: 78 },
    { day: 'Thu', performance: 85 },
    { day: 'Fri', performance: 90 },
    { day: 'Sat', performance: 88 },
    { day: 'Sun', performance: 82 },
  ],
  monthly: [
    { week: 'Wk 1', performance: 80 },
    { week: 'Wk 2', performance: 85 },
    { week: 'Wk 3', performance: 82 },
    { week: 'Wk 4', performance: 88 },
  ],
};

export const achievementsData = [
  {
    id: '1',
    text: 'Perfect score on Calculus exam',
    date: '2 days ago',
    icon: 'Trophy',
  },
  {
    id: '2',
    text: '5-day study streak completed',
    date: '3 days ago',
    icon: 'Star',
  },
  {
    id: '3',
    text: 'Chemistry project submitted early',
    date: 'Last week',
    icon: 'Rocket',
  },
];

export const studyTimeData = [
    { subject: 'History', hours: 4, fill: 'hsl(var(--chart-1))' },
    { subject: 'Calculus', hours: 6, fill: 'hsl(var(--chart-2))' },
    { subject: 'Chemistry', hours: 3, fill: 'hsl(var(--chart-3))' },
    { subject: 'Literature', hours: 2, fill: 'hsl(var(--chart-4))' },
];
