"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  nome: string;
  edicao: string;
  data_inicio: string;
};

const CampanhasPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, setValue } = useForm<Inputs>();
  const router = useRouter();

  const getSorteios = async () => {
    try {
      const sorteios = await fetch("/api/sorteios", { method: "GET" });
      const data = await sorteios.json();

      for (var item in data) {
        if (data[item].ativo == true) {
          setValue("edicao", data[item].edicao);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSorteios();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);

      await fetch("/api/campanha", {
        method: "POST",
        body: JSON.stringify(data),
      });

      router.back();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cadastrar" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
        <div className="flex flex-col gap-3">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Cadastro de campanha
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nome da campanha
                    </label>
                    <input
                      {...register("nome")}
                      type="text"
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
                  <DatePickerOne register={register} />
                </div>

                <div className="flex flex-row justify-end">
                  <button disabled={loading} className="inline-flex items-center justify-center gap-2.5 rounded-md bg-success px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Cadastrar campanha
                    {loading && (
                      <div className="flex flex-row items-center justify-center">
                        <div
                          className="border-t-transparent h-6 w-6 animate-spin rounded-full border-4 border-solid
                      border-white"
                        />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CampanhasPage;
