import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface props {
  dados: any;
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#6577F3", "#0FADCF"],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartRounded: React.FC<props> = ({ dados }) => {
  const chances = Object.keys(dados);
  const quantidades = Object.keys(dados).map((item, index) => {
    return Object.keys(dados[item]).length;
  });
  const newOptions = {...options, labels: chances }
  console.log(quantidades);

  return (
    <div className="rounded-sm border flex flex-col justify-between border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Cartelas por chance
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={newOptions}
            series={quantidades || []}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {chances.map((chance, index) => {
          const quantidadeTotal = quantidades.reduce((accumulator, currentValue) => accumulator + currentValue,0);
          const porcent = ((quantidades[index] * 100) / quantidadeTotal).toFixed(2);
        
          const color = newOptions?.colors?.[index] || "#000000";

          return (
            <div key={index} className="w-full px-8 sm:w-1/2">
              <div className="flex w-full items-center">
                <span className={`mr-2 block h-3 w-full max-w-3 rounded-full`} style={{ backgroundColor: color }}></span>
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                  <span> {chance} </span>
                  <span> {porcent} % </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartRounded;
