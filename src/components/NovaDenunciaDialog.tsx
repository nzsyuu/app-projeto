"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NovaDenunciaDialog() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [sugestoes, setSugestoes] = useState([]);

  const buscarEndereco = async (query: string) => {
    if (!query) return;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await res.json();
    setSugestoes(data);
  };

  const handleSubmit = async () => {
    if (!titulo || !descricao || !localizacao) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/denuncias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, localizacao }),
      });

      if (response.ok) {
        alert("Denúncia enviada com sucesso!");
        setTitulo("");
        setDescricao("");
        setLocalizacao("");
        setSugestoes([]);
      } else {
        alert("Erro ao enviar denúncia.");
      }
    } catch (error) {
      console.error("Erro ao enviar denúncia:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Nova Denúncia</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Denúncia</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input type="text" placeholder="Título da Denúncia" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <Textarea placeholder="Descrição detalhada" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          
          <Input
            type="text"
            placeholder="Digite a localização..."
            value={localizacao}
            onChange={(e) => {
              setLocalizacao(e.target.value);
              buscarEndereco(e.target.value);
            }}
          />

          {sugestoes.length > 0 && (
            <ul className="bg-white border rounded-md max-h-32 overflow-y-auto">
              {sugestoes.map((sugestao: any, index: number) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setLocalizacao(sugestao.display_name);
                    setSugestoes([]);
                  }}
                >
                  {sugestao.display_name}
                </li>
              ))}
            </ul>
          )}

          <Button onClick={handleSubmit} className="bg-green-500 text-white w-full">Enviar Denúncia</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
