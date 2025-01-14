"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ISorteio } from "@/types/sorteio";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";

const TableListaVendas: React.FC = () => {
  const [sorteio, setSorteio] = useState<ISorteio[] | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const buscarSorteios = async () => {
      const resposta = await fetch("/api/sorteios", { method: "GET" });
      const data = await resposta.json();

      const dataArray: { id: string; resultado?: string }[] = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...(typeof value === "object" && value !== null ? value : {}),
      }));

      const ordenados: any = dataArray.sort((a, b) => new Date(b.resultado || "").getTime() - new Date(a.resultado || "").getTime());

      setSorteio(ordenados);
    };

    buscarSorteios();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="text-md font-bold">Edição do sorteio</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-bold">Status</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-bold">chances | Preço</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-bold">Opções</p>
        </div>
      </div>

      {sorteio != null &&
        sorteio.map((item: any, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <Image
                    src={item.urlImagem}
                    width={60}
                    height={50}
                    className="h-[50px] w-[60px] object-cover"
                    alt="Product"
                  />
                </div>
                <p className="text-md text-black dark:text-white">
                  {item.edicao}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p
                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${item.ativo ? "bg-success text-success" : "bg-danger text-danger"}`}
              >
                {item.ativo ? "Ativo" : "Encerrado"}
              </p>
            </div>
            <div className="col-span-2 flex flex-col items-start justify-center gap-2">
              {Object.keys(item.chances).map((chance, index) => {
                return (
                  <div key={index} className="flex flex-row gap-2">
                    <p className="inline-flex rounded-full bg-gray-600 dark:bg-gray-300 dark:bg-opacity-10 bg-opacity-10 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-200">
                      {" "}
                      <p className="font-bold">{chance} </p> {"  "}| R${" "}
                      {item.chances[chance].valor},00{" "}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="col-span-1 justify-start items-center flex-row flex cursor-pointer" onClick={() => router.push(`/dashboard/vendas/${item.range_id}?edicao=${item.resultado}`)}>
              <p className="gap-2 inline-flex rounded-full bg-blue-600 bg-opacity-10 px-3 py-1 text-sm font-medium text-blue-600">
                <MdOutlineRemoveRedEye size={20} className="text-blue-600"/>
                <p>Ver</p>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TableListaVendas;
