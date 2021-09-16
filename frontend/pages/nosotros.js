import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../components/Navbar'
import Grid from "@material-ui/core/Grid"
import Pixel from '../components/Pixel'
import Typography from "@material-ui/core/Typography"
import Head from 'next/head'
const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    minWidth: 320,
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign:'justify',
    
  }, 
  text:{margin:20}
});

function Nosotros() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
            <title>LCA Bienes Raices - Nosotros</title>
            <meta name="description" content="Somos una agencia inmobiliaria y de asistencia profesional con amplio sentido de servicio, profesionalismo y atención personalizada en la búsqueda y obtención de tu patrimonio, así como en la promoción de tus bienes y asitencia en áreas de ingeniería civil, industrial y de sistemas"/>
            <meta name="robots"  content="index,follow"/>
            {/* Twitter */}
            <meta name="twitter:card" content="producto"/>
            <meta name="twitter:site" content="www.lcabienesraices.com"/>
            <meta name="twitter:title" content="LCA Bienes Raices | Nosotros"/>
            <meta name="twitter:description" content="Somos una agencia inmobiliaria y de asistencia profesional con amplio sentido de servicio, profesionalismo y atención personalizada en la búsqueda y obtención de tu patrimonio, así como en la promoción de tus bienes y asitencia en áreas de ingeniería civil, industrial y de sistemas"/> 
            <meta name="twitter:creator" content="@lcabienesraices"/>

            {/* <!-- Open Graph data --> */}
            <meta property="og:title" content="LCA Bienes Raices | Nostros" /> 
            <meta property="og:type" content="article" />
            <meta property="og:url" content="https://lcabienesraices.com/nosotros" />
            <meta property="og:description" content="Somos una agencia inmobiliaria y de asistencia profesional con amplio sentido de servicio, profesionalismo y atención personalizada en la búsqueda y obtención de tu patrimonio, así como en la promoción de tus bienes y asitencia en áreas de ingeniería civil, industrial y de sistemas" />
            <meta property="og:site_name" content="www.lcabienesraices.com" />
            <link rel="canonical" href="https://lcabienesraices/propiedad/nosotrosl" />
            
      </Head>
      <Pixel name='FACEBOOK_PIXEL_1'/>
      <Navbar />
        <main className={classes.root} role="main">
        <div className={classes.text}>
        <h1 id="nosotros">Nosotros</h1>
        <Typography variant="subtitle1" gutterBottom> 
          LCA Bienes Raices y Asistencia Profesional, SAS de C.V. , “Juntos por
          tu patrimonio”. Somos una agencia inmobiliaria y de asistencia
          profesional con amplio sentido de servicio, profesionalismo y atención
          personalizada en la búsqueda y obtención de tu patrimonio, así como en
          la promoción de tus bienes y asitencia en áreas de ingeniería civil e
          industrial. 
        </Typography>
        <p>
          En LCA Bienes Raíces te asesoramos de manera personalizada y te
          aclaramos tus dudas antes de iniciar con los trámites de compra o
          venta de tus bienes. También te acompañamos de inicio a fin en las
          instituciones correspondientes.
        </p>

        <Typography variant="h4" gutterBottom id="mision">Misión</Typography>
        <p>
          Ofrecer servicios inmobiliarios y de asistencia profesional de
          vanguardia que cumplan con las expectativas de nuestros clientes,
          estableciendo así bases sólidas y estables de servicio.
        </p>
        <Typography variant="h4" gutterBottom id="vision">Visión</Typography>
        <p>
          Queremos ser reconocidos como la principal y mejor agencia
          inmobiliaria del estado de Baja California, iniciando en la Ciudad de
          Tecate, B.C. mediante la mejora continúa en nuestros servicios
          inmobiliarios y el uso de nuevas estrategias que ofrezcan mayor
          satisfacción en las actuales y futuras condiciones de mercado,
          logrando así un posicionamiento confiable en los potenciales
          compradores o vendedores de bienes inmuebles de la zona.
        </p>
        <Typography variant="h4" gutterBottom id="valores">Valores</Typography>
        <p>
          Nuestros principios son la Honestidad, Compromiso, Transparencia y
          Flexibilidad en Nuestros Servicios.
        </p>
        <p>
          En memoria de Cesar Ayala Bombela, no te tocó ver esta página terminada antes de tú partida pero estoy seguro que estarias orgulloso, buen viaje papá.
        </p>
        <Typography variant="h4" gutterBottom id="politica-de-privacidad">Politica de privacidad</Typography>
        <p>
          El presente Política de Privacidad establece los términos en que LCA
          Bienes Raices usa y protege la información que es proporcionada por
          sus usuarios al momento de utilizar su sitio web. Esta compañía está
          comprometida con la seguridad de los datos de sus usuarios. Cuando le
          pedimos llenar los campos de información personal con la cual usted
          pueda ser identificado, lo hacemos asegurando que sólo se empleará de
          acuerdo con los términos de este documento. Sin embargo esta Política
          de Privacidad puede cambiar con el tiempo o ser actualizada por lo que
          le recomendamos y enfatizamos revisar continuamente esta página para
          asegurarse que está de acuerdo con dichos cambios.
        </p>
        <p>
          <strong>Información que es recogida</strong>
        </p>
        <p>
          Nuestro sitio web podrá recoger información personal por ejemplo:
          Nombre, información de contacto como su dirección de correo
          electrónica e información demográfica. Así mismo cuando sea necesario
          podrá ser requerida información específica para procesar algún pedido
          o realizar una entrega o facturación.
        </p>
        <p>
          <strong>Uso de la información recogida</strong>
        </p>
        <p>
          Nuestro sitio web emplea la información con el fin de proporcionar el
          mejor servicio posible, particularmente para mantener un registro de
          usuarios, de pedidos en caso que aplique, y mejorar nuestros productos
          y servicios. Es posible que sean enviados correos electrónicos
          periódicamente a través de nuestro sitio con ofertas especiales,
          nuevos productos y otra información publicitaria que consideremos
          relevante para usted o que pueda brindarle algún beneficio, estos
          correos electrónicos serán enviados a la dirección que usted
          proporcione y podrán ser cancelados en cualquier momento.
        </p>
        <p>
          LCA Bienes Raices está altamente comprometido para cumplir con el
          compromiso de mantener su información segura. Usamos los sistemas más
          avanzados y los actualizamos constantemente para asegurarnos que no
          exista ningún acceso no autorizado.
        </p>
        <p>
          <strong>Cookies</strong>
        </p>
        <p>
          Una cookie se refiere a un fichero que es enviado con la finalidad de
          solicitar permiso para almacenarse en su ordenador, al aceptar dicho
          fichero se crea y la cookie sirve entonces para tener información
          respecto al tráfico web, y también facilita las futuras visitas a una
          web recurrente. Otra función que tienen las cookies es que con ellas
          las web pueden reconocerte individualmente y por tanto brindarte el
          mejor servicio personalizado de su web.
        </p>
        <p>
          Nuestro sitio web emplea las cookies para poder identificar las
          páginas que son visitadas y su frecuencia. Esta información es
          empleada únicamente para análisis estadístico y después la información
          se elimina de forma permanente. Usted puede eliminar las cookies en
          cualquier momento desde su ordenador. Sin embargo las cookies ayudan a
          proporcionar un mejor servicio de los sitios web, estás no dan acceso
          a información de su ordenador ni de usted, a menos de que usted así lo
          quiera y la proporcione directamente, . Usted puede aceptar o negar el
          uso de cookies, sin embargo la mayoría de navegadores aceptan cookies
          automáticamente pues sirve para tener un mejor servicio web. También
          usted puede cambiar la configuración de su ordenador para declinar las
          cookies. Si se declinan es posible que no pueda utilizar algunos de
          nuestros servicios.
        </p>
        <p>
          <strong>Enlace a terceros</strong>
        </p>
        <p>
          Este sitio web pudiera contener en laces a otros sitios que pudieran
          ser de su interés. Una vez que usted de clic en estos enlaces y
          abandone nuestra página, ya no tenemos control sobre al sitio al que
          es redirigido y por lo tanto no somos responsables de los términos o
          privacidad ni de la protección de sus datos en esos otros sitios
          terceros. Dichos sitios están sujetos a sus propias políticas de
          privacidad por lo cual es recomendable que los consulte para confirmar
          que usted está de acuerdo con estas.
        </p>
        <p>
          <strong>Control de su información personal</strong>
        </p>
        <p>
          En cualquier momento usted puede restringir la recopilación o el uso
          de la información personal que es proporcionada a nuestro sitio web.
          Cada vez que se le solicite rellenar un formulario, como el de alta de
          usuario, puede marcar o desmarcar la opción de recibir información por
          correo electrónico. En caso de que haya marcado la opción de recibir
          nuestro boletín o publicidad usted puede cancelarla en cualquier
          momento.
        </p>
        <p>
          Esta compañía no venderá, cederá ni distribuirá la información
          personal que es recopilada sin su consentimiento, salvo que sea
          requerido por un juez con un orden judicial.
        </p>
        <p>
          LCA Bienes Raices Se reserva el derecho de cambiar los términos de la
          presente Política de Privacidad en cualquier momento.
        </p>
        <p>
          Esta politica de privacidad se han generado en
          politicadeprivacidadplantilla.com.
        </p>
        </div>
      </main>
    </div>
  );
}

export default Nosotros;
