import React from 'react'
import {Grid} from '@material-ui/core'
import GreenButton from '../buttons/GreenButton'
import InputText from './InputText'
const InputHandlePromisorry = ({stateAddPromissory,promissory,onChangeMonths,onChangePayment,handleNewPromissory}) => {
    return (
        <Grid container justify="center">
            <GreenButton
            text={stateAddPromissory ? "Genera Pagare" : "Agregar pagare"}
            onClick={handleNewPromissory}
          />
          {stateAddPromissory ? (
            <Grid container direction="row" justify="center">
              <Grid item>
                <InputText
                  name="months"
                  type="number"
                  placeholder="Numero de pagarés"
                  onChange={onChangeMonths}
                  value={promissory.months}
                />
              </Grid>
              <Grid item>
                <InputText
                  name="payment"
                  type="number"
                  placeholder="Mensualidad"
                  onChange={onChangePayment}
                  value={promissory.payment}
                />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
    )
}

export default InputHandlePromisorry
