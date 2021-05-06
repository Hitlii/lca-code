import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import GreenButton from "../buttons/GreenButton";
import ShowPromissory from "../showPromissory";
import useTicket from "../../hooks/useTicket";

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

import InputText from "../inputs/InputText";
import InputSelect from "../inputs/InputSelect";
import InputHandlePromisorry from "../inputs/InputHandlePromisorry";
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
  gridItem: {
    textAlign: "center",
  },
  textMargin: {
    marginRight: "auto",
  },

  errorStyle: {
    color: "red",
  },
}));

const TicketForm = () => {
  const [promissory, setPromissory] = useState({ months: "", payment: "" });
  const [stateAddPromissory, setStateAddPromissory] = useState(false);
  const classes = useStyles();
  const { ticket, currency, status, location } = useTicket();

  const onChangeMonths = (event) => {
    setPromissory({ ...promissory, months: event.target.value });
    console.log(promissory);
  };
  const onChangePayment = (event) => {
    setPromissory({ ...promissory, payment: event.target.value });
    console.log(promissory);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ticket.handleSubmit();
  };

  const handleNewPromissory = () => {
    if (stateAddPromissory) {
      console.log(promissory);
      if (promissory.payment !== "" && promissory.months !== "") {
        ticket.setFieldValue("promissory", [
          ...ticket.values.promissory,
          promissory,
        ]);
        setPromissory({ months: "", payment: "" });
      }
      setStateAddPromissory(false);
    } else {
      setStateAddPromissory(true);
    }
  };
  const deletePromissory = (index) => {
    console.log(index);
    let auxPromissory = ticket.values.promissory;
    auxPromissory.splice(index, 1);
    ticket.setFieldValue("promissory", auxPromissory);
  };

  return (
    <form onSubmit={ticket.handleSubmit}>
      <Grid container justify="center">
        <Typography variant="subtitle1" gutterBottom>
          Informacion de cliente
        </Typography>
        <Grid item className={classes.gridItem} xs={12}>
          <InputText
            type="text"
            placeholder="*"
            value={ticket.values.name}
            name="name"
            onChange={ticket.handleChange}
            error={ticket.touched.name && ticket.errors.name}
          />
        </Grid>

        <Typography variant="subtitle1" gutterBottom>
          Informacion de la propiedad
        </Typography>
        <Grid item className={classes.gridItem} xs={12}>
          <InputText
            type="text"
            placeholder="Id de propiedad"
            value={ticket.values.idProperty}
            name="idProperty"
            onChange={ticket.handleChange}
            error={ticket.touched.idProperty && ticket.errors.idProperty}
          />
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <InputText
            type="text"
            placeholder="Area de la propiedad"
            value={ticket.values.area}
            name="area"
            onChange={ticket.handleChange}
            error={ticket.touched.area && ticket.errors.area}
          />
        </Grid>

        <Grid container justity="flex-start">
          <Typography
            className={classes.textMargin}
            variant="body2"
            gutterBottom
          >
            Fecha de emisión
          </Typography>
        </Grid>
        <Grid item className={classes.gridItem} xs={12}>
          <InputText
            type="date"
            placeholder="Area de la propiedad"
            value={ticket.values.emissionDate}
            name="emissionDate"
            onChange={ticket.handleChange}
            error={ticket.touched.emissionDate && ticket.errors.emissionDate}
          />
        </Grid>
        <InputSelect
          object={status}
          label="Estado"
          value={ticket.values.statu}
          name="statu"
          onChange={ticket.handleChange}
          error={ticket.touched.statu && ticket.errors.statu}
        />

        <Grid container justify="center">
          <InputText
            name="price"
            //className={classes.inputPriceStyle}
            type="text"
            placeholder="Precios"
            onChange={ticket.handleChange}
            value={ticket.values.price}
          />
          <InputSelect
            object={currency}
            label="Divisa"
            placeholder="Moneda"
            value={ticket.values.currency}
            name="currency"
            onChange={ticket.handleChange}
            error={ticket.touched.currency && ticket.errors.currency}
          />
          <InputHandlePromisorry
            stateAddPromissory={stateAddPromissory}
            promissory={promissory}
            onChangeMonths={onChangeMonths}
            onChangePayment={onChangePayment}
            handleNewPromissory={handleNewPromissory}
          />

          <ShowPromissory
            promissory={ticket.values.promissory}
            deletePromissory={deletePromissory}
          />

          <InputSelect
            object={location}
            label="Localidad"
            value={ticket.values.paymentLocation}
            name="paymentLocation"
            onChange={ticket.handleChange}
            error={
              ticket.touched.paymentLocation && ticket.errors.paymentLocation
            }
          />

          <Grid item className={classes.gridItem} xs={12}>
            <InputText
              type="text"
              placeholder="Direccion de la localidad"
              value={ticket.values.paymentAddress}
              name="paymentAddress"
              onChange={ticket.handleChange}
              error={
                ticket.touched.paymentAddress && ticket.errors.paymentAddress
              }
            />
          </Grid>
        </Grid>

        <GreenButton type="submit" text="Crear"></GreenButton>
      </Grid>
    </form>
  );
};

export default TicketForm;
