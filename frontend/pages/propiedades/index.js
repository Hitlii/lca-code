// Todas la propiedades.
import React, { useState, useRef } from "react";

import {
  IconButton,
  InputBase,
  Paper,
  Drawer,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import OrderFilterButton from "../../components/buttons/OrderFilterButton";

import SearchIcon from "@material-ui/icons/Search";
import {
  drawerStyles,
  StyledPaperLarge,
  StyledPaper,
} from "../../styles/DrawerStyles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FilterPropertiesForm from "../../components/forms/FilterPropertiesForm";
import PropertyCard from "../../components/cards/PropertyCard";
import OrderProperty from "../../components/OrderProperty";
import useFilterForm from "../../hooks/useFilterForm";
import client from "../../lib/apollo-client";
import { GET_PROPERTIES } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    marginRight: "auto",
    marginLeft: "auto",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 340,
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "black",
  },
  iconButton: {
    padding: 10,
  },
  resultStyle: {
    margin: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    textAlign: "center",
  },
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
    console.log(filterProperty.values.orderPrice);
  };
  const updateOrderArea = (value) => {
    filterProperty.setFieldValue(
      "orderArea",
      filterProperty.values.orderArea === value ? "" : value
    );
    //setOrderArea((current) => (current === value ? 0 : value));
    console.log(filterProperty.values.orderArea);
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
      variables: variables,
    });
    setProperties(data.getProperties);
    setShowFilterComponent(false);
    console.log(data.getProperties);
    console.log(filterProperty.values);
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
    <div>
      <Paper className={classes.root} elevation={0}>
        <Link href="/">
          <IconButton className={classes.iconButton}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        <InputBase
          name="search"
          id="search"
          value={filterProperty.values.search}
          className={classes.input}
          placeholder="Buscar Propiedad"
          variant="outlined"
          onChange={filterProperty.handleChange}
        />
        <IconButton className={classes.iconButton} onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* <button onClick={showProps}>hola</button> */}
      <Paper className={classes.resultStyle}>
        <Typography>{properties? properties.length:0} resultdo</Typography>
        <Typography>{properties? properties.length:0} filtro</Typography>
      </Paper>

      {properties
        ? properties.map((property) => {
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
    </div>
  );
}
