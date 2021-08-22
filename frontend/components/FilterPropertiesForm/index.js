import { useState, Fragment } from "react";

// Material UI Imports ------------------------------

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";

// My imports ------------------------------
import FilterIconButton from "../FilterIconButton";
import {useStyles} from './styles'
import FilterButton from "../FilterButton";




function FilterPropertiesForm(props) {
  const classes = useStyles();
  const zones = ["Urbana", "Campestre", "Comercial"];
  const types = ["Terreno", "Casa", "Rancho"];
  const status = ["Venta", "Renta"];
  const cities = ["Tecate", "Ensenada", "Rosarito", "Tijuana", "Mexicali"];


  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={5} lg={8}>
          <Typography className={classes.title} variant="h6">
            Filtrar por
          </Typography>
        </Grid>

        <Grid item xs={7} lg={4}>
          <Button
            className={classes.removeFilters}
            onClick={props.reset}
            fullWidth
            size="large"
            startIcon={<DeleteIcon />}
          >
          Borrar filtros
          </Button>
        </Grid>

        {/* ZONE */}
        <form onSubmit={props.handleSubmit} className={classes.form}>
        <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Typography>Zona</Typography> 
              </Grid>
              <Grid item xs={4} >
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

              <Grid item xs={4}>
                <FilterIconButton
                    name={zones[1]}
                    Icon={
                      <FilterHdrIcon
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

              <Grid item xs={4}>
                <FilterIconButton
                    name={zones[2]}
                    Icon={
                      <WorkIcon
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
              
              {/* TYPE */}
              <Grid item xs={12}>
                <Typography gutterBottom >Tipo</Typography>
              </Grid>
               {types.map((type, index) =>
                <Grid item xs={4} key={type}>             
                    <FilterButton
                      name={type}
                      text={type}
                      index={index}
                      onChange={props.onChangeType}
                      stateButton={props.stateTypesButton[index]}
                    />
                </Grid>
              )}

              {/* STATE */}
              <Grid item xs={12}>
                <Typography gutterBottom >Estado</Typography>
              </Grid>
              {status.map((type, index) =>
                <Grid item xs={4} key={type}>             
                    <FilterButton
                      name={type}
                      text={type}
                      index={index}
                      onChange={props.onChangeStatus}
                      stateButton={props.stateStatusButton[index]}
                    />
                </Grid>
              )}
              {/* CITIES */}
              <Grid item xs={12}>
                <Typography gutterBottom >Ciudad</Typography>
              </Grid>
               {cities.map((type, index) =>
                <Grid item xs={4} key={type}>             
                    <FilterButton
                      name={type}
                      text={type}
                      index={index}
                      onChange={props.onChangeCities}
                      stateButton={props.stateCitiesButton[index]}
                    />
                </Grid>
              )}
              {/* PRICE */}
              <Grid item xs={12}>
                <Typography>Precio (USD)</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  id="minPrice"
                  name="minPrice"
                  type="number"
                  fullWidth
                  inputProps={{step:"0.01"}}
                  onChange={props.filterProperty.handleChange}
                  value={props.filterProperty.values.minPrice}
                  helperText={props.filterProperty.errors.minArea? "Introduce el precio mínimo":null}
                  label="Min"
                  error={props.filterProperty.errors.minPrice? true:false}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  fullWidth
                  inputProps={{step:"0.01"}}
                  helperText={props.filterProperty.errors.minArea? "Introduce el precio máximo":null}
                  onChange={props.filterProperty.handleChange}
                  value={props.filterProperty.values.maxPrice}
                  error={props.filterProperty.errors.maxPrice? true:false}
                  label="Máx"
                />
              </Grid> 


              {/* AREA */}
              <Grid item xs={12}>
                <Typography >Area (m²)</Typography>
              </Grid>       
              <Grid item xs={6}>
                <TextField
                  id="minArea"
                  name="minArea"
                  type="number"
                  fullWidth
                  inputProps={{step:"0.01"}}
                  helperText={props.filterProperty.errors.minArea? "Introduce el área minima":null}
                  onChange={props.filterProperty.handleChange}
                  value={props.filterProperty.values.minArea}
                  error={props.filterProperty.errors.minArea? true:false}
                  label="Min"
                />
              </Grid>  

              <Grid item xs={6}>
                <TextField
                  id="maxArea"
                  name="maxArea"
                  type="number"
                  fullWidth
                  inputProps={{step:"0.01"}}
                  helperText={props.filterProperty.errors.maxArea? "Introduce el área maxima":null }
                  onChange={props.filterProperty.handleChange}
                  value={props.filterProperty.values.maxArea}
                  error={props.filterProperty.errors.maxArea? true:false}
                  label="Min"
                />
              </Grid>        
              <Button type="submit" fullWidth className={classes.greenButton}>
                Buscar
              </Button>
                


            </Grid>
        </Grid>
          </form>
      </Grid>
    </div>
  );
}

export default FilterPropertiesForm;
