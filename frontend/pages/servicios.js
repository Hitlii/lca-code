import React from "react";
import Navbar from '../components/Navbar'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    minWidth: 320,
    margin:'auto',
    textAlign:'justify'
  },
  text:{

    margin: 20
  }

});

function Servicios() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />

      <main className={classes.root} role="main">
        <div className={classes.text}>


        <Typography variant="h2" gutterBottom>Servicios</Typography>
        <Typography variant="subtitle1" gutterBottom> 
          En LCA Bienes Raíces ofrecemos la promoción de venta de bienes como lo
          son casas, departamentos, terrenos, entre otros; esto lo logramos
          mediante el siguiente proceso: 
        </Typography>
          
        <img
          src="/LCA_Bienes_Raices_Proceso_de_venta-promocion.jpg"
          style={{ width: "100%" }}
        />
        <p>
          Así mismo ofrecemos Consultoria en Materia Inmobiliaria ya sea que
          quiera vender, comprar, traspasar, rentar una propiedad o un bien
          inmueble, tambien si su proyecto es desarrollar un conjunto
          habitacional, comercial o industrial podemos ayudarle a realizarlo con
          éxito.
        </p>
        <ul>
          <li>Compra-venta de propiedades (promoción).</li>
          <li>Asesoría inmobiliaria.</li>
          <li>Asesoria en bienes raices, compra y venta de casas</li>
          <li>Deslindes.</li>
          <li>Levantamientos topográficos.</li>
          <li>Proyectos de construcción.</li>
          <li>Tramites de crédito hipotecario.</li>
          <li>Trámites ante autoridades gubernamentales.</li>
          <li>Regularización de propiedades.</li>
          <li>Administración de propiedades.</li>
          <li>Apoyo en proyectos inmobiliarios independientes.</li>
        </ul>
        </div>
      </main>
      
    </div>
  );
}

export default Servicios;
