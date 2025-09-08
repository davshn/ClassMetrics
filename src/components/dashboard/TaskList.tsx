'use client';
import {
  prioritizeTasks,
  type PrioritizeTasksInput,
  type PrioritizeTasksOutput,
} from '@/ai/flows/ai-task-prioritization';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Filter } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type TaskListProps = {
  initialTasks: PrioritizeTasksInput['tasks'];
  studentPerformance: PrioritizeTasksInput['studentPerformance'];
};

const PriorityBadge = ({ score }: { score: number }) => {
  if (score > 80) {
    return (
      <Badge variant="destructive" className="bg-red-500 text-white">
        High
      </Badge>
    );
  }
  if (score > 50) {
    return (
      <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
        Medium
      </Badge>
    );
  }
  return (
    <Badge className="bg-green-500 text-white hover:bg-green-600">Low</Badge>
  );
};

export default function TaskList({
  initialTasks,
  studentPerformance,
}: TaskListProps) {
  const [tasks, setTasks] = useState<PrioritizeTasksOutput>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const prioritized = await prioritizeTasks({
          tasks: initialTasks,
          studentPerformance,
        });
        const sortedTasks = prioritized.sort(
          (a, b) => b.priorityScore - a.priorityScore
        );
        setTasks(sortedTasks);
      } catch (error) {
        console.error('Error prioritizing tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [initialTasks, studentPerformance]);

  const courses = useMemo(
    () => ['all', ...Array.from(new Set(initialTasks.map(t => t.course)))],
    [initialTasks]
  );

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter(t => t.course === filter);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>
              Your tasks prioritized by AI.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course} value={course}>
                    {course === 'all' ? 'All courses' : course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold">{task.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {task.course} &middot; Due{' '}
                    {formatDistanceToNow(new Date(task.deadline), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </p>
                </div>
                <div className="tooltip-container relative">
                   <PriorityBadge score={task.priorityScore} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Congratulations!</p>
              <p>No tasks for this course.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
