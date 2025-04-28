"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useParams } from "next/navigation";
import { ICampanha } from "@/types/campanha";
import ChartLines from "@/components/Charts/ChartLines";
import { PiPixLogo } from "react-icons/pi";
import CardDataStats from "@/components/CardDataStats";
import { CiCreditCard2 } from "react-icons/ci";
import { LuTickets } from "react-icons/lu";
import { MdAttachMoney } from "react-icons/md";
import TableCidades from "@/components/Tables/TableCidadesVendas";
import ChartRounded from "@/components/Charts/ChartRounded";

const CampanhasPage: React.FC = () => {
  const paramns = useParams();
  const [data, setData] = useState<ICampanha | null>(null);
  const [dados, setDados] = useState({});
  const [vendas, setVendas] = useState({
    total: 0,
    quandidade_vendidos: 0,
  });
  const [metodo, setMetodo] = useState({
    pix: 0,
    cartao: 0,
  });

  const getCampanha = async () => {
    try {
      const sorteios = await fetch(`/api/campanha?id=${paramns?.id}`, {
        method: "GET",
      });
      var dataResponse: ICampanha = await sorteios.json();
      dataResponse.id =
        typeof paramns?.id === "string"
          ? paramns.id
          : Array.isArray(paramns?.id)
            ? (paramns.id[0] ?? "")
            : "";
      setData(dataResponse);

      setDados(dataResponse.vendas || {});
      var quantidade = 0;
      var total = 0;
      var pagamento = {
        pix: 0,
        cartao: 0,
      };
      const num: any = [];
      Object.keys(dataResponse.vendas).map((chance, index) => {
        Object.keys(dataResponse.vendas[chance]).map((numero, index2) => {
          const dado = dataResponse.vendas[chance][numero];

          num.push(numero);
          if (dado.tipo_pagamento == "pix") pagamento.pix += dado.valor_titulo;
          if (dado.tipo_pagamento == "cartao")
            pagamento.cartao += dado.valor_titulo;
          total += dado.valor_titulo;
          quantidade += 1;
        });
      });
      // console.log(num);

      setMetodo(pagamento);
      setVendas({ quandidade_vendidos: quantidade, total: total });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampanha();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`${data?.nome}` || ""} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
        <div className="flex flex-col gap-3">
          {/* <!-- Contact Form --> */}
            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nome da campanha
                    </label>
                    <input
                      {...register("nome")}
                      type="text"
                      disabled
                      placeholder="Ex: Campanha de Natal"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Edição
                    </label>
                    <input
                      {...register("edicao")}
                      disabled
                      type="text"
                      placeholder="Edição 10 | xx/yy/zzzz"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Data de início
                  </label>
                  <input
                    {...register("data_inicio")}
                    disabled
                    type="text"
                    placeholder="Edição 10 | xx/yy/zzzz"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="flex flex-row justify-end">
                  <button
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2.5 rounded-md bg-danger px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Excluir campanha
                    {loading && (
                      <div className="flex flex-row items-center justify-center">
                        <div
                          className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white
                      border-t-transparent"
                        />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form> */}

            <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-8 2xl:gap-7.5">
              <CardDataStats
                title="Total vendas"
                total={`R$${vendas.total},00`}
                // rate="0.43%"
                // levelUp
              >
                <MdAttachMoney color="#3C50E0" size={24} />
              </CardDataStats>

              <CardDataStats
                title="Cartelas Vendidas"
                total={`${vendas.quandidade_vendidos}`}
                // rate="2.59%"
                // levelUp
              >
                <LuTickets color="#3C50E0" size={24} />
              </CardDataStats>

              <CardDataStats
                title="Vendas no cartão"
                total={`R$${metodo.cartao},00`}
                // rate="2.59%"
                // levelUp
              >
                <CiCreditCard2 color="#3C50E0" size={24} />
              </CardDataStats>

              <CardDataStats
                title="Vendas no pix"
                total={`R$${metodo.pix},00`}
                // rate="2.59%"
                // levelUp
              >
                <PiPixLogo color="#3C50E0" size={22} />
              </CardDataStats>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:mt-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:mt-7.5 2xl:gap-7.5">
              <ChartRounded dados={dados} />
              <ChartLines
                edicao={`${data?.nome} | ${data?.edicao}` || ""}
                dados={dados}
              />
            </div>
            <div className="col-span-12 mt-4 md:mt-4 xl:col-span-8 2xl:mt-7.5">
              <TableCidades dados={dados} />
            </div>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default CampanhasPage;
