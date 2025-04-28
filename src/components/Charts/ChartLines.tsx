"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#6577F3", "#0FADCF"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 10000,
  },
};

interface props {
  dados: any;
  edicao: string;
}

const ChartLines: React.FC<props> = ({ dados, edicao }) => {
  const [dataLines, setDataLines] = useState<ApexAxisChartSeries>([]);

  useEffect(() => {
    const newDataLines: ApexAxisChartSeries = [];
    var teste2 = new Array();
    Object.keys(dados).map((chance, index) => {
      var chanceVendas: { name: string; data: number[] } = {
        name: chance,
        data: [],
      };

      var teste: { [key: string]: number } = {
        "7": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
      };
      Object.keys(dados[chance]).map((numero, index2) => {
        const { data_compra, valor_titulo, email } = dados[chance][numero];
        var diaSemana = new Date(data_compra).getDay();
        
        teste2.push(numero);
 
        if (diaSemana == 7) {
          diaSemana = 1;
        } else {
          diaSemana = diaSemana + 1;
        }

        teste[`${diaSemana}`] += valor_titulo;
      });
      chanceVendas.data = Object.values(teste);
      newDataLines.push(chanceVendas);
    });

    // console.log(teste2);
    setDataLines(newDataLines);
  }, [dados]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-2">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Progresso de vendas por dia
          </h5>
          <span className="text-sm font-medium text-gray-700 dark:text-white">
            Resultado {edicao}
          </span>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={dataLines}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartLines;
