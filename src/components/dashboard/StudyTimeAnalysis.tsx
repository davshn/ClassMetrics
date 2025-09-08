'use client';

import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';

type StudyData = {
  subject: string;
  hours: number;
  fill: string;
};

type StudyTimeAnalysisProps = {
  initialData: StudyData[];
};

const chartConfig = {
  hours: {
    label: 'Hours',
  },
};

export default function StudyTimeAnalysis({
  initialData,
}: StudyTimeAnalysisProps) {
  const [studyData, setStudyData] = useState<StudyData[]>(initialData);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('studyTimeData');
      const dataToUse = savedData ? JSON.parse(savedData) : initialData;
      setStudyData(dataToUse);
    } catch (error) {
       console.error("Failed to parse study data from localStorage", error);
       setStudyData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    try {
      localStorage.setItem('studyTimeData', JSON.stringify(studyData));
      const total = studyData.reduce((sum, item) => sum + item.hours, 0);
      setTotalHours(total);
    } catch (error) {
      console.error("Failed to save study data to localStorage", error);
    }
  }, [studyData]);


  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Study Time Analysis</CardTitle>
        <CardDescription>
          Distribution of your study hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <ResponsiveContainer>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={studyData}
                dataKey="hours"
                nameKey="subject"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 5} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius}
                      innerRadius={outerRadius - 5}
                    />
                  </g>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
         <div
          className="flex flex-col items-center justify-center -mt-24"
        >
          <span className="text-3xl font-bold">{totalHours}h</span>
          <span className="text-sm text-muted-foreground">Total this week</span>
        </div>
      </CardContent>
    </Card>
  );
}
