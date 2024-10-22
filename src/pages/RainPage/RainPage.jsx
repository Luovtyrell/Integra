import NavbarHeader from "../../components/navbars/NavbarHeader";
import NavbarFooter from "../../components/navbars/NavbarFooter";
import PrecipitationChart from "../../components/charts/PrecipitationCharts";

function RainPage() {
  return (
    <>
      <NavbarHeader />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Precipitacions mensuals</h1>
        <PrecipitationChart />
      </div>
      <NavbarFooter />
    </>
  );
}

export default RainPage;
