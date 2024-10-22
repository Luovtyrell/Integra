import PageLayout from "../components/PageLayout";
import MonthInfoCard from "../components/cards/MonthInfoCard";
import PronosticoLluvia from "../components/cards/PronosticoLluvia"; // Import the timeline component
import PrecipitationChart from "../components/charts/PrecipitationCharts";

const Pluja = () => {
  return (
    <>
      <PageLayout title="Pronóstico de Lluvia">
        <p>Información de lluvias para los próximos días.</p>

        {/* Display the MonthInfoCard */}
        <MonthInfoCard className="mt-12" />

        {/* Display the PronosticoLluvia (Scrollable Weather Timeline) */}
        <div className="mt-8">
          <PronosticoLluvia />
          <PrecipitationChart />
        </div>
      </PageLayout>
    </>
  );
};

export default Pluja;
