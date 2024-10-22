import React from "react";
import PageLayout from "../components/PageLayout";
import PronosticoSequia from "../components/cards/PronosticoSequia";

const Indice = () => {
  return (
    <PageLayout title="Índice de Sequía">
      <p>Información sobre el índice de sequía en la región.</p>
      <PronosticoSequia />
    </PageLayout>
  );
};

export default Indice;
