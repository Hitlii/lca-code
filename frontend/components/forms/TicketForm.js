import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ShowPromissory from "../ShowPromissory";

import SearchClient from '../SearchClient'
import Typography from "@material-ui/core/Typography";
import SubmitButton from "../buttons/GreenButton";
import AddPromisorryButton from "../buttons/GreenButton";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import SaveIcon from "@material-ui/icons/Save";
import Select from "@material-ui/core/Select";
import Collapse from "@material-ui/core/Collapse";
import useTicket from "../../hooks/useTicket";
import TextField from "../inputs/TextField";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
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

function TicketForm({autoCompleteClients}) {
    const [clients, setClients] = useState([])
  const [promissory, setPromissory] = useState({ months: "", payment: "" });
  const [stateAddPromissory, setStateAddPromissory] = useState(false);
  const classes = useStyles();
  const { ticket, currency, status, location } = useTicket();
  function isInputError(key) {
    return ticket.touched[key] && ticket.errors[key];
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(ticket.values);
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
  const onChangeMonths = (event) => {
    setPromissory({ ...promissory, months: event.target.value });
    console.log(promissory);
  };
  const onChangePayment = (event) => {
    setPromissory({ ...promissory, payment: event.target.value });
    console.log(promissory);
  };
  const handleNewPromissory = () => {
    console.log(ticket.values.promissory);

      if (promissory.payment !== "" && promissory.months !== "") {
        ticket.setFieldValue("promissory", [
          ...ticket.values.promissory,
          promissory,
        ]);
        setPromissory({ months: "", payment: "" });
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
    console.log(clients)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography {...defaultTypoProps}>Informacion del Cliente</Typography>
        <SearchClient
          clients={autoCompleteClients}
          handleChangeVendors={handleChangeClients}
        />

        <Typography {...defaultTypoProps}>
          Informaciond de la propierdad
        </Typography>
        <TextField
          {...defaultInputProps}
          {...requiredInputs}
          id="idProperty"
          name="idProperty"
          label="Id Property"
          helperText="Máx: 15 caracteres"
          title="Por favor, llene este campo"
          placeholder="0000VT-00"
          onChange={ticket.handleChange}
          value={ticket.values.idProperty}
          error={isInputError("idProperty")}
        />
        {/* Statu */}
        <FormControl
          className={classes.formControl}
          {...defaultInputProps}
          {...requiredInputs}
        >
          <InputLabel id="statuSelect">Estado</InputLabel>
          <Select
            labelId="statuSelect"
            id="statu"
            name="statu"
            onChange={ticket.handleChange}
            value={ticket.values.statu}
            error={isInputError("statu")}
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
          label="Fecha"
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
          startIcon={<SaveIcon />}
        >
          Crear Ticket
        </SubmitButton>
      </form>
    </div>
  );
}

export default TicketForm;
