import React, { useState, useEffect } from "react";

import parrotImage from "./images/parrot.png";
import "./ReconocimientoUnidades.css";

function Unidades() {
  // Estados principales
  const [mostrarSegundoFormulario, setMostrarSegundoFormulario] =
    useState(false);
  const [numeroActual, setNumeroActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [rondaActual, setRondaActual] = useState(1);
  const [puntuacion, setPuntuacion] = useState(0);
  const [mensajeFinalVisible, setMensajeFinalVisible] = useState(false);

  // Función para iniciar el segundo formulario
  const manejarClickInicio = () => {
    setMostrarSegundoFormulario(true); // Cambia al segundo formulario
  };

  // Generar el número y las opciones de respuesta
  const generarNumeroYRespuestas = () => {
    const numero = Math.floor(Math.random() * 50) + 1; // Número entre 1 y 50
    setNumeroActual(numero);

    // Generar opciones de respuesta válidas
    const opciones = [numero, numero + 1, Math.max(1, numero - 1)].sort(
      () => Math.random() - 0.5
    ); // Mezcla las opciones aleatoriamente

    setRespuestas(opciones);
  };

  // Efecto para iniciar una nueva ronda
  useEffect(() => {
    if (rondaActual <= 5) {
      generarNumeroYRespuestas();
    }
  }, [rondaActual]);

  // Manejar la respuesta seleccionada por el usuario
  const manejarRespuesta = (respuesta) => {
    if (respuesta === numeroActual) {
      setPuntuacion(puntuacion + 1);
    }
    if (rondaActual < 5) {
      setRondaActual(rondaActual + 1);
    } else {
      // Mostrar mensaje final
      setMensajeFinalVisible(true);
    }
  };

  // Renderizar bloques visuales que representan el número actual
  const renderizarBloques = () => {
    const totalBloques = numeroActual;
    const filas = Math.ceil(totalBloques / 10); // Determina cuántas filas habrá
    const bloquesPorFila = Array.from({ length: filas }, (_, i) => {
      const inicio = i * 10;
      const fin = Math.min(inicio + 10, totalBloques);
      return Array.from({ length: fin - inicio });
    });

    return (
      <div className="bloques">
        {bloquesPorFila.map((fila, filaIndex) => (
          <div key={filaIndex} className="fila-bloques">
            {fila.map((_, bloqueIndex) => (
              <div
                key={`b-${filaIndex}-${bloqueIndex}`}
                className="bloque"
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Función para cerrar el mensaje final y reiniciar el juego
  const cerrarMensaje = () => {
    setMensajeFinalVisible(false);
    setRondaActual(1);
    setPuntuacion(0);
    setMostrarSegundoFormulario(false); // Regresa al primer formulario
  };

  return (
    <div className="contenedor">
      {/* Renderizar el formulario según el estado */}
      {!mostrarSegundoFormulario ? (
        <div className="panel-izquierdo">
          <div>
            <h1>EN ESTE JUEGO IDENTIFICARÁS UNIDADES, DECENAS Y CENTENAS</h1>
            <img src={parrotImage} alt="Loro" className="loro" />
            <button className="boton-iniciar" onClick={manejarClickInicio}>
              Empezar
            </button>
          </div>
        </div>
      ) : (
        <div className="contenedor-segundo-formulario">
          <div className="panel-izquierdo-segundo">
            <h2>Ronda {rondaActual} de 5</h2>
            {renderizarBloques()}
          </div>
          <div className="panel-derecho-segundo">
            <img src={parrotImage} alt="Loro" className="loro" />
            <h2>Selecciona el número</h2>
            <div className="opciones">
              {respuestas.map((respuesta, index) => (
                <button
                  key={index}
                  className="boton-respuesta"
                  onClick={() => manejarRespuesta(respuesta)}
                >
                  {respuesta}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mostrar mensaje final en el centro */}
      {mensajeFinalVisible && (
        <div className="mensaje-final">
          <p>
            ¡Felicidades juego terminado! Tu puntuación final es: {puntuacion}
          </p>
          <button className="boton-aceptar" onClick={cerrarMensaje}>
            Aceptar
          </button>
        </div>
      )}

      {/* Panel derecho con los números, visible solo en el primer formulario */}
      {!mostrarSegundoFormulario && (
        <div className="panel-derecho">
          <div className="columna">
            <h2>Unidades</h2>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </ul>
          </div>
          <div className="columna">
            <h2>Decenas</h2>
            <ul>
              <li>10</li>
              <li>20</li>
              <li>30</li>
              <li>40</li>
              <li>50</li>
              <li>60</li>
              <li>70</li>
              <li>80</li>
              <li>90</li>
            </ul>
          </div>
          <div className="columna">
            <h2>Centenas</h2>
            <ul>
              <li>100</li>
              <li>200</li>
              <li>300</li>
              <li>400</li>
              <li>500</li>
              <li>600</li>
              <li>700</li>
              <li>800</li>
              <li>900</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Unidades;