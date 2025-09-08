import type { LucideProps } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ProgressMetricCardProps = {
  title: string;
  value: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  trend?: 'up' | 'down';
  trendValue?: string;
};

export default function ProgressMetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
}: ProgressMetricCardProps) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && trendValue && (
          <p
            className={cn('text-xs text-muted-foreground flex items-center', trendColor)}
          >
            <TrendIcon className="h-4 w-4 mr-1" />
            {trendValue} desde el mes pasado
          </p>
        )}
      </CardContent>
    </Card>
  );
}
