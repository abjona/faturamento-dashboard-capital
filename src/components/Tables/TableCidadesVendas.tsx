"use client";

import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ModalCanhoto from "../Modal/ModalCanhoto";

const brandData: BRAND[] = [
  {
    name: "Google",
    revenues: "5,768",
    conversion: 4.8,
  },
  {
    name: "Twitter",
    revenues: "4,635",
    conversion: 4.3,
  },
  {
    name: "Github",
    revenues: "4,290",
    conversion: 3.7,
  },
  {
    name: "Vimeo",
    revenues: "3,580",
    conversion: 2.5,
  },
  {
    name: "Facebook",
    revenues: "6,768",
    conversion: 4.2,
  },
];

interface props {
  dados: any;
}

export interface Comprador {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: {
      bairro: string;
      cep: string;
      cidade: string;
      estado: string;
      uf: string;
      rua: string;
      numero: string;
    }
};

export interface VendasCidade {
  [cidade: string]: {
    uf: string;
    estado: string;
    total_vendas: number;
    compradores: Array<Comprador>;
  };
}


const TableCidades = ({ dados }: props) => {
  
  const [vendasCidades, setVendasCidades] = useState<VendasCidade>({});
  const [modal, setModal] = useState(false);
  const [cidade, setCidade] = useState("");

  useEffect(() => {
    const dadosCidades: any[] = [];
    Object.keys(dados).map((chance) => {
      const dataArray = Object.entries(dados[chance]).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return { id: key, ...value };
        } else {
          return { id: key };
        }
      });
      dadosCidades.push(...dataArray);
    });

    var vendasCidades: VendasCidade = {};
    dadosCidades.forEach((dado) => {
      const compradores = vendasCidades[dado.endereco.cidade]?.compradores
        ? [
            ...vendasCidades[dado.endereco.cidade]?.compradores,
            {
              cpf: dado.cpf,
              nome: dado.nome,
              email: dado.email,
              endereco: dado.endereco,
              telefone: dado.telefone,
            },
          ]
        : [
            {
              cpf: dado.cpf,
              nome: dado.nome,
              email: dado.email,
              endereco: dado.endereco,
              telefone: dado.telefone,
            },
          ];

      vendasCidades[dado.endereco.cidade] = {
        estado: dado.endereco.estado,
        uf: dado.endereco.uf,
        compradores: compradores,
        total_vendas:
          (vendasCidades[dado.endereco.cidade]?.total_vendas || 0) +
          dado.valor_titulo,
      };
    });

    const sortedData = Object.fromEntries(
      Object.entries(vendasCidades).sort(
        ([, a], [, b]) => b.total_vendas - a.total_vendas,
      ),
    );
    console.log(sortedData);

    setVendasCidades(sortedData);
  }, [dados]);

  return (
    <>
     {modal && <ModalCanhoto cidade={cidade} close={()=> setModal(false)} compradores={vendasCidades[cidade].compradores} />}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Vendas por cidade
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="col-span-2 p-2.5 xl:p-5">
              <h5 className="text-sm font-semibold uppercase xsm:text-base">
                Cidade
              </h5>
            </div>
            <div className="col-span-1 p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-semibold uppercase xsm:text-base">
                UF
              </h5>
            </div>
            <div className="col-span-1 hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-semibold uppercase xsm:text-base">
                Vendas
              </h5>
            </div>

            <div className="col-span-1 hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-semibold uppercase xsm:text-base">
                COMPRADORES
              </h5>
            </div>
          </div>

          {Object.keys(vendasCidades).map((cidade, index) => (
            <div
              className={`grid grid-cols-4 sm:grid-cols-5 ${
                index === Object.keys(vendasCidades).length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={index}
            >
              <div className="col-span-2 flex items-center gap-3 p-2.5 xl:p-5">
                {/* <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div> */}
                <p className="hidden font-medium text-black dark:text-white sm:block">
                  {cidade}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-meta-5">
                  {vendasCidades[cidade].uf}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-meta-3">
                  ${vendasCidades[cidade].total_vendas},00
                </p>
              </div>
              <div
                className="flex cursor-pointer items-center justify-center p-2.5 xl:p-5"
                onClick={() => {
                  setCidade(cidade);
                  setModal(true);
                }}
              >
                <p className="inline-flex gap-2 rounded-full bg-blue-600 bg-opacity-10 px-3 py-1 text-sm font-medium text-blue-600">
                  <MdOutlineRemoveRedEye size={20} className="text-blue-600" />
                  <p>Ver</p>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableCidades;
