// src/components/ShadcnExample.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function ShadcnExample() {
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Selamat Datang di shadcn/ui</CardTitle>
        <CardDescription>Membangun UI yang indah tidak pernah semudah ini.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Komponen ini ditambahkan langsung ke proyek Anda, memberikan kontrol penuh
          untuk kustomisasi.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Info</Button>
        <Button>Mulai</Button>
      </CardFooter>
    </Card>
  );
}

export default ShadcnExample;