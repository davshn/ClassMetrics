import {
  Activity,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  ListTodo,
  Upload,
} from 'lucide-react';

import ActiveCourses from '@/components/dashboard/ActiveCourses';
import Header from '@/components/dashboard/Header';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ProgressMetricCard from '@/components/dashboard/ProgressMetricCard';
import QuickAccess from '@/components/dashboard/QuickAccess';
import RecentAchievements from '@/components/dashboard/RecentAchievements';
import StudyTimeAnalysis from '@/components/dashboard/StudyTimeAnalysis';
import TaskList from '@/components/dashboard/TaskList';
import {
  studentData,
  coursesData,
  tasksData,
  performanceData,
  achievementsData,
  studyTimeData,
} from '@/lib/data';

export default function Home() {
  const totalTasks = tasksData.length;
  const completedTasks = tasksData.filter(t => t.status === 'completed').length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8 grid gap-6">
        {/* Row 1: Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressMetricCard
            title="Tasa de finalización"
            value={`${completionRate}%`}
            icon={CheckCircle}
            trend="up"
            trendValue="5.2%"
          />
          <ProgressMetricCard
            title="Calificación promedio"
            value={`${studentData.averageGrade}`}
            icon={GraduationCap}
            trend="down"
            trendValue="1.8%"
          />
          <ProgressMetricCard
            title="Horas de estudio (sem)"
            value={`${studentData.timeSpentStudying}`}
            icon={Clock}
            trend="up"
            trendValue="12%"
          />
          <ProgressMetricCard
            title="Tareas pendientes"
            value={`${tasksData.filter(t => t.status !== 'completed').length}`}
            icon={ListTodo}
          />
        </div>

        {/* Row 2: Charts and Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart data={performanceData} />
          </div>
          <div>
            <ActiveCourses courses={coursesData} />
          </div>
        </div>

        {/* Row 3: Tasks and Sidedata */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TaskList
              initialTasks={tasksData}
              studentPerformance={studentData}
            />
          </div>
          <div className="space-y-6">
            <StudyTimeAnalysis initialData={studyTimeData} />
            <RecentAchievements achievements={achievementsData} />
            <QuickAccess />
          </div>
        </div>
      </main>
    </div>
  );
}
