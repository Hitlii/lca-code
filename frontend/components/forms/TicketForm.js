import {useState} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useFormik} from "formik";
import GreenButton from "../buttons/GreenButton";
import ShowPromissory from '../showPromissory'
import * as yup from "yup";
import {
  InputBase,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 340,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
    paddingLeft: 20,
    marginBottom: 20,
  },
  inputPriceStyle: {
    width: 180,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
    paddingLeft: 20,
    marginBottom: 20,
  },
  textMargin: {
    marginLeft: 20,
  },
  smallButton: {
    width: 200,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
    paddingLeft: 20,
    marginLeft:10,
    marginBottom: 10,
    fontSize:14,
    textAlign:"center"
  },
}));

const SelectInput = withStyles((theme) => ({
  input: {
    borderRadius: 15,
    width: 70,
    height: 20,
    position: "relative",
    backgroundColor: "#F2F2F2",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const currency = {
  usd: "USD",
  mxn: "MXN",
};
const location = ["Tijuna B.C", "Ensenada B.C", "Rosarito B.C", "Tecate B.C"];

const status = ["No pagado", "Pagado"];

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
  emissionDate: yup
    .date("Ingresa una fecha valida!")
    .required("La fehca es requerida"),
  months: yup
    .number("Ingresa los meses al pagar2")
    .required("Ingresa los meses al pagar"),
  paymentLocation:yup
    .string("Introduce una localidad")
});

const TicketForm = () => {
  const [promissory,setPromissory]=useState({months:"",payment:""})
  const [stateAddPromissory, setStateAddPromissory]=useState(false)
  const classes = useStyles();
  const formik = useFormik({
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
  //  validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleMonths = (event) => {
    setPromissory({...promissory, months: event.target.value})
    console.log(promissory);
  }
  const handlePayment = (event) => {
    setPromissory({...promissory, payment: event.target.value})
    console.log(promissory);
  }


  const handleNewPromissory = () => {
    console.log(promissory)
    if(stateAddPromissory){
      console.log(promissory)
      if(promissory.payment!=='' && promissory.months!==''){
        formik.setFieldValue("promissory",[...formik.values.promissory,promissory])
        setPromissory({months:'',payment:''})
      }
      setStateAddPromissory(false)
      
    }else{
      setStateAddPromissory(true)
    }

  };
  const deletePromissory = (index) => {
    console.log(index)
    let auxPromissory = formik.values.promissory
    auxPromissory.splice(index,1)
    formik.setFieldValue("promissory",auxPromissory)

  };

  


  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justify="center">
        {formik.touched.username && formik.errors.username ? (
          <Typography
            className={classes.typographyStyle}
            variant="body2"
            gutterBottom
          >
            {formik.errors.username}
          </Typography>
        ) : null}
        <Typography variant="subtitle1" gutterBottom>
          Informacion de cliente
        </Typography>
        <InputBase
          name="name"
          className={classes.root}
          type="text"
          placeholder="Nombre del cliente"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Typography variant="subtitle1" gutterBottom>
          Informacion de la propiedad
        </Typography>
        <InputBase
          name="idProperty"
          className={classes.root}
          type="text"
          placeholder="Clave de la propiedad"
          onChange={formik.handleChange}
          value={formik.values.idProperty}
        />

        <InputBase
          name="area"
          className={classes.root}
          type="text"
          placeholder="Area"
          onChange={formik.handleChange}
          value={formik.values.area}
        />
        <Grid container justity="flex-start">
          <Typography
            className={classes.textMargin}
            variant="body2"
            gutterBottom
          >
            Fecha de emisión
          </Typography>
        </Grid>
        <InputBase
          name="emissionDate"
          className={classes.root}
          type="date"
          placeholder="Fecha de emision"
          onChange={formik.handleChange}
          value={formik.values.emissionDate}
        />
        <FormControl>
          <Select
            defaultValue={status[0]}
            input={
              <InputBase
                name="statu"
                className={classes.root}
                onChange={formik.handleChange}
              />
            }
          >
            {status.map((element) => (
              <MenuItem key={element} value={element}>
                {element}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container justify="center">
          <InputBase
            name="price"
            className={classes.inputPriceStyle}
            type="text"
            placeholder="Precios"
            onChange={formik.handleChange}
            value={formik.values.price}
          />

          <FormControl>
            <Select
              defaultValue={currency.usd}
              input={
                <SelectInput name="currency" onChange={formik.handleChange} />
              }
            >
              <MenuItem value={currency.usd}>USD</MenuItem>
              <MenuItem value={currency.mxn}>MXN</MenuItem>
            </Select>
          </FormControl>

          <Button className={classes.smallButton}onClick={handleNewPromissory}>{stateAddPromissory?"Genera Pagare":"Agregar pagare"}</Button>
          {stateAddPromissory?<Grid container direction="row" justify="center">
            <Grid item>
              <InputBase
                name="months"
                className={classes.inputPriceStyle}
                type="number"
                placeholder="Numero de pagarés"
                onChange={handleMonths}
                value={promissory.months}
              />
            </Grid>
            <Grid item>

              <InputBase
                name="payment"
                className={classes.inputPriceStyle}
                type="number"
                placeholder="Mensualidad"
                onChange={handlePayment}
                value={promissory.payment}
              />
            </Grid>
          </Grid>:null}


          <ShowPromissory promissory={formik.values.promissory} deletePromissory={deletePromissory}/>
           {/* {formik.values.promissory.map((promissory,index)=>{
            return <Grid container key={index}>
            <InputBase className={classes.smallButton} {...formik.getFieldProps(`promissory[${index}].months`)}/>
            <InputBase name='payment'className={classes.smallButton} {...formik.getFieldProps(`promissory[${index}].payment`)}/>
            <Button onClick={()=>deletePromissory(index)}>Delete</Button>
            </Grid>
            
          })}  */}
          

          <Grid container justify="center">
          <FormControl>
          <Typography variant="body2" gutterBottom>
                Localidad
              </Typography>
            <Select
            defaultValue={location[0]}
              input={
                <InputBase
                  name="paymentLocation"
                  className={classes.root}
                  onChange={formik.handleChange}
                />
              }
            >
              {location.map((element) => (
                <MenuItem key={element} value={element}>
                  {element}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>
            
          <InputBase
                name="paymentAddress"
                className={classes.root}
                type="text"
                placeholder="Dirección de la localidad"
                onChange={formik.handleChange}
                value={formik.values.paymentAddress}
              />
        </Grid>

        <GreenButton type="submit" text="Crear"></GreenButton>
        
      </Grid>
    </form>
  );
};

export default TicketForm;
