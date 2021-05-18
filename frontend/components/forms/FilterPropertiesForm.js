import { useState } from "react";
import FilterIconButton from "../buttons/FilterIconButton";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import {
  Typography,
  Grid,
  Button,
  Paper,
  Collapse,
  TextField,
} from "@material-ui/core";
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
    inputwidth: {
      width: 100,
    },
  },
}));

function FilterPropertiesForm(props) {
  const classes = useStyles();
  const zones = ["Urbana", "Campestre", "Comercial"];
  const types = ["Terreno", "Casa", "Rancho"];
  const status = ["Venta", "Renta"];
  const cities = ["Tecate", "Ensenada", "Rosarito", "Tijuana", "Mexicali"];




  return (
    <Paper className={classes.container} elevation={3}>
      <Grid container justify="space-between">
        <Typography className={classes.title} variant="h6">
          Filtrar por
        </Typography>
        <Button
          className={classes.titleButton}
          onClick={props.reset}
          startIcon={<DeleteIcon />}
        >
          Borrar filtros
        </Button>
      </Grid>
      <form onSubmit={props.handleSubmit}>
        <Typography className={classes.marginText}>Zona</Typography>
        <Grid container>
          <Grid item className={classes.margin}>
            <FilterIconButton
              name={zones[0]}
              Icon={
                <HomeIcon
                  className={classes.icon}
                  style={{ color: props.stateZonesButton[0] ? "white" : null }}
                />
              }
              text={zones[0]}
              onChange={props.onChangeZone}
              index={0}
              stateButton={props.stateZonesButton[0]}
            />
          </Grid>
          <Grid item className={classes.margin}>
            <FilterIconButton
              name={zones[1]}
              Icon={
                <WorkIcon
                  className={classes.icon}
                  style={{ color: props.stateZonesButton[1] ? "white" : null }}
                />
              }
              text={zones[1]}
              onChange={props.onChangeZone}
              index={1}
              stateButton={props.stateZonesButton[1]}
            />
          </Grid>
          <Grid item className={classes.margin}>
            <FilterIconButton
              name={zones[2]}
              Icon={
                <FilterHdrIcon
                  className={classes.icon}
                  style={{ color: props.stateZonesButton[2] ? "white" : null }}
                />
              }
              text={zones[2]}
              onChange={props.onChangeZone}
              stateButton={props.stateZonesButton[2]}
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
                  onChange={props.onChangeType}
                  stateButton={props.stateTypesButton[index]}
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
                  onChange={props.onChangeStatus}
                  stateButton={props.stateStatusButton[index]}
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
                  onChange={props.onChangeCities}
                  stateButton={props.stateCitiesButton[index]}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography className={classes.marginText}>Precios</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="price.minPrice"
              name="price.minPrice"
              type="number"
              inputProps={{step:"0.01"}}
              onChange={props.filterProperty.handleChange}
              value={props.filterProperty.values.price.minPrice}
              helperText={props.filterProperty.errors.minArea?"Introduce el precio minimo":null}
              label="Min"
              error={props.filterProperty.errors.minPrice? true:false}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="price.maxPrice"
              name="price.maxPrice"
              type="number"
              inputProps={{step:"0.01"}}
              helperText={props.filterProperty.errors.minArea?"Introduce el precio maximo":null}
              onChange={props.filterProperty.handleChange}
              value={props.filterProperty.values.price.maxPrice}
              error={props.filterProperty.errors.maxPrice? true:false}
              label="Max"
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography className={classes.marginText}>Area</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="area.minArea"
              name="area.minArea"
              type="number"
              inputProps={{step:"0.01"}}
              helperText={props.filterProperty.errors.minArea?"Introduce la area minima":null}
              onChange={props.filterProperty.handleChange}
              value={props.filterProperty.values.area.minArea}
              error={props.filterProperty.errors.minArea? true:false}
              label="Min"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="area.maxArea"
              name="area.maxArea"
              type="number"
              inputProps={{step:"0.01"}}
              helperText={props.filterProperty.errors.maxArea?"Introduce la area maxima":null}
              onChange={props.filterProperty.handleChange}
              value={props.filterProperty.values.area.maxArea}
              error={props.filterProperty.errors.maxArea? true:false}
              label="Min"
            />
          </Grid>
        </Grid>

        <Button type="submit" className={classes.greenButton}>
          Buscar
        </Button>

      </form>
    </Paper>
  );
}

export default FilterPropertiesForm;
