"use client";
import { Button } from "@/components/ui/button"; // Importando o botão do ShadCN UI
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token); // Salvar token para uso posterior
      alert("Login realizado com sucesso!");
      // Entrar na outra página
    } else {
      alert("Credenciais inválidas.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="E-mail"
          className="border p-2 w-full mb-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full mb-4 rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
