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
    strokeColors: ["#6577F3", "#0FADCF","#80CAEE"],
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
    categories: [],
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
    max: 1000,
  },
};

interface props {
  dados: any[];
  edicao: string;
}

const ChartLinesPrincipal: React.FC<props> = ({ dados, edicao }) => {
  const [dataLines, setDataLines] = useState<ApexAxisChartSeries>([]);
  const [newOptions, setNewOptions] = useState({});

  useEffect(() => {
    if (dados.length > 0) {
      const newDataLines: ApexAxisChartSeries = [];
      var compraEdicao: any = {};

      dados.map((item: any) => {
        if (`${item.edicao}` in compraEdicao == false) {
          compraEdicao[item.edicao] = item.valor_titulo;
        }

        else {
          compraEdicao[item.edicao] = compraEdicao[item.edicao] + item.valor_titulo
        }
      });

      const dadosGrfico = Object.entries(compraEdicao).map(([key, value]) => compraEdicao[key]);

      var chanceVendas: { name: string; data: number[] } = {
        name: "vendas totais",
        data: dadosGrfico,
      };

      
      setDataLines([chanceVendas])

      const optionsEdicao = {
        ...options,
        xaxis: { ...options.xaxis, categories: Object.keys(compraEdicao) },
      };
      setNewOptions(optionsEdicao);
    }
  }, [dados]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-2">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Progresso de vendas por edição
          </h5>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={newOptions}
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

export default ChartLinesPrincipal;
