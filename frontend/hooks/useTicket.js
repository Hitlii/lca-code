import { useFormik } from "formik";
import * as yup from "yup";

const UseTicket = () => {
  const validationSchema = yup.object({
    name: yup
      .string("Ingresa tu nombre")
      .max(35, "Introduce un nombre valido")
      .required("Nombre del cliente es requerido"),
    idProperty: yup
      .string("Enter your password")
      .required("Id de propiedad es requerido"),
    area: yup
      .number("Introduce la area")
      .required("Area de la propiedad es requerida"),
    price: yup.number("Introduce el precio").required("El precio es requerido"),
    currency: yup
      .string("Seleciona una moneda")
      .required("Tipo de moneda es requerida"),
    emissionDate: yup
      .date("Ingresa una fecha valida!")
      .required("La fehca es requerida"),
    paymentLocation: yup.string("Introduce una localidad"),
    paymentAddress: yup
      .string("Introduce la direccion de la localidad")
      .max(50,"Introduce una direccion valida")
      .required("Introduce la direccion"),
  });

  const ticket = useFormik({
    initialValues: {
      name: "",
      idProperty: "",
      statu: "No pagado",
      area: "",
      price: "",
      currency: "USD",
      emissionDate: "",
      promissory: [],
      paymentLocation: "",
      paymentAddress: "",
    },
   validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const currency = ['USD','MXN']
  const location = ["Tijuna B.C", "Ensenada B.C", "Rosarito B.C", "Tecate B.C"];
  const status = ["No pagado", "Pagado"];
  return { ticket, currency, location, status };
};

export default UseTicket;
