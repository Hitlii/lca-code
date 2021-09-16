import React from "react";
import Navbar from '../components/Navbar'
import { makeStyles } from "@material-ui/core/styles"
import Head from 'next/head'
import Pixel from '../components/Pixel'

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    minWidth: 320,
    margin:'auto',
    textAlign:'justify'
  },
  text:{

    margin: 20
  },
  image:{
    borderRadius:20
  },

});

function Servicios() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <Head>
            <title>LCA Bienes Raices - Servicios</title>
            <meta name="description" content="Quieres vender tu propiedad, pero no sabes por dónde empezar? Vender una propiedad por cuenta propia es posible, pero requiere de mucho tiempo extra y de varias herramientas para que tu propiedad destaque sobre las otras, es por esto que nuestro equipo en LCA Bienes Raíces te ayuda a vender tu propiedad sin problemas."/>
            <meta name="robots"  content="index,follow"/>

            {/* Twitter */}
            <meta name="twitter:card" content="producto"/>
            <meta name="twitter:site" content="www.lcabienesraices.com"/>
            <meta name="twitter:title" content="LCA Bienes Raices - Servicios"/>
            <meta name="twitter:description" content="Quieres vender tu propiedad, pero no sabes por dónde empezar? Vender una propiedad por cuenta propia es posible, pero requiere de mucho tiempo extra y de varias herramientas para que tu propiedad destaque sobre las otras, es por esto que nuestro equipo en LCA Bienes Raíces te ayuda a vender tu propiedad sin problemas."/> 
            <meta name="twitter:creator" content="@lcabienesraices"/>
            <meta name="twitter:image" content="./servicios_proceso-de-venta_9-16.png"/>

            {/* <!-- Open Graph data --> */}
            <meta property="og:title" content="LCA Bienes Raices - Servicios"/> 
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://lcabienesraices.com`} />
            <meta property="og:image" content="./servicios_proceso-de-venta_9-16.png"/>
            <meta property="og:description" content="Quieres vender tu propiedad, pero no sabes por dónde empezar? Vender una propiedad por cuenta propia es posible, pero requiere de mucho tiempo extra y de varias herramientas para que tu propiedad destaque sobre las otras, es por esto que nuestro equipo en LCA Bienes Raíces te ayuda a vender tu propiedad sin problemas." />
            <meta property="og:site_name" content="www.lcabienesraices.com"/>
            <link rel="canonical" href="https://lcabienesraices"/>
      </Head>
      <Pixel name='FACEBOOK_PIXEL_1'/>
      <Navbar />

      <main className={classes.root} role="main">
          <div className={classes.text}>

            <h1 id="servicios">Servicios</h1>
            <h2 id="venta-de-propiedades">Venta de propiedades</h2>
           
            <h3>¿Quieres vender tu propiedad, pero no sabes por dónde empezar?</h3>
            <p>Vender una propiedad por cuenta propia es posible, pero requiere de mucho tiempo extra y de varias herramientas para que tu propiedad destaque sobre las otras, es por esto que nuestro equipo en LCA Bienes Raíces te ayuda a vender tu propiedad sin problemas. </p>
            <p>Te mostramos los pasos resumidos que seguimos para lograrlo </p>
            <ol>
              <li><p><strong>Revisión de documentos.</strong>  Primero, revisamos tus documentos, tanto los tuyos como los de la propiedad para verificar que todo esté en orden. </p>
              </li>
              <li><p><strong>Estudio de mercado.</strong> Te ayudamos a ponerle un precio justo y atractivo a tu propiedad para que resalte sobre las demás </p>
              </li>
              <li><p><strong>Promoción de la propiedad.</strong> Realizaremos tomas aéreas, tanto fotos como video y serán puestos en todas las redes sociales, además de colocar una lona en tu propiedad.  </p>
              </li>
              <li><p><strong>Asesoría en la escrituración.</strong> Ya vendida la propiedad te asesoramos en la escrituración del inmueble vendido</p>
              </li>
            </ol>
            <p>
              Mejoramos nuestros procesos dia con dia, creemos en la importancia de la información, pues con ella clientes y compradores se sentirán satisfechos con el proceso.
            </p>
            <img
              alt="proceso de venta de lca bienes raices"
              title="proceso de venta de lca bienes raices"
              src="/servicios_proceso-de-venta_9-16.png"
              style={{ width: "100%", borderRadius:20 }}
            />
            <h4>¡Envíanos tu propiedad para revisarla y ponernos en contacto contigo!</h4>
       </div>
      </main>
      
    </div>
  );
}

export default Servicios;
