import React, { useState, useRef } from "react";

// Material UI Imports ------------------------------
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'

// My Imports ------------------------------
import FilterPropertiesForm from "../../components/forms/FilterPropertiesForm";
import OrderFilterButton from "../../components/buttons/OrderFilterButton";
import OrderProperty from "../../components/OrderProperty";
import PropertyCard from "../../components/cards/PropertyCard";
import client from "../../lib/apollo-client";
import useFilterForm from "../../hooks/useFilterForm";
import {
  drawerStyles,
  StyledPaperLarge,
  StyledPaper,
} from "../../styles/DrawerStyles";
import {
  lightNeutral,
  darkneutral,
} from '../../public/colors'

// Graph QL Imports ------------------------------
import { GET_PROPERTIES } from "../../graphql/queries";

import Link from "next/link";

const useStyles = makeStyles((theme) => ({
 root: {
   minWidth: 320,
   maxWidth: 600,
   margin:"auto"
 },
 search:{
   borderRadius: 15,
   backgroundColor: "#f2f2f2"
 },

  iconButton: {
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  result: {
    margin: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    textAlign: "center",
  },
  search: {
    border:'none',
    backgroundColor:"#f2f2f2",
    borderRadius: 30,
  }
}));

export default function AllPropertiesPage(props) {
  const classes = useStyles();

  const [properties, setProperties] = useState();
  const { filterProperty, resetFilterPropertyValues } = useFilterForm();
  const [showOrderComponent, setShowOrderComponent] = useState(false);
  const [showFilterComponent, setShowFilterComponent] = useState(false);
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
  const updateOrderPrice = (value) => {
    filterProperty.setFieldValue(
      "orderPrice",
      filterProperty.values.orderPrice === value ? "" : value
    );
    // console.log(filterProperty.values.orderPrice);
  };
  const updateOrderArea = (value) => {
    filterProperty.setFieldValue(
      "orderArea",
      filterProperty.values.orderArea === value ? "" : value
    );
    //setOrderArea((current) => (current === value ? 0 : value));
    // console.log(filterProperty.values.orderArea);
  };
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
  const onChangeStatus = (values, index) => {
    let array = [false, false];
    array.splice(index, 1, true);
    setStateStatusButton(array);
    filterProperty.setFieldValue("status", values);
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
    resetFilterPropertyValues();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let variables = {};
    // validate param to query
    let keys = Object.keys(filterProperty.values);
    console.log(keys);
    keys.forEach((key) => {
      if (
        filterProperty.values[key] !== "" &&
        key !== "area" &&
        key !== "price"
      ) {
        variables[key] = filterProperty.values[key];
      }
    });

    if (
      filterProperty.values.price.minPrice !== "" &&
      filterProperty.values.price.maxPrice !== ""
    ) {
      variables.price = {
        minPrice: filterProperty.values.price.minPrice,
        maxPrice: filterProperty.values.price.maxPrice,
      };
    }
    if (
      filterProperty.values.area.minArea !== "" &&
      filterProperty.values.area.maxArea !== ""
    ) {
      variables.area = {
        minArea: filterProperty.values.area.minArea,
        maxArea: filterProperty.values.area.maxArea,
      };
    }

    console.log(variables);
    const { data } = await client.query({
      query: GET_PROPERTIES,
      variables,
    });
    setProperties(data.getProperties);
    setShowFilterComponent(false);
    // console.log(data.getProperties);
    // console.log(filterProperty.values);
  }
  function onCloseFilterComponent() {
    setShowFilterComponent((current) => !current);
    // resetFilterPropertyValues();
  }
  function onCloseOrderComponent() {
    setShowOrderComponent((current) => !current);
  }
  function handleShowOrderComponent() {
    setShowOrderComponent((current) => !current);
  }
  function handleShowFilterComponent() {
    setShowFilterComponent((current) => !current);
  }
  return (
    <>
    <Grid className={classes.root} spacing={3} container justify="center">
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Link href="/">
              <IconButton className={classes.iconButton}>
                <KeyboardBackspaceIcon />
              </IconButton>
            </Link>
          </Grid>

          <Grid item xs={10}>
            <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="search">Buscar propiedad</InputLabel>
            <FilledInput
              id="search"
              name="search"
              type="text"
              value={filterProperty.values.search}
              onChange={filterProperty.handleChange}
              autoFocus
              fullWidth
              className={classes.search}
              disableUnderline
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search button"
                    onClick={handleSubmit}
                    edge="end"
                  >
                      <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <span>{properties? properties.length:0} resultado(s) </span>
        <Divider/>
      </Grid>
      
      
    </Grid>
    
      
      { properties ? properties.map((property) => {
            return (
              <PropertyCard
                key={property._id}
                orientation="horizontal"
                property={property}
              />
            );
          })
        : null}

      <Drawer
        PaperProps={{ component: StyledPaperLarge }}
        anchor="bottom"
        open={showFilterComponent}
        onClose={onCloseFilterComponent}
      >
        <FilterPropertiesForm
          stateZonesButton={stateZonesButton}
          stateStatusButton={stateStatusButton}
          stateCitiesButton={stateCitiesButton}
          stateTypesButton={stateTypesButton}
          onChangeZone={onChangeZone}
          onChangeCities={onChangeCities}
          onChangeType={onChangeType}
          onChangeStatus={onChangeStatus}
          filterProperty={filterProperty}
          handleSubmit={handleSubmit}
          reset={reset}
        />
      </Drawer>
      <Drawer
        PaperProps={{ component: StyledPaper }}
        anchor="bottom"
        open={showOrderComponent}
        onClose={onCloseOrderComponent}
      >
        <OrderProperty
          orderPrice={filterProperty.values.orderPrice}
          orderArea={filterProperty.values.orderArea}
          updateOrderPrice={updateOrderPrice}
          updateOrderArea={updateOrderArea}
          handleSubmit={handleSubmit}
        />
      </Drawer>
      <OrderFilterButton
        onChangeFilter={handleShowFilterComponent}
        onChangeOrder={handleShowOrderComponent}

      />
      </>
  );
}
