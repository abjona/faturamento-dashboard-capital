"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChartLines from "@/components/Charts/ChartLines";
import ChartRounded from "@/components/Charts/ChartRounded";
import { FaPix } from "react-icons/fa6";
import { PiPixLogo } from "react-icons/pi";
import { CiCreditCard2 } from "react-icons/ci";
import { LuTickets } from "react-icons/lu";
import { MdAttachMoney } from "react-icons/md";
import TableCidades from "@/components/Tables/TableCidadesVendas";

// import { Container } from './styles';

const VendasDetalhes: React.FC = () => {
  const paramns = useParams();
  const search = useSearchParams();
  const [dados, setDados] = useState({});
  const edicao = search
    ?.get("edicao")
    ?.split("-")
    .reverse()
    .join()
    .replaceAll(",", "/");
  const [vendas, setVendas] = useState({
    total: 0,
    quandidade_vendidos: 0,
  });
  const [metodo, setMetodo] = useState({
    pix: 0,
    cartao: 0,
  });

  useEffect(() => {
    const buscarVendas = async () => {
      if (paramns != null && paramns.id != null) {
        const resultado = await fetch(`/api/vendas?id=${paramns.id}`, {
          method: "GET",
        });
        const data = await resultado.json();
        
        setDados(data);
        var quantidade = 0;
        var total = 0;
        var pagamento = {
          pix: 0,
          cartao: 0,
        };
        const num : any= []
        Object.keys(data).map((chance, index) => {
          Object.keys(data[chance]).map((numero, index2) => {
            const dado = data[chance][numero];
            
            num.push(numero)
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
      }
    };

    buscarVendas();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Edição - ${edicao}`} />
      <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-8 2xl:gap-7.5">
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
      <div className="2xl:mt-7.5 md:mt-4 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <ChartRounded dados={dados} />
        <ChartLines edicao={edicao || ""} dados={dados} />
      </div>
      <div className="col-span-12 xl:col-span-8 2xl:mt-7.5 md:mt-4 mt-4">
        {/* <TableCidades dados={dados} /> */}
      </div>
    </DefaultLayout>
  );
};

export default VendasDetalhes;
