"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableListaCampanhas from "@/components/Tables/TableListaCampanhas";

const CampanhasPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Campanhas" />
      <TableListaCampanhas />
    </DefaultLayout>
  );
};

export default CampanhasPage;
