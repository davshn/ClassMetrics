'use server';
/**
 * @fileOverview This file defines a Genkit flow for prioritizing student tasks using AI.
 *
 * - prioritizeTasks - A function that takes a list of tasks and student performance data and returns a prioritized list of tasks.
 * - PrioritizeTasksInput - The input type for the prioritizeTasks function.
 * - PrioritizeTasksOutput - The return type for the prioritizeTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskSchema = z.object({
  id: z.string().describe('Unique identifier for the task.'),
  name: z.string().describe('Name of the task.'),
  deadline: z.string().describe('Deadline for the task (ISO format).'),
  importance: z.enum(['high', 'medium', 'low']).describe('Importance level of the task.'),
  course: z.string().describe('The course the task is for'),
});

const StudentPerformanceSchema = z.object({
  averageGrade: z.number().describe('Student average grade across all courses.'),
  courseGrades: z.record(z.string(), z.number()).describe('Grades for each course.'),
  timeSpentStudying: z.number().describe('Total time spent studying per week in hours'),
});

const PrioritizeTasksInputSchema = z.object({
  tasks: z.array(TaskSchema).describe('List of tasks to prioritize.'),
  studentPerformance: StudentPerformanceSchema.describe('Student performance data.'),
});

export type PrioritizeTasksInput = z.infer<typeof PrioritizeTasksInputSchema>;

const PrioritizedTaskSchema = TaskSchema.extend({
  priorityScore: z.number().describe('The calculated priority score for the task.'),
  reasoning: z.string().describe('Explanation for the assigned priority score.'),
});

const PrioritizeTasksOutputSchema = z.array(PrioritizedTaskSchema);

export type PrioritizeTasksOutput = z.infer<typeof PrioritizeTasksOutputSchema>;

export async function prioritizeTasks(input: PrioritizeTasksInput): Promise<PrioritizeTasksOutput> {
  return prioritizeTasksFlow(input);
}

const prioritizeTasksPrompt = ai.definePrompt({
  name: 'prioritizeTasksPrompt',
  input: {schema: PrioritizeTasksInputSchema},
  output: {schema: PrioritizeTasksOutputSchema},
  prompt: `You are an AI assistant designed to prioritize a student's tasks based on deadlines, importance, and their academic performance.

  Here's the student's overall performance:
  Average Grade: {{studentPerformance.averageGrade}}
  Course Grades: {{studentPerformance.courseGrades}}
  Time Spent Studying: {{studentPerformance.timeSpentStudying}} hours/week

  Prioritize the following tasks:
  {{#each tasks}}
  - Task ID: {{this.id}}
    Name: {{this.name}}
    Deadline: {{this.deadline}}
    Importance: {{this.importance}}
  {{/each}}

  Consider these factors when prioritizing:
  - **Deadlines:** Tasks with closer deadlines should be prioritized higher.
  - **Importance:** High importance tasks should generally be prioritized higher.
  - **Student Performance:** If a student is struggling in a particular course (low grade), tasks for that course should be prioritized higher.
  - **Time Spent Studying:** Make sure to adjust priority so a student does not only focus on one class, distribute the work.

  Output a JSON array of tasks, each including:
  - All original task properties.
  - A "priorityScore" (a number between 0 and 100, higher is more urgent).
  - A "reasoning" field explaining why that score was assigned.
  {
    "id": "task1",
    "name": "History Essay",
    "deadline": "2024-07-01T00:00:00.000Z",
    "importance": "high",
    "course": "History",
    "priorityScore": 95,
    "reasoning": "High importance, close deadline, and student is struggling in History."
  },
  {
    "id": "task2",
    "name": "Math Homework",
    "deadline": "2024-07-05T00:00:00.000Z",
    "importance": "medium",
    "course": "Math",
    "priorityScore": 60,
    "reasoning": "Important but the deadline is more flexible.  Student is doing well in math so can afford to dedicate less time to this."
  }
  `, 
});

const prioritizeTasksFlow = ai.defineFlow(
  {
    name: 'prioritizeTasksFlow',
    inputSchema: PrioritizeTasksInputSchema,
    outputSchema: PrioritizeTasksOutputSchema,
  },
  async input => {
    const {output} = await prioritizeTasksPrompt(input);
    return output!;
  }
);
