import React from "react";
import { Grid, Collapse } from "@material-ui/core";
import GreenButton from "../buttons/GreenButton";
import InputText from "./InputText";
const InputHandlePromisorry = ({
  stateAddPromissory,
  promissory,
  onChangeMonths,
  onChangePayment,
  handleNewPromissory,
}) => {
  return (
      <>
      <GreenButton
          text={stateAddPromissory ? "Genera Pagare" : "Agregar pagare"}
          onClick={handleNewPromissory}
        />

        


      <Collapse in={stateAddPromissory}>
            <InputText
              name="months"
              type="number"
              placeholder="Numero de pagarés"
              onChange={onChangeMonths}
              value={promissory.months}
            />

            <InputText
              name="payment"
              type="number"
              placeholder="Mensualidad"
              onChange={onChangePayment}
              value={promissory.payment}
            />

      </Collapse>
      </>
  );
};

export default InputHandlePromisorry;
