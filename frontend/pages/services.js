import React from "react";
import MenuBar from "../components/bars/MenuBar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    margin: 10,
    padding: 15,
    fontFamily: "Roboto",
    textAlign: "justify",
  },
});

function services() {
  const classes = useStyles();
  return (
    <div>
      <MenuBar />
      <Paper className={classes.root}>
        <h1>Servicios</h1>
        <p>
          {" "}
          En LCA Bienes Raíces ofrecemos la promoción de venta de bienes como lo
          son casas, departamentos, terrenos, entre otros; esto lo logramos
          mediante el siguiente proceso:
        </p>
      </Paper>
      <Paper className={classes.root}>
        <img
          src="/LCA_Bienes_Raices_Proceso_de_venta-promocion.jpg"
          style={{ width: "100%" }}
        />
      </Paper>
      <Paper className={classes.root}>
        <p>
          Así mismo ofrecemos Consultoria en Materia Inmobiliaria ya sea que
          quiera vender, comprar, traspasar, rentar una propiedad o un bien
          inmueble, tambien si su proyecto es desarrollar un conjunto
          habitacional, comercial o industrial podemos ayudarle a realizarlo con
          éxito.
        </p>
      </Paper>
      <Paper className={classes.root}>
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
      </Paper>
    </div>
  );
}

export default services;
