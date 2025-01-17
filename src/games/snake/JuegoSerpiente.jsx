import React, { useEffect, useState } from 'react';
import './JuegoSerpiente.css';

const JuegoSerpienteMatematica = () => {
  const TAMANO_CELDA = 40;
  const TAMANO_GRID = 10;

  const [serpiente, setSerpiente] = useState([{ x: 5, y: 5 }]);
  const [direccion, setDireccion] = useState('DERECHA');
  const [comida, setComida] = useState({ x: 2, y: 3 });
  const [comidaIncorrecta, setComidaIncorrecta] = useState({ x: 7, y: 6 });
  const [numeroCorrecto, setNumeroCorrecto] = useState(42);
  const [numeroIncorrecto, setNumeroIncorrecto] = useState(99);
  const [puntaje, setPuntaje] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const generarPosicionAleatoria = () => ({
    x: Math.floor(Math.random() * TAMANO_GRID),
    y: Math.floor(Math.random() * TAMANO_GRID),
  });

  const generarNumeros = () => {
    const correcto = Math.floor(Math.random() * 999) + 1;
    let incorrecto;
    do {
      incorrecto = Math.floor(Math.random() * 999) + 1;
    } while (incorrecto === correcto);
    return { correcto, incorrecto };
  };

  const moverSerpiente = () => {
    const nuevaCabeza = { ...serpiente[0] };

    switch (direccion) {
      case 'DERECHA': nuevaCabeza.x = (nuevaCabeza.x + 1) % TAMANO_GRID; break;
      case 'IZQUIERDA': nuevaCabeza.x = (nuevaCabeza.x - 1 + TAMANO_GRID) % TAMANO_GRID; break;
      case 'ARRIBA': nuevaCabeza.y = (nuevaCabeza.y - 1 + TAMANO_GRID) % TAMANO_GRID; break;
      case 'ABAJO': nuevaCabeza.y = (nuevaCabeza.y + 1) % TAMANO_GRID; break;
      default: break;
    }

    if (nuevaCabeza.x === comida.x && nuevaCabeza.y === comida.y) {
      setPuntaje(puntaje + 1);
      const { correcto, incorrecto } = generarNumeros();
      setNumeroCorrecto(correcto);
      setNumeroIncorrecto(incorrecto);
      setComida(generarPosicionAleatoria());
      setComidaIncorrecta(generarPosicionAleatoria());
    } else if (nuevaCabeza.x === comidaIncorrecta.x && nuevaCabeza.y === comidaIncorrecta.y) {
      setJuegoTerminado(true);
      return;
    } else {
      serpiente.pop();
    }

    setSerpiente([nuevaCabeza, ...serpiente]);
  };

  useEffect(() => {
    if (juegoTerminado) return;

    const intervalo = setInterval(moverSerpiente, 500);
    const manejarTeclaPresionada = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (direccion !== 'ABAJO') setDireccion('ARRIBA'); break;
        case 'ArrowDown': if (direccion !== 'ARRIBA') setDireccion('ABAJO'); break;
        case 'ArrowLeft': if (direccion !== 'DERECHA') setDireccion('IZQUIERDA'); break;
        case 'ArrowRight': if (direccion !== 'IZQUIERDA') setDireccion('DERECHA'); break;
        default: break;
      }
    };

    window.addEventListener('keydown', manejarTeclaPresionada);
    return () => {
      clearInterval(intervalo);
      window.removeEventListener('keydown', manejarTeclaPresionada);
    };
  }, [direccion, juegoTerminado, serpiente]);

  const reiniciarJuego = () => {
    setSerpiente([{ x: 5, y: 5 }]);
    setDireccion('DERECHA');
    setComida(generarPosicionAleatoria());
    setComidaIncorrecta(generarPosicionAleatoria());
    const { correcto, incorrecto } = generarNumeros();
    setNumeroCorrecto(correcto);
    setNumeroIncorrecto(incorrecto);
    setPuntaje(0);
    setJuegoTerminado(false);
  };

  const activarPantallaCompleta = () => {
    const elemento = document.documentElement;
    if (elemento.requestFullscreen) {
      elemento.requestFullscreen();
    }
  };

  return (
    <div className='sn-body'>
      <div className="contenedor-juego">
        <button className="boton-pantalla-completa" onClick={activarPantallaCompleta}>
          Pantalla Completa
        </button>
        {juegoTerminado ? (
          <div className="juego-terminado">
            <h1>Juego Terminado</h1>
            <p className="mostrar-puntaje">Puntaje: {puntaje}</p>
            <button className="boton-reiniciar" onClick={reiniciarJuego}>
              Reiniciar
            </button>
          </div>
        ) : (
          <>
            <div className="encabezado">
              <h1>Juego de la Serpiente Matemática</h1>
              <p className="mostrar-puntaje">
                Puntaje: {puntaje} | Número a comer: <strong>{numeroCorrecto}</strong>
              </p>
            </div>
            <div className="cuadricula">
              {Array.from({ length: TAMANO_GRID * TAMANO_GRID }).map((_, index) => {
                const x = index % TAMANO_GRID;
                const y = Math.floor(index / TAMANO_GRID);

                const esSerpiente = serpiente.some(segmento => segmento.x === x && segmento.y === y);
                const esCabeza = serpiente[0].x === x && serpiente[0].y === y;
                const esComida = comida.x === x && comida.y === y;
                const esComidaIncorrecta = comidaIncorrecta.x === x && comidaIncorrecta.y === y;

                return (
                  <div
                    key={index}
                    className={`celda 
                      ${esSerpiente ? (esCabeza ? 'cabeza-serpiente' : 'cuerpo-serpiente') : ''} 
                      ${esComida ? 'comida-correcta' : ''} 
                      ${esComidaIncorrecta ? 'comida-incorrecta' : ''}`}
                  >
                    {esComida && <span className="numero-correcto">{numeroCorrecto}</span>}
                    {esComidaIncorrecta && numeroIncorrecto}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default JuegoSerpienteMatematica;
