'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/dashboard/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { studentData } from '@/lib/data';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header student={studentData} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your account and notification settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                            <span>Dark Mode</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Enable or disable dark mode for the dashboard.
                            </span>
                        </Label>
                        <Switch id="dark-mode" checked={isDark} onCheckedChange={toggleDarkMode}/>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                            <span>Email Notifications</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive email notifications for important updates.
                            </span>
                        </Label>
                        <Switch id="email-notifications" defaultChecked/>
                    </div>
                     <Separator />
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="task-reminders" className="flex flex-col space-y-1">
                            <span>Task Reminders</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Get reminders for upcoming task deadlines.
                            </span>
                        </Label>
                        <Switch id="task-reminders" defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
