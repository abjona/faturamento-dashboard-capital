"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableListaSorteios from "@/components/Tables/TableListaSorteios";
import React, { useEffect } from "react";

// import { Container } from './styles';

const sorteios: React.FC = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sorteios" />

      <div className="flex flex-col gap-10">
        <TableListaSorteios />
      </div>
    </DefaultLayout>
  );
};

export default sorteios;
