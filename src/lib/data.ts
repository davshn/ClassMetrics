import type { PrioritizeTasksInput } from "@/ai/flows/ai-task-prioritization";

export const studentData: PrioritizeTasksInput["studentPerformance"] = {
  averageGrade: 88,
  courseGrades: {
    'Historia Universal': 75,
    'Cálculo Avanzado': 92,
    'Química Orgánica': 85,
    'Literatura Española': 95,
  },
  timeSpentStudying: 15,
};

export const coursesData = [
  {
    id: '1',
    name: 'Historia Universal',
    icon: 'Book',
    completion: 70,
  },
  {
    id: '2',
    name: 'Cálculo Avanzado',
    icon: 'Calculator',
    completion: 85,
  },
  {
    id: '3',
    name: 'Química Orgánica',
    icon: 'FlaskConical',
    completion: 60,
  },
  {
    id: '4',
    name: 'Literatura Española',
    icon: 'Globe',
    completion: 95,
  },
];

export const tasksData: (PrioritizeTasksInput["tasks"][0] & { status: 'pending' | 'completed' })[] = [
  {
    id: 'task1',
    name: 'Ensayo sobre la Revolución Francesa',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'high',
    course: 'Historia Universal',
    status: 'pending',
  },
  {
    id: 'task2',
    name: 'Resolver serie de problemas de derivadas',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'medium',
    course: 'Cálculo Avanzado',
    status: 'pending',
  },
  {
    id: 'task3',
    name: 'Práctica de laboratorio: Nomenclatura',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'high',
    course: 'Química Orgánica',
    status: 'pending',
  },
  {
    id: 'task4',
    name: 'Análisis de "Don Quijote"',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'low',
    course: 'Literatura Española',
    status: 'pending',
  },
    {
    id: 'task5',
    name: 'Cuestionario de la Guerra Fría',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    importance: 'medium',
    course: 'Historia Universal',
    status: 'pending',
  },
];

export const performanceData = {
  weekly: [
    { day: 'Lun', performance: 75 },
    { day: 'Mar', performance: 80 },
    { day: 'Mié', performance: 78 },
    { day: 'Jue', performance: 85 },
    { day: 'Vie', performance: 90 },
    { day: 'Sáb', performance: 88 },
    { day: 'Dom', performance: 82 },
  ],
  monthly: [
    { week: 'Sem 1', performance: 80 },
    { week: 'Sem 2', performance: 85 },
    { week: 'Sem 3', performance: 82 },
    { week: 'Sem 4', performance: 88 },
  ],
};

export const achievementsData = [
  {
    id: '1',
    text: 'Calificación perfecta en examen de Cálculo',
    date: 'Hace 2 días',
    icon: 'Trophy',
  },
  {
    id: '2',
    text: 'Racha de 5 días de estudio completada',
    date: 'Hace 3 días',
    icon: 'Star',
  },
  {
    id: '3',
    text: 'Proyecto de Química entregado con antelación',
    date: 'La semana pasada',
    icon: 'Rocket',
  },
];

export const studyTimeData = [
    { subject: 'Historia', hours: 4, fill: 'var(--color-chart-1)' },
    { subject: 'Cálculo', hours: 6, fill: 'var(--color-chart-2)' },
    { subject: 'Química', hours: 3, fill: 'var(--color-chart-3)' },
    { subject: 'Literatura', hours: 2, fill: 'var(--color-chart-4)' },
];
