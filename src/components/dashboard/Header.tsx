import { Bell, Search } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Student = {
  name: string;
  avatarUrl: string;
};

type HeaderProps = {
  student: Student;
};

export default function Header({ student }: { student: any }) {
  const getInitials = (name: string) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('');
  };

  const notifications = [
    { id: 1, text: 'Your essay for Universal History has been graded.' },
    { id: 2, text: 'New assignment added for Advanced Calculus.' },
    { id: 3, text: 'Reminder: Lab practice for Organic Chemistry is due tomorrow.' },
  ]

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-8">
      <div className="flex items-center gap-4">
       <Link href="/">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
        ClassMetrics
        </h1>
       </Link>
      </div>
      <div className="flex-1 max-w-md ml-8">
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className="flex items-start p-2">
                       <div className='text-sm'>{notification.text}</div>
                    </DropdownMenuItem>
                ))}
                 <DropdownMenuSeparator />
                 <DropdownMenuItem className='justify-center text-sm text-primary hover:text-primary'>
                    <Link href="#">View all notifications</Link>
                 </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={student?.avatarUrl} alt={student?.name} />
                <AvatarFallback>
                  {getInitials(student?.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
