import React from "react";
import PageLayout from "../components/PageLayout";
import PronosticoVeg from "../components/cards/PronosticoVeg";

const Vegetacio = () => {
  return (
    <PageLayout title="Estado de la Vegetación">
      <p>Condiciones de la vegetación en la región.</p>
      <PronosticoVeg />
    </PageLayout>
  );
};

export default Vegetacio;
