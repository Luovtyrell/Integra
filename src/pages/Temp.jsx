import React from "react";
import PageLayout from "../components/PageLayout";
import PronosticoTemp from "../components/cards/PronosticoTemp";

const Temp = () => {
  return (
    <PageLayout title="Pronóstico de Temperatura">
      <p>Temperaturas esperadas para la semana.</p>
      <PronosticoTemp />
    </PageLayout>
  );
};

export default Temp;
