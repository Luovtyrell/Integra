import PropTypes from "prop-types";

export default function MenuCard({ title, description, scrollTo }) {
  return (
    <div className="card bg-gradient-to-br from-yellow-300 to-yellow-400 text-gray-800 w-full shadow-lg rounded-xl border-2 border-black p-4">
      <div className="card-body p-2">
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <p className="text-sm mb-2">{description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-xs btn-accent text-black border-black bg-white"
            onClick={scrollTo}
          >
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}

MenuCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  scrollTo: PropTypes.func.isRequired, // Changed from `to` to `scrollTo`
};
