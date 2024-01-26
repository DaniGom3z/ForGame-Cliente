import React, { useState } from "react";
import NavBar from "../organism/Navbar";
import Imagen from "../../assets/epic-games-logo.webp"
import Imagen2 from "../../assets/Steam-Logo-700x394.webp"
import Instagram from "../../assets/instagram-logo.webp"
import Discord from "../../assets/disc.webp"
import X from "../../assets/rQYXqS5v-F1ySdm9WYAIbjHo-1024x1024.webp"
import useShortPollingWithWriteGame from "../hooks/shortPolling";
import useLongPolling from '../hooks/longPolling';



function HomeAdmin() {
  const juegoPopularUrl = 'http://localhost:4000/popular';
  const { popularGame, updatePopularGame } = useShortPollingWithWriteGame(juegoPopularUrl);
  const data = useLongPolling('http://localhost:4000/conexion');

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="flex flex-wrap pl-16 pr-16 max-sm:justify-center ">
      <div className="w-full md:w-8/12 h-96 border-2 text-center rounded-tl-lg border-popular p-4">
          <h1 className="text-white text-2xl font-bold font-body">
            Juego popular del día
          </h1>
          <div className="flex justify-center items-center h-4/6 mt-7">
          <h3 className="text-center text-5xl font-game text-white">
              {popularGame}
            </h3>
          </div>
          <input
              className="h-8"
              type="text"
              placeholder="Nombre del juego"
              value={popularGame}
              onChange={(e) => updatePopularGame(e.target.value)}
            />
            <button
              className="w-auto h-auto p-1 rounded-r-lg bg-sky-400"
              onClick={() => updatePopularGame(popularGame)}
            >
              Actualizar
            </button>
        </div>

        <div className="md:ml-auto border-2 max-sm:w-auto w-3/12 max-sm:mt-10 text-center rounded-tr-lg border-conectados p-4">
          <h3 className="text-white text-xl font-bold">Gamers conectados:</h3>
          <h5 className="bg-total px-2 py-1 rounded-full ml-2">{data && data.totalUsuarios}</h5>
          <h3 className=" text-white mt-5 text-2xl font-semibold">Redes</h3>
          <div className=" flex flex-wrap items-center max-sm:h-auto h-2/3 gap-x-7">
              <img className=" size-24" src={X} alt="Logo de x" />
              <img className=" size-24" src={Instagram} alt="Logo de instagram" />
              <img className=" size-24" src={Discord} alt="Logo de discord" />
          </div>

        </div>
      </div>
      <section className="flex flex-wrap max-sm:h-[900px] pl-16 pr-16 mt-5">
        <div className=" w-full md:w-8/12 h-60 text-white flex flex-wrap p-10 pl-0 pr-0 gap-x-20  gap-y-7 ">
            <div className=" bg-slate-900 w-[475px] h-24 flex flex-wrap backdrop-opacity-10 backdrop-invert bg-white/30 rounded-md max-sm:w-full p-4">
              <img className=" h-full mr-7" src={Imagen} alt="epic games" />
              <h3>Guía para el Black Friday de la Epic Games Store.</h3>
            </div>
            <div className=" bg-slate-800 w-[475px] h-24 flex flex-wrap backdrop-opacity-10 backdrop-invert bg-white/30 rounded-md max-sm:w-full p-4">
              <img className=" h-full mr-7" src={Imagen2} alt="steam" />
              <h3>The Invincible: siente el terror cósmico </h3>
            </div>
            <div className=" bg-slate-900 w-[475px] h-24 flex flex-wrap backdrop-opacity-10 backdrop-invert bg-white/30 rounded-md max-sm:w-full p-4">
              <img className=" h-full mr-7 " src={Imagen2} alt="steam" />
              <h3>La creación de Alan Wake 2</h3>
            </div>
            <div className=" bg-slate-800 w-[475px] h-24 flex flex-wrap backdrop-opacity-10 backdrop-invert bg-white/30 rounded-md max-sm:w-full p-4">
              <img className=" h-full mr-7 " src={Imagen} alt="epic" />
              <h3>Descubre las recompensas y los desafíos del pase</h3>
            </div>
        </div>
      <div className="md:ml-auto w-3/12 text-slate-200 p-2 max-sm:w-auto border-2 border-recomendacion rounded-b-lg  h-60 max-sm:h-auto max-sm:mb-10 max-sm:mt-10">
        <h1 className=" text-center  text-3xl font-semibold mb-5">Comentarios</h1>

        <p>
          WEBSOCKET
        </p>
      </div>
      </section>
    </>
  );
}

export default HomeAdmin;
