import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableListaVendas from "@/components/Tables/TableListaVendas";
import React from "react";

// import { Container } from './styles';

const vendas: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Vendas" />

      <div className="flex flex-col gap-10">
        <TableListaVendas />
      </div>
    </DefaultLayout>
  );
};

export default vendas;
