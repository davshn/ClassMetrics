import { Rocket, Star, Trophy, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Achievement = {
  id: string;
  text: string;
  date: string;
  icon: string;
};

type RecentAchievementsProps = {
  achievements: Achievement[];
};

const iconMap: {
  [key: string]: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
} = {
  Trophy,
  Star,
  Rocket,
};

export default function RecentAchievements({
  achievements,
}: RecentAchievementsProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Recent Achievements</CardTitle>
        <CardDescription>Great work! Keep it up.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {achievements.map(achievement => {
            const Icon = iconMap[achievement.icon];
            return (
              <li key={achievement.id} className="flex items-start gap-4">
                <div className="bg-accent/20 p-2 rounded-full">
                  {Icon && <Icon className="h-5 w-5 text-accent" />}
                </div>
                <div>
                  <p className="font-medium text-sm">{achievement.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.date}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
