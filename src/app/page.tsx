import NovaDenunciaDialog from "@/components/NovaDenunciaDialog";
import TabelaOcorrencias from "@/components/OcorrenciasTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <div className="flex flex-row  gap-2">
          <div className="flex flex-col">
            <label>Insira o Código da Denúncia</label>
            <Input placeholder="Código da denúncia"></Input>
          </div>
            <Button className="mt-6">Buscar Denúncia</Button>
          <div className="mt-6">
            <NovaDenunciaDialog/>
          </div>
      </div>
      <div>
        {/* tabela com ocorrências */}
        <TabelaOcorrencias/>
      </div>
      <p className="text-lg mt-4">
        Este é um exemplo de uso do ShadCN UI em um projeto React.
      </p>
    </div>
  );
}