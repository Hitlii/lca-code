import { useState } from "react";
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useFormik } from "formik";
import * as yup from "yup";

import ShowPromissory from "../ShowPromissory";

import SearchClient from '../SearchClient'
import Typography from "@material-ui/core/Typography";
import SubmitButton from "../buttons/GreenButton";
import AddPromisorryButton from "../buttons/GreenButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import SaveIcon from "@material-ui/icons/Save";
import Select from "@material-ui/core/Select"
import TextField from "../inputs/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display:'block',
    maxWidth: 600,
    minWidth: 320,
    margin: "auto",
  },
  smallInput: {
    width: 100,
  },
  gridItem: {
    textAlign: "center",
  },
  map: {
    display: "float",
  },
  headers: {
    marginLeft: "10%",
    fontSize: "18px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "30%",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "40%",
    },
  },
  center: {
    display: "flex",
    textAlign: "center",
  },
  divider: {
    width: 340,
    color: "#f2f2f2",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  multiline: {
    width: 320,
    marginBottom: 20,
  },
}));

function TicketForm({ autoCompleteClients, editTicket }) {

  const classes = useStyles();
  const router = useRouter()
  const [clients, setClients] = useState(editTicket ? editTicket.clients : [])
  const [promissory, setPromissory] = useState({ months: '', payment: ''});
  const [stateAddPromissory, setStateAddPromissory] = useState(false);
  const [errors, setErrors] = useState({})

  let initialValues 

  if(editTicket !== null) {
    initialValues = {
      status: editTicket.status,
      area: editTicket.area,
      price: editTicket.price,
      currency: editTicket.currency, 
      emissionDate: new Date(editTicket.emissionDate).toISOString().slice(0,10),
      promissory: editTicket.promissory,
      paymentLocation: editTicket.paymentLocation,
      paymentAddress: editTicket.paymentAddress,
    }
  } else {
    initialValues = {
      status: 'No pagado',
      area: '',
      price: '',
      currency: 'USD',
      emissionDate: '',
      promissory: [],
      paymentLocation: '',
      paymentAddress: '',
    }
  }

  const validationSchema = yup.object({
    area: yup
      .number("Introduce la area")
      .required("Area de la propiedad es requerida"),
    price: yup.number("Introduce el precio").required("El precio es requerido"),
    currency: yup
      .string("Seleciona una moneda")
      .required("Tipo de moneda es requerida"),
    emissionDate: yup
      .date("Ingresa una fecha valida!")
      .required("La fecha es requerida"),
    paymentLocation: yup
      .string("Introduce una localidad"),
    paymentAddress: yup
      .string("Introduce la direccion de la localidad")
      .max(50,"Introduce una direccion valida")
      .required("Introduce la direccion"),
  });

  const ticket = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      if(editTicket !== null) {
          updateTicket()
      } else { 
          createTicket()
      }
    },
  });

  const [createTicket]= useMutation(CREATE_TICKET,{
    update(
      _,
      {data}
    ){
      console.log(data)
      router.push('/admin1')
    },
    OnError(err){
      setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
      console.log(errors)
    },
    variables:{
      propertyId: router.query.ID,
      status: ticket.values.status,
      area: ticket.values.area,
      price: ticket.values.price,
      currency: ticket.values.currency,
      promissory: ticket.values.promissory,
      emissionDate: ticket.values.emissionDate,
      paymentLocation: ticket.values.paymentLocation,
      paymentAddress: ticket.values.paymentAddress,
      clients: clients
    }
  })

  const [updateTicket]= useMutation(UPDATE_TICKET,{
    update(
      _,
      {data}
    ){
      console.log(data)
      router.back()
    },
    OnError(err){
      setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
      console.log(errors)
    },
    variables:{
      _id: editTicket._id,
      propertyId: editTicket.propertyId,
      status: ticket.values.status,
      area: ticket.values.area,
      price: ticket.values.price,
      currency: ticket.values.currency,
      promissory: ticket.values.promissory,
      emissionDate: ticket.values.emissionDate,
      paymentLocation: ticket.values.paymentLocation,
      paymentAddress: ticket.values.paymentAddress,
      clients: clients
    }
  })


  const onChangeMonths = (event) => {
    if(event.target.value === '')
      setPromissory({ ...promissory, months: '' });
    else 
      setPromissory({ ...promissory, months: parseInt(event.target.value) });  
  };

  const onChangePayment = (event) => {
    if(event.target.value === '')
      setPromissory({ ...promissory, payment: '' });
    else
      setPromissory({ ...promissory, payment: parseFloat(event.target.value) });
  };

  function isInputError(key) {
    return ticket.touched[key] && ticket.errors[key];
  }

  const defaultInputProps = {
    fullWidth: true,
    size: "medium",
    margin: "dense",
    variant: "filled",
  };

  const defaultTypoProps = {
    align: "left",
    display: "block",
    gutterBottom: true,
    variant: "h5",
  };

  const requiredInputs = {
    required: true,
    title: "Por favor, llene este campo.",
  };

  const handleNewPromissory = () => {
    console.log(ticket.values.promissory);
    setPromissory({ ...promissory,months:promissory.months});
    setPromissory({ ...promissory,payment:promissory.payment});
      if (promissory.payment !== "" && promissory.months !== "") {
        ticket.setFieldValue("promissory", [
          ...ticket.values.promissory,
          promissory,
        ]);
        setPromissory({ months: '', payment: '' });
      }
  };

  const deletePromissory = (index) => {
    console.log(index);
    let auxPromissory = ticket.values.promissory;
    auxPromissory.splice(index, 1);
    ticket.setFieldValue("promissory", auxPromissory);
  };

  function handleChangeClients (updatedClients) {
    setClients(updatedClients)
  }

  return (
    <div className={classes.root}>
      <form onSubmit={ticket.handleSubmit}>
        <Typography {...defaultTypoProps}>
          Informacion de la propiedad
        </Typography>
        <SearchClient
          selectedClients={editTicket ? clients : null}
          clients={autoCompleteClients}
          handleChangeVendors={handleChangeClients}
        />
        {/* Statu */}
        <FormControl
          className={classes.formControl}
          {...defaultInputProps}
          {...requiredInputs}
        >
          <InputLabel id="statusSelect">Estado</InputLabel>
          <Select
            labelId="statusSelect"
            id="status"
            name="status"
            onChange={ticket.handleChange}
            value={ticket.values.status}
            error={isInputError("status")}
          >
            <MenuItem value={"No pagado"}>No pagado</MenuItem>
            <MenuItem value={"Pagado"}>Pagado</MenuItem>
          </Select>
        </FormControl>
        {/* area */}
        <TextField
          {...defaultInputProps}
          {...requiredInputs}
          id="area"
          name="area"
          label="Area"
          helperText="m2"
          type="number"
          title="Por favor, llene este campo"
          placeholder="100"
          onChange={ticket.handleChange}
          value={ticket.values.area}
          error={isInputError("area")}
        />
        {/* price */}
        <TextField
          {...defaultInputProps}
          {...requiredInputs}
          id="price"
          name="price"
          label="Precio"
          type="number"
          helperText="Precios por m^2"
          title="Por favor, llene este campo"
          placeholder="100"
          onChange={ticket.handleChange}
          value={ticket.values.price}
          error={isInputError("price")}
        />
        {/* currency */}
        <FormControl
          className={classes.formControl}
          {...defaultInputProps}
          {...requiredInputs}
        >
          <InputLabel id="currencySelect">Moneda</InputLabel>
          <Select
            labelId="currencySelect"
            id="currency"
            name="currency"
            onChange={ticket.handleChange}
            value={ticket.values.currency}
            error={isInputError("currency")}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"MXN"}>MXN</MenuItem>
          </Select>
        </FormControl>
        <TextField
          {...defaultInputProps}
          {...requiredInputs}
          id="emissionDate"
          name="emissionDate"
          helperText=""
          type="date"
          title="Por favor, llene este campo"
          placeholder=""
          onChange={ticket.handleChange}
          value={ticket.values.emissionDate}
          error={isInputError("emissionDate")}
        />
        <Typography {...defaultTypoProps}>Pagare</Typography>
        <TextField
            {...defaultInputProps}
            className={classes.center}
            id="months"
            name="months"
            label="Meses"
            helperText=""
            type="number"
            placeholder=""
            onChange={onChangeMonths}
            value={promissory.months}
          />
          <TextField
            {...defaultInputProps}
            className={classes.center}
            id="payment"
            name="payment"
            label="Mensualidad"
            helperText=""
            type="number"
            placeholder=""
            onChange={onChangePayment}
            value={promissory.payment}
          />
                  <AddPromisorryButton
          className={classes.center}
          size="large"
          fullWidth
          onClick={handleNewPromissory}
          startIcon={<SaveIcon />}
        >
          {stateAddPromissory ? "Generar Pagare" : "Crear Pagare"}
        </AddPromisorryButton>
        <ShowPromissory
          promissory={ticket.values.promissory}
          deletePromissory={deletePromissory}
        />


        {/* paymentLocation */}
        <FormControl
          className={classes.formControl}
          {...defaultInputProps}
          {...requiredInputs}
        >
          <InputLabel id="paymentLocationSelect">Localidad</InputLabel>
          <Select
            labelId="paymentLocationSelect"
            id="paymentLocation"
            name="paymentLocation"
            onChange={ticket.handleChange}
            value={ticket.values.paymentLocation}
            error={isInputError("paymentLocation")}
          >
            <MenuItem value={"Tecate"}>Tecate</MenuItem>
            <MenuItem value={"Tijuana"}>Tijuana</MenuItem>
            <MenuItem value={"Mexicali"}>Mexicali</MenuItem>
            <MenuItem value={"San Quintín"}>San Quintín</MenuItem>
            <MenuItem value={"Rosarito"}>Rosarito</MenuItem>
            <MenuItem value={"Ensenada"}>Ensenada</MenuItem>
          </Select>
        </FormControl>
        <TextField
          {...defaultInputProps}
          {...requiredInputs}
          id="paymentAddress"
          name="paymentAddress"
          label="Direccion"
          helperText=""
          title="Por favor, llene este campo"
          placeholder=""
          onChange={ticket.handleChange}
          value={ticket.values.paymentAddress}
          error={isInputError("paymentAddress")}
        />

        <SubmitButton
          type="submit"
          size="large"
          fullWidth
        >
          {editTicket ? 'Editar Ticket' : 'Crear Ticket'}
        </SubmitButton>
      </form>
    </div>
  );
}

const CREATE_TICKET = gql`
  mutation createTicket(
    $propertyId:ID!
    $clients: [ClientInput!]!
    $status:String!
    $area:Float!
    $price:Float!
    $currency:String!
    $promissory:[PromissoryInput]
    $emissionDate:Date!
    $paymentLocation:String!
    $paymentAddress:String!
  ){
    createTicket(
      ticket:{
        propertyId: $propertyId
        status: $status
        area: $area
        price: $price
        currency: $currency
        promissory: $promissory
        emissionDate: $emissionDate
        paymentLocation: $paymentLocation
        paymentAddress: $paymentAddress
      }
      clients: $clients
    ){
      message
      code
      success
      ticket{
        _id
        propertyId
        clients{
          _id
          name
          gender
          birthday
          contact{
            email
            phone
          }
          location{
            city
            state
            address
          }
        }
        status
        area
        price
        currency
        emissionDate
        promissory{
          months
          payment
        }
        paymentLocation
        paymentAddress
      }
    }
  }
`

const UPDATE_TICKET = gql`
  mutation updateTicket(
    $_id: ID!
    $propertyId: ID!
    $status: String!
    $area: Float!
    $price: Float!
    $currency: String!
    $promissory: [PromissoryInput]
    $emissionDate: Date!
    $paymentLocation: String!
    $paymentAddress: String!
    $clients: [ClientInput!]!
  ) {
    updateTicket(
      ticket: {
        _id: $_id
        propertyId: $propertyId
        status: $status
        area: $area
        price: $price
        currency: $currency
        promissory: $promissory
        emissionDate: $emissionDate
        paymentLocation: $paymentLocation
        paymentAddress: $paymentAddress
      }
      clients: $clients
    ) {
      success
      code
      message
    }
  }
`

export default TicketForm;
