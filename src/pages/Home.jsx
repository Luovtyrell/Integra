import React, { useRef } from "react";
import MainCards from "../components/cards/MainCards";
import Pluja from "../pages/Pluja";
import Temp from "../pages/Temp";
import Vegetacio from "../pages/Vegetacio";
import Indice from "../pages/Indice";

const Home = () => {
  // Create refs for each section
  const mainCardsRef = useRef(null);
  const plujaRef = useRef(null);
  const tempRef = useRef(null);
  const vegetacioRef = useRef(null);
  const indiceRef = useRef(null);

  return (
    <div>
      {/* Horizontal Scrollable Section */}
      <div className="min-h-screen w-full overflow-x-scroll snap-x snap-mandatory flex scroll-smooth">
        <div
          className="w-full h-full snap-center flex-shrink-0"
          ref={mainCardsRef}
        >
          <MainCards
            plujaRef={plujaRef}
            tempRef={tempRef}
            vegetacioRef={vegetacioRef}
            indiceRef={indiceRef}
          />
        </div>
        <div className="w-full h-full snap-center flex-shrink-0" ref={plujaRef}>
          <Pluja />
        </div>
        <div className="w-full h-full snap-center flex-shrink-0" ref={tempRef}>
          <Temp />
        </div>
        <div
          className="w-full h-full snap-center flex-shrink-0"
          ref={vegetacioRef}
        >
          <Vegetacio />
        </div>
        <div
          className="w-full h-full snap-center flex-shrink-0"
          ref={indiceRef}
        >
          <Indice />
        </div>
      </div>
    </div>
  );
};

export default Home;
