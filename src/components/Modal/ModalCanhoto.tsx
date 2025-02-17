import React from "react";
import { Comprador, VendasCidade } from "../Tables/TableCidadesVendas";

type props = {
  compradores: Array<Comprador>;
  close: any;
  cidade: string;
};

export default function ModalCanhoto(props: props) {
  return (
    <div className="fixed inset-0 z-99999 flex h-[100vh] w-[100vw] items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-[80%] max-md:w-[100%] rounded-md border bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
        <div className="">
          <h3 className="text-2xl font-bold text-gray-900 flex flex-row text-center justify-center dark:text-slate-400 items-center">Compradores de <div className="ml-4 bg-slate-800 text-white p-2 rounded-md">{props.cidade}</div></h3>
          <div className="mt-2 px-7 max-md:px-0 py-3 max-h-[80vh] overflow-y-scroll">
            {props.compradores.map((pessoa, index) => {
              return <div key={index} className="flex flex-col flex-1 border-l-4 dark:border-strokedark dark:bg-boxdark bg-slate-50 border-blue-600 max-md:px-2 px-4 py-6 rounded-md my-6">
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col flex-1 justify-start">
                  <label className="flex mb-3 text-sm font-medium text-start text-black dark:text-white">
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Disabled label"
                    disabled
                    value={pessoa.nome}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-start">
                  <label className="mb-3 flex text-sm font-medium text-start text-black dark:text-white">
                    E-mail
                  </label>
                  <input
                    type="text"
                    placeholder="Disabled label"
                    disabled
                    value={pessoa.email}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div className="flex flex-col justify-start">
                  <label className="mb-3 flex text-sm font-medium text-start text-black dark:text-white">
                    Telefone
                  </label>
                  <input
                    type="text"
                    placeholder="Disabled label"
                    disabled
                    value={pessoa.telefone}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>
                </div>

                <div className="flex flex-row gap-4 mt-4">
                  <div className="flex flex-col flex-1 justify-start">
                  <label className="flex mb-3 text-sm font-medium text-start text-black dark:text-white">
                    Rua
                  </label>
                  <input
                    type="text"
                    placeholder="Disabled label"
                    disabled
                    value={pessoa.endereco.rua}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-start">
                  <label className="mb-3 flex text-sm font-medium text-start text-black dark:text-white">
                    Bairro
                  </label>
                  <input
                    type="text"
                    placeholder="Disabled label"
                    disabled
                    value={pessoa.endereco.bairro}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div className="flex flex-col justify-start">
                  <label className="mb-3 flex text-sm font-medium text-start text-black dark:text-white">
                    N° 
                  </label>
                  <input
                    type="text"
                    placeholder="Disabled label"
                    disabled
                    value={pessoa.endereco.numero}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div className="flex flex-col justify-start">
                  <label className="mb-3 flex text-sm font-medium text-start text-black dark:text-white">
                    Cep 
                  </label>
                  <input
                    type="text"
                    placeholder="Disabled label"
                    disabled
                    value={pessoa.endereco.cep}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>
                </div>
              </div>
            })}
          </div>
          <div className="mt-4 flex justify-center">
            {/* Using useRouter to dismiss modal*/}
            <button onClick={props.close}  className="rounded-md bg-slate-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
