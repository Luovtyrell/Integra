import PropTypes from "prop-types";

export default function InfoCard({ title, month, year, data, unit, emoji }) {
  return (
    <div className="text-center max-w-md w-full p-4 bg-transparent rounded-xl shadow-lg text-gray-800 border-2 border-black mb-8 mt-6">
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold flex items-center justify-center">
          <span className="mr-2">{emoji}</span> {title}
        </h2>
        <p className="text-xs mt-2">
          Mes: <span className="font-medium">{month}</span> | Año:{" "}
          <span className="font-medium">{year}</span>
        </p>
        <p className="text-2xl font-bold mt-2">
          {data} <span className="text-lg">{unit}</span>
        </p>
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};
