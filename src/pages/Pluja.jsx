import React from "react";
import PageLayout from "../components/PageLayout";
import MonthInfoCard from "../components/cards/MonthInfoCard";
import PronosticoLluvia from "../components/cards/PronosticoLluvia"; // Import the timeline component

const Pluja = () => {
  return (
    <PageLayout title="Pronóstico de Lluvia">
      <p>Información de lluvias para los próximos días.</p>

      {/* Display the PronosticoLluvia (Scrollable Weather Timeline) */}
      <div className="mt-8"></div>

      {/* Display the MonthInfoCard */}
      <MonthInfoCard className="mt-12" />
      <PronosticoLluvia />
    </PageLayout>
  );
};

export default Pluja;
