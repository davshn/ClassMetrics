'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { studentData, tasksData } from '@/lib/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UploadCloud, File as FileIcon } from 'lucide-react';

const AssignmentSchema = z.object({
  taskId: z.string().min(1, 'Please select a task'),
});

type AssignmentFormValues = z.infer<typeof AssignmentSchema>;

export default function AssignmentsPage() {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);

  const pendingTasks = tasksData.filter(task => task.status === 'pending');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<AssignmentFormValues>({
    resolver: zodResolver(AssignmentSchema),
  });

  const fileList = watch('file');

  const onSubmit: SubmitHandler<AssignmentFormValues> = (data) => {
    console.log(data);
    toast({
      title: 'Assignment Submitted!',
      description: `Your assignment for "${pendingTasks.find(t => t.id === data.taskId)?.name}" has been submitted.`,
    });
    reset();
    setFileName(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setValue('file', e.target.files, { shouldValidate: true });
    } else {
      setFileName(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Submit Assignment</CardTitle>
              <CardDescription>Select a pending task and upload your document.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="taskId">Task</Label>
                  <Select onValueChange={(value) => setValue('taskId', value, {shouldValidate: true})}>
                    <SelectTrigger id="taskId">
                      <SelectValue placeholder="Select a task" />
                    </SelectTrigger>
                    <SelectContent>
                      {pendingTasks.map(task => (
                        <SelectItem key={task.id} value={task.id}>
                          {task.name} ({task.course})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.taskId && <p className="text-sm text-destructive">{errors.taskId.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="file_input">Upload File</Label>
                    <div className="relative">
                        <Input
                            id="file_input"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            {...register('file')}
                            onChange={handleFileChange}
                        />
                        <Label
                            htmlFor="file_input"
                            className="flex items-center justify-center w-full h-32 px-4 transition bg-background border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary"
                        >
                           {fileName ? (
                                <div className="flex items-center space-x-2 text-primary">
                                    <FileIcon className="h-6 w-6"/>
                                    <span>{fileName}</span>
                                </div>
                           ) : (
                                <span className="flex items-center space-x-2 text-muted-foreground">
                                    <UploadCloud className="h-6 w-6"/>
                                    <span className="font-medium">Click to upload or drag and drop</span>
                                </span>
                           )}
                        </Label>
                    </div>
                    {errors.file && <p className="text-sm text-destructive">{errors.file.message as string}</p>}
                </div>

                <Button type="submit" className="w-full">
                  Submit Assignment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}