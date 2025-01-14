"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { LuTickets } from "react-icons/lu";
import CardDataStats from "@/components/CardDataStats";
import { CiCreditCard2 } from "react-icons/ci";
import { PiPixLogo } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import { useEffect, useState } from "react";
import TableCidadesVendasPrincipal from "@/components/Tables/TableCidadesVendasPrincipal";
import ChartRoundedPrincipal from "@/components/Charts/ChartRoundePrincipal";
import ChartLinesPrincipal from "@/components/Charts/ChartLinesPrincipal";

export default function Home() {
  const [dados, setDados] = useState<any[]>([]);

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
      const resultado = await fetch(`/api/vendas?id=0`, {
        method: "GET",
      });
      const data = await resultado.json();
      const dadosGerais: any = [];
      Object.keys(data).map((user, index) => {
        if (data[user].compras != undefined) {
          Object.keys(data[user]?.compras).map((compra, index2) => {
            const dataArray = Object.entries(data[user]?.compras[compra]).map(
              ([key, value]) => ({
                id: key,
                endereco: data[user].endereco,
                ...(typeof value === "object" && value !== null ? value : {}),
              }),
            );
            dadosGerais.push(...dataArray);
          });
        }
      });

      setDados(dadosGerais);
      var vendasTotais = 0;
      var quandidade_vendidos = 0;
      var vendasMetodo = {
        pix: 0,
        cartao: 0,
      };
      dadosGerais.map((item: any) => {
        vendasTotais += item.valor_titulo;
        quandidade_vendidos += item.quantidade;
        if (item.tipo_pagamento == "pix") vendasMetodo.pix += item.valor_titulo;
        if (item.tipo_pagamento == "cartao")
          vendasMetodo.cartao += item.valor_titulo;
      });

      setVendas({
        quandidade_vendidos: quandidade_vendidos,
        total: vendasTotais,
      });

      setMetodo(vendasMetodo);
    };

    buscarVendas();
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <DefaultLayout>
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
          <ChartRoundedPrincipal dados={dados} />
          <ChartLinesPrincipal edicao={""} dados={dados} />
        </div>
        <div className="col-span-12 mt-4 md:mt-4 xl:col-span-8 2xl:mt-7.5">
          <TableCidadesVendasPrincipal dados={dados} />
        </div>
      </DefaultLayout>
    </div>
  );
}
