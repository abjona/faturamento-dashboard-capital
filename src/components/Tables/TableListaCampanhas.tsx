"use client";
import { ICampanha } from "@/types/campanha";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const TableListaCampanhas: React.FC = () => {
  const [campanhas, setCampanhas] = useState<ICampanha[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const buscarCampanhas = async () => {
      const resposta = await fetch("/api/campanha", { method: "GET" });
      const data = await resposta.json();

      const dataArray: any = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...(typeof value === "object" && value !== null ? value : {}),
      }));
      setCampanhas(dataArray);
    };

    buscarCampanhas();
  }, []);

  const copiarLink = (copiarLink: string) => {
    navigator.clipboard.writeText(copiarLink || "");
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="text-md font-bold">Nome</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-bold">Edição</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-bold">Data de início</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-bold">Opções</p>
        </div>
      </div>

      {campanhas != null &&
        campanhas.map((item: any, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-md text-black dark:text-white">
                  {item.nome}
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-md text-black dark:text-white">
                  {item.edicao}
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-md text-black dark:text-white">
                  {item.data_inicio}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex cursor-pointer flex-row items-center justify-start gap-1">
              <div onClick={() => copiarLink(`https://loja.capitalpremios.com.br?campanha=${item.id}`) } className="inline-flex gap-2 rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                <FiCopy size={20} className="text-success" />
                <p>Copiar link</p>
              </div>
              <div onClick={() => router.push(`/dashboard/campanhas/${item.id}`)} className="inline-flex gap-2 rounded-full bg-blue-600 bg-opacity-10 px-3 py-1 text-sm font-medium text-blue-600">
                <MdOutlineRemoveRedEye size={20} className="text-blue-600" />
                <p>Ver</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TableListaCampanhas;
