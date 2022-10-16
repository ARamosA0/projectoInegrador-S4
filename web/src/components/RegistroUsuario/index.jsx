import React , {useState} from "react";
import styled from "styled-components";
import Modal from "../Modal";


const Modales=({estadoModal1, estadoModal2, handleClickOpen})=>{
   
    return (
        <>
    <Modal
               estado = {estadoModal1}
               cambiarEstado = {handleClickOpen }
            >
                <Contenido>
                <h1 >Login</h1>
                <Input type="email" placeholder="✉ Correo"></Input>
                <Input type="password" placeholder="✉ Contraseña " ></Input>
                <Botonn onClick={handleClickOpen}>Aceptar</Botonn>
                <center><p>Al registrarte, aceptas nuestras Condiciones de uso y Politica de privacidad.</p></center>
                <p>¿No tienes una cuenta? Registrate</p>
                </Contenido>
                
               
            </Modal>     

            <Modal
            estado = {estadoModal2}
            cambiarEstado = {handleClickOpen}
         >
             <Contenido>
             <h1 >Registro</h1>
             <Input type="text" placeholder="✉ Nombre Completo"></Input>
             <Input type="email" placeholder="✉ Correo Electronico"></Input>
             <Input type="password" placeholder="✉ Contraseña"></Input>
             <Input type="text" placeholder="✉ TELEFONO " ></Input>
             <Botonn onClick={handleClickOpen}>Aceptar</Botonn>
             <center><p>Al registrarte, aceptas nuestras Condiciones de uso y Politica de privacidad.</p></center>
             <p>¿Ya tienes una cuenta? Iniciar Sesion</p>
             </Contenido>
             
            
         </Modal></>
            );      
};
export default Modales;

const Botonn = styled.button`
	display: block;
	padding: 10px;
	color: #fff;
	border: none;
	background: #EB3B3B ;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	
	transition: .3s ease all;
    
    width: 90px;

	&:hover {
		background: #EB1A1A   ;
	}
`;

const ContenedorBotones = styled.div`
	padding: 30px;
	display: flex;
	flex-wrap: wrap;
	justify-content: right;
	gap: 5px;
`;

const Boton = styled.button`
	display: block;
	padding: 17px;
	
	color: #fff;
	border: none;
	background: #EB3B3B ;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	transition: .3s ease all;
    margin-top: 5px;
    width: 425px;

	&:hover {
		background: #EB1A1A   ;
	}
`;

const Contenido = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 20px;
        margin-top: 10px;

        color: #FFA34F
	}

	p {
		font-size: 14px;
		margin: 15px;
        
	}

	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;

const Input = styled.input`
	padding: 5px;
	display: flex;
    color: #959595 ;
    width: 400px;
	flex-wrap: wrap;
	justify-content: center;
    margin: 2%;
	gap: 20px;
    padding: 10px;
`;
