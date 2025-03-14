"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Ocorrencia {
  id: string;
  status: string;
  titulo: string;
  updatedAt: string;
}

export default function TabelaOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ocorrencias");
        if (!response.ok) throw new Error("Erro ao buscar ocorrências.");
        const data = await response.json();
        setOcorrencias(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOcorrencias();
  }, []);

  return (
    <Card className="p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Ocorrências</h2>
      <ScrollArea className="h-[300px] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%] px-6">Status</TableHead>
              <TableHead className="w-[50%] px-6">Título</TableHead>
              <TableHead className="w-[30%] px-6 text-right">Última Atualização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ocorrencias.length > 0 ? (
              ocorrencias.map((ocorrencia) => (
                <TableRow key={ocorrencia.id}>
                  <TableCell className="px-6">{ocorrencia.status}</TableCell>
                  <TableCell className="px-6">{ocorrencia.titulo}</TableCell>
                  <TableCell className="px-6 text-right">{new Date(ocorrencia.updatedAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500 px-6">
                  Nenhuma ocorrência encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
