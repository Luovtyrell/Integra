import React, { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import MonthInfoCard from "../components/cards/MonthInfoCard";
import PronosticoLluvia from "../components/cards/PronosticoLluvia"; // Import the timeline component

const Pluja = () => {
  useEffect(() => {
    const fetchApi =async() = {
      const response: any = await fetch("10.63.0.111:8080/api/temp/month/12")


    }

  },[])

  return (
    <PageLayout title="Pronóstico de Lluvia">
      <p>Información de lluvias para los próximos días.</p>

      {/* Display the PronosticoLluvia (Scrollable Weather Timeline) */}
      <div className="mt-8"></div>

      {/* Display the MonthInfoCard */}
      <MonthInfoCard className="mt-12" title={"Lluvias"} month={} year={} data={} unit={} emoji={} />
      <PronosticoLluvia />
    </PageLayout>
  );
};

export default Pluja;
