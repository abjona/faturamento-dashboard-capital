"use client";

import { useEffect, useState } from "react";

interface props {
  dados: any[];
}

const TableCidadesVendasPrincipal = ({ dados }: props) => {
  interface VendasCidade {
    [cidade: string]: {
      uf: string;
      estado: string;
      total_vendas: number;
    };
  }

  const [vendasCidades, setVendasCidades] = useState<VendasCidade>({});

  useEffect(() => {
    if (dados.length > 0) {

      var vendasCidades: VendasCidade = {};
      dados?.map((dado: any) => {

        vendasCidades[dado.endereco.cidade] = {
          estado: dado.endereco.estado,
          uf: dado.endereco.uf,
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
      setVendasCidades(sortedData);
    }
  }, [dados]);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Vendas por cidade
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="col-span-3 p-2.5 xl:p-5">
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
        </div>

        {Object.keys(vendasCidades).map((cidade, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              index === Object.keys(vendasCidades).length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            <div className="col-span-3 flex items-center gap-3 p-2.5 xl:p-5">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableCidadesVendasPrincipal;
