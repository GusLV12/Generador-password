import React, {useState, useEffect} from 'react';
import './App.css';
import Password from './img/password.png';
import Styled from 'styled-components';
import { BotonIncrementar, BotonCheck } from './Compnentes/botones';
import { BotonDisminuir, BotonGenerar } from './Compnentes/botones';
import generarPassword from './Funciones/generarPassword'


const App = () => {
  const [configuracion, cambiarConfiguracion] = useState({
    numeroDeCaracteres: 7,
    simbolos: true,
    numeros: true,
    mayusculas: true
  });

  const [passwordGenerada, cambiarPasswordGenerada] = useState();

  useEffect(() => {
    cambiarPasswordGenerada(generarPassword(configuracion));
  }, [configuracion]);

  const incrementarNumeroDeCaracteres = () =>{
    cambiarConfiguracion((configuracionAnterior) => {
      const nuevaConfiguracion = {...configuracionAnterior};
      nuevaConfiguracion.numeroDeCaracteres += 1;
      return nuevaConfiguracion;
    });
  }

  const disminuirNumeroDeCaracteres = () =>{

    if(configuracion.numeroDeCaracteres > 5){
      cambiarConfiguracion((configuracionAnterior) => {
        const nuevaConfiguracion = {...configuracionAnterior};
        nuevaConfiguracion.numeroDeCaracteres -= 1;
        return nuevaConfiguracion;
      });
    }
  }

  const toggleSimbolos = () => {
    cambiarConfiguracion((configuracionAnterior) => {
      const nuevaConfiguracion = {...configuracionAnterior};
      nuevaConfiguracion.simbolos = !nuevaConfiguracion.simbolos;
      return nuevaConfiguracion;
    });
  }

  const toggleNumeros = () => {
    cambiarConfiguracion((configuracionAnterior) => {
      const nuevaConfiguracion = {...configuracionAnterior};
      nuevaConfiguracion.numeros = !nuevaConfiguracion.numeros;
      return nuevaConfiguracion;
    });
  }

  const toggleMayusculas = () => {
    cambiarConfiguracion((configuracionAnterior) => {
      const nuevaConfiguracion = {...configuracionAnterior};
      nuevaConfiguracion.mayusculas = !nuevaConfiguracion.mayusculas;
      return nuevaConfiguracion;
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    cambiarPasswordGenerada(generarPassword(configuracion));
  }

  return (
    <div className="contenedor">
      <Logo>
      <img src={Password} alt="Imagen de titulo"/>
      </Logo>
      <form onSubmit={onSubmit}>
        <Fila>
          <label>Numero de caracteres: </label>
          <Controles>
            <BotonDisminuir Click={disminuirNumeroDeCaracteres}/>
            <span>{configuracion.numeroDeCaracteres}</span>
            <BotonIncrementar Click={incrementarNumeroDeCaracteres}/>

          </Controles>
        </Fila>

        <Fila>
          <label>¿Incluir Simbolos?</label>
          <BotonCheck seleccionado={configuracion.simbolos} click={toggleSimbolos}/>
        </Fila>
        <Fila>
          <label>¿Incluir Números?</label>
          <BotonCheck seleccionado={configuracion.numeros} click={toggleNumeros}/>
        </Fila>
        <Fila>
          <label>¿Incluir Mayúsculas?</label>
          <BotonCheck seleccionado={configuracion.mayusculas} click={toggleMayusculas}/>
        </Fila>
        <Fila>
          <BotonGenerar/>
          <Input type="text" readOnly={true} value={passwordGenerada}/>
        </Fila>
      </form>
    </div>
  );
}

const Logo = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  
  img {
    width: auto;
    height: 100px;
    vertical-align: top;
  }
`;

const Fila = Styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;


const Controles = Styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;

  & > *{
    flex: 1;
  }

  span{
    line-height: 40px;
    background: #33257e;
  }
`;

const Input = Styled.input`
  width: 100%;
  background: none;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,.25);
  color: #fff;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  transiton: all .3s ease;

  &:hover{
    border: 1px solid rgba(255,255,255,.50);
  }

  &::selection{
    background: #212139;
  }
`;

export default App;
