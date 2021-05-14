import { useState } from "react";
import FilterIconButton from "../buttons/FilterIconButton";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import { Typography, Grid, Button, Paper, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import SliderInput from "../inputs/SliderInput";
import useFilterForm from "../../hooks/useFilterForm";
import FilterButton from "../buttons/FilterButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 38,
    height: 37,
    textAlign: "center",
  },
  marginText: {
    marginLeft: 20,
  },
  margin: {
    marginLeft: 20,
    marginBottom: 10,
  },
  container: {
    padding: 0,
    margin: 0,
    borderRadius: 15,
    boxShadow: "0 0 10px",
  },
  title: {
    margin: 20,
  },
  titleButton: {
    margin: 20,
    color: "#E41E2B",
  },
  greenButton: {
    width: 320,
    height: 40,
    borderRadius: 15,
    color: "white",
    margin: "auto",
    marginBottom: 20,
    marginTop: 60,
    backgroundColor: "#4CAF50",
    display: "flex",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#4CAF50",
    },
  },
}));

function FilterPropertiesForm({ stateComponent }) {
  const classes = useStyles();
  const [stateZonesButton, setStateZonesButton] = useState([
    false,
    false,
    false,
  ]);
  const [stateTypesButton, setStateTypeButton] = useState([
    false,
    false,
    false,
  ]);
  const [stateStatusButton, setStateStatusButton] = useState([false, false]);
  const [stateCitiesButton, setStateCitiesButton] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [price, setPrice] = useState([20, 89]);
  const [area, setArea] = useState([20, 89]);
  const { filterProperty, zones, status, types, cities } = useFilterForm();

  const onChangeZone = (values, index) => {
    let array = [false, false, false];
    array.splice(index, 1, true);
    setStateZonesButton(array);
    filterProperty.setFieldValue("zone", values);
  };
  const onChangeType = (values, index) => {
    let array = [false, false, false];
    array.splice(index, 1, true);
    setStateTypeButton(array);
    filterProperty.setFieldValue("type", values);
  };
  const onChangeStatu = (values, index) => {
    let array = [false, false];
    array.splice(index, 1, true);
    setStateStatusButton(array);
    filterProperty.setFieldValue("statu", values);
  };
  const onChangeCities = (values, index) => {
    let array = [false, false, false, false, false];
    array.splice(index, 1, true);
    setStateCitiesButton(array);
    filterProperty.setFieldValue("city", values);
  };
  const reset = () => {
    setStateZonesButton([false, false, false]);
    setStateTypeButton([false, false, false]);
    setStateStatusButton([false, false]);
    setStateCitiesButton([false, false, false, false, false]);
    filterProperty.setFieldValue("city", "");
    filterProperty.setFieldValue("statu", "");
    filterProperty.setFieldValue("type", "");
    filterProperty.setFieldValue("zone", "");
  };
  const onChangePrice = (event, newValue) => {
    setPrice(newValue);
  };
  const onChangeArea = (event, newValue) => {
    setArea(newValue);
  };

  return (
    <Collapse in={stateComponent}>
      <Paper className={classes.container} elevation={3}>
        <Grid container justify="space-between">
          <Typography className={classes.title} variant="h6">
            Filtrar por
          </Typography>
          <Button
            className={classes.titleButton}
            onClick={reset}
            startIcon={<DeleteIcon />}
          >
            Borrar filtros
          </Button>
        </Grid>
        <form onSubmit={filterProperty.handleSubmit}>
          <Typography className={classes.marginText}>Zona</Typography>
          <Grid container>
            <Grid item className={classes.margin}>
              <FilterIconButton
                name={zones[0]}
                Icon={
                  <HomeIcon
                    className={classes.icon}
                    style={{ color: stateZonesButton[0] ? "white" : null }}
                  />
                }
                text={zones[0]}
                onChange={onChangeZone}
                index={0}
                stateButton={stateZonesButton[0]}
              />
            </Grid>
            <Grid item className={classes.margin}>
              <FilterIconButton
                name={zones[1]}
                Icon={
                  <WorkIcon
                    className={classes.icon}
                    style={{ color: stateZonesButton[1] ? "white" : null }}
                  />
                }
                text={zones[1]}
                onChange={onChangeZone}
                index={1}
                stateButton={stateZonesButton[1]}
              />
            </Grid>
            <Grid item className={classes.margin}>
              <FilterIconButton
                name={zones[2]}
                Icon={
                  <FilterHdrIcon
                    className={classes.icon}
                    style={{ color: stateZonesButton[2] ? "white" : null }}
                  />
                }
                text={zones[2]}
                onChange={onChangeZone}
                stateButton={stateZonesButton[2]}
                index={2}
              />
            </Grid>
          </Grid>

          <Typography className={classes.marginText}>Tipo</Typography>
          <Grid container>
            {types.map((type, index) => {
              return (
                <Grid item className={classes.margin} key={type}>
                  <FilterButton
                    key={type}
                    name={type}
                    text={type}
                    index={index}
                    onChange={onChangeType}
                    stateButton={stateTypesButton[index]}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Typography className={classes.marginText}>Estado</Typography>
          <Grid container>
            {status.map((type, index) => {
              return (
                <Grid item className={classes.margin} key={type}>
                  <FilterButton
                    key={type}
                    name={type}
                    text={type}
                    index={index}
                    onChange={onChangeStatu}
                    stateButton={stateStatusButton[index]}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Typography className={classes.marginText}>ciudad</Typography>
          <Grid container>
            {cities.map((type, index) => {
              return (
                <Grid item className={classes.margin} key={type}>
                  <FilterButton
                    key={type}
                    name={type}
                    text={type}
                    index={index}
                    onChange={onChangeCities}
                    stateButton={stateCitiesButton[index]}
                  />
                </Grid>
              );
            })}
          </Grid>

          <SliderInput
            label="Precios (USD)"
            value={price}
            onChange={onChangePrice}
          />
          <SliderInput label="Area" value={area} onChange={onChangeArea} />
          <Button type="submit" className={classes.greenButton}>
            Buscar
          </Button>
        </form>
      </Paper>
    </Collapse>
  );
}

export default FilterPropertiesForm;
