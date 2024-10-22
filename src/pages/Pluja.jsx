import PageLayout from "../components/PageLayout";
import MonthInfoCard from "../components/cards/MonthInfoCard";
import PronosticoLluvia from "../components/cards/PronosticoLluvia"; // Import the timeline component
import PrecipitationChart from "../components/charts/PrecipitationCharts";
import NavbarFooter from "../components/navbars/NavbarFooter";
import NavbarHeader from "../components/navbars/NavbarHeader";

const Pluja = () => {
  return (
    <>
      <NavbarHeader />

      <PageLayout title="Pronóstico de Lluvia">
        <p>Información de lluvias para los próximos días.</p>

        {/* Display the MonthInfoCard */}
        <MonthInfoCard className="mt-12" />

        {/* Display the PronosticoLluvia (Scrollable Weather Timeline) */}
        <div className="mt-8">
          <PronosticoLluvia />
          <PrecipitationChart />
        </div>
        <NavbarFooter />
      </PageLayout>
    </>
  );
};

export default Pluja;
