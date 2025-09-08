import { BookOpen, GraduationCap, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function QuickAccess() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Acceso Rápido</CardTitle>
        <CardDescription>Tus acciones más frecuentes.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Acceder a Clases
        </Button>
        <Button variant="secondary">
          <Upload className="mr-2 h-4 w-4" />
          Entregar Tareas
        </Button>
        <Button variant="outline">
          <GraduationCap className="mr-2 h-4 w-4" />
          Ver Calificaciones
        </Button>
      </CardContent>
    </Card>
  );
}
