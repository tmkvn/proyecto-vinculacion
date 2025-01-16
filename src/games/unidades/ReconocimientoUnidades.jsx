import React, { useState, useEffect } from "react";

import parrotImage from "./images/parrot.png";
import "./ReconocimientoUnidades.css";

function Unidades() {
    const [mostrarSegundoFormulario, setMostrarSegundoFormulario] =
      useState(false);

    const [numeroActual, setNumeroActual]= useState(0);
    const [respuestas, setRespuestas] = useState([]);
    const [rondaActual, setRondaActual] = useState(1);
    const [puntuacion, setPuntuacion] = useState(0);
    const [mensajeFinalVisible, setMensajeFinalVisible] = useState(false);
    const contenedorRef = React.useRef(null);
  
    const manejarClickInicio = () => {
      setMostrarSegundoFormulario(true);
    };
  
    const generarNumeroYRespuestas = () => {
      const numero = Math.floor(Math.random() * 50) + 1;
      setNumeroActual(numero);
  
      const opciones = [numero, numero + 1, Math.max(1, numero - 1)].sort(
        () => Math.random() - 0.5
      );
      setRespuestas(opciones);
    };
  
    useEffect(() => {
      if (rondaActual <= 5) {
        generarNumeroYRespuestas();
      }
    }, [rondaActual]);
  
    const manejarRespuesta = (respuesta) => {
      if (respuesta === numeroActual) {
        setPuntuacion(puntuacion + 1);
      }
      if (rondaActual < 5) {
        setRondaActual(rondaActual + 1);
      } else {
        setMensajeFinalVisible(true);
      }
    };
  
    const renderizarBloques = () => {
      const totalBloques = numeroActual;
      const filas = Math.ceil(totalBloques / 10);
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
  
    const cerrarMensaje = () => {
      setMensajeFinalVisible(false);
      setRondaActual(1);
      setPuntuacion(0);
      setMostrarSegundoFormulario(false);
    };
  
    const activarPantallaCompleta = () => {
      if (contenedorRef.current) {
        if (!document.fullscreenElement) {
          contenedorRef.current.requestFullscreen().catch((err) => {
            console.error("Error al activar pantalla completa:", err);
          });
        } else {
          document.exitFullscreen().catch((err) => {
            console.error("Error al salir de pantalla completa:", err);
          });
        }
      }
    };
  
    const reiniciarDesdeSegundoFormulario = () => {
      setMensajeFinalVisible(false);
      setRondaActual(1);
      setPuntuacion(0);
    };
  
    return (
      <div className="contenedor" ref={contenedorRef}>
        {!mostrarSegundoFormulario ? (
          <div className="panel-izquierdo">
          <div className="botones-contenedor"> {/* Nuevo contenedor */}
            <h1>EN ESTE JUEGO IDENTIFICARÁS UNIDADES, DECENAS Y CENTENAS</h1>
            <img src={parrotImage} alt="Loro" className="loro" />
            <button className="boton-iniciar" onClick={manejarClickInicio}>
              Empezar
            </button>
            <button
              className="boton-pantalla-completa"
              onClick={activarPantallaCompleta}
            >
              Pantalla Completa
            </button>
          </div>
        </div>
        ) : (
          <div className="contenedor-segundo-formulario">
            <div className="panel-izquierdo-segundo">
              <h2>Ronda {rondaActual} de 5</h2>
              {renderizarBloques()}
              <button
                className="boton-pantalla-completa"
                onClick={activarPantallaCompleta}
              >
                Pantalla Completa
              </button>
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
  
        {mensajeFinalVisible && (
          <div className="mensaje-final">
            <p>
              ¡Felicidades! Juego terminado. Tu puntuación final es: {puntuacion}
            </p>
            <button className="boton-aceptar" onClick={cerrarMensaje}>
              Volver al inicio del juego
            </button>
            <button
              className="boton-reiniciar"
              onClick={reiniciarDesdeSegundoFormulario}
            >
              Reiniciar desde aquí
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default Unidades;