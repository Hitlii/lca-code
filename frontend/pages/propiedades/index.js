import React, { useState, useRef } from "react";

// Material UI Imports ------------------------------

import Divider from '@material-ui/core/Divider'


import {
  IconButton,
  InputBase,
  Paper,
  Drawer,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import OrderFilterButton from "../../components/buttons/OrderFilterButton";
import NoFoundComponent from "../../components/NoFoundComponent";
//ICONS
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import SearchIcon from "@material-ui/icons/Search";
//import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'

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

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FilterPropertiesForm from "../../components/forms/FilterPropertiesForm";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import PropertyCard from "../../components/cards/PropertyCard";
import OrderProperty from "../../components/OrderProperty";

import { GET_PROPERTIES } from "../../graphql/queries";


const useStyles = makeStyles((theme) => ({
 root: {
   minWidth: 320,
   maxWidth: 600,
   margin:"auto"
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
  },

  icons: {
    backgroundColor: "#f2f2f2",
    margin: "auto",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  containerIcons: {
    marginTop:20,
    display: "flex",
    justifyContent: "center",
  },
  sadIcon: {
    height: 200,
  },
  errorMessage: {
    display: "flex",
    color: "red",
    justifyContent: "center",
  },
  cards: {
    margin:'auto'
  }

}));

export default function AllPropertiesPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const [errors, setErrors] = useState();
  const pageNumber = useRef(1);
  const [properties, setProperties] = useState(props.properties);
  const [statePageNumber, setStatePageNumber] = useState(1);
  const [stateNoFound, setStateNoFound] = useState(false);
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
  function resetPageNumber() {
    pageNumber.current = 1;
    setStatePageNumber(1);
  }

  function updatePageNumber(value) {
    let variables = getParamsFilterQuery();

    if (pageNumber.current + value !== 0) {
       if (properties.length) {
      pageNumber.current += value;
      setStatePageNumber(pageNumber.current);
      variables.pageNumber = pageNumber.current;
      console.log(variables);
      updatePage(variables);
       }
      else if (properties.length === 0 && value === -1) {
        pageNumber.current += value;
        setStatePageNumber(pageNumber.current);
        variables.pageNumber = pageNumber.current;
        updatePage(variables);
      }
    }
  }

  async function updatePage(variables) {
    const { data } = await client.query({
      query: GET_PROPERTIES,
      variables: variables,
    });
    if (data.getProperties.length) {
      setProperties(data.getProperties);
      setErrors();
    } else {
      pageNumber.current -= 1;
      setStatePageNumber(pageNumber.current);
      setErrors({ properties: "Ya es la ultima pagina" });
    }
  }

  const updateOrderPrice = (value) => {
    filterProperty.setFieldValue(
      "priceOrder",
      filterProperty.values.orderPrice === value ? "" : value
    );
    filterProperty.setFieldValue("areaOrder", "");
    console.log(filterProperty.values)
  };
  const updateOrderArea = (value) => {
    filterProperty.setFieldValue(
      "areaOrder",
      filterProperty.values.orderArea === value ? "" : value
    );
    filterProperty.setFieldValue("priceOrder", "");
    console.log(filterProperty.values)
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

  function getParamsFilterQuery() {
    let variables = {};
    const keys = Object.keys(filterProperty.values);
    keys.forEach((key) => {
      if (
        filterProperty.values[key] !== "" &&
        key !== "minArea" &&
        key !== "maxArea" &&
        key !== "minPrice" &&
        key !== "maxPrice"
      ) {
        if (key === "priceOrder" || key === "areaOrder") {
          variables[key] = parseInt(filterProperty.values[key]);
        } else {
          variables[key] = filterProperty.values[key];
        }
      }
    });
    if (
      filterProperty.values.minArea !== "" &&
      filterProperty.values.maxArea !== ""
    ) {
      variables.area = {
        minArea: filterProperty.values.minArea,
        maxArea: filterProperty.values.maxArea,
      };
    }
    if (
      filterProperty.values.minPrice !== "" &&
      filterProperty.values.maxPrice !== ""
    ) {
      variables.price = {
        minPrice: filterProperty.values.minPrice,
        maxPrice: filterProperty.values.maxPrice,
      };
    }
    return variables;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let variables = getParamsFilterQuery();
    variables.pageNumber = 1;
    updatePage(variables);
    const { data } = await client.query({
      query: GET_PROPERTIES,
      variables,
    });
    pageNumber.current = 1;
    if (data.getProperties.length) {
      setProperties(data.getProperties);
      setStateNoFound(false);
    } else {
      setStateNoFound(true);
      resetPageNumber();

    }
    setShowOrderComponent(false)
    setShowFilterComponent(false)
    

  }

  function onCloseFilterComponent() {
    setShowFilterComponent((current) => !current);
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
        <span>{stateNoFound? 0: properties?properties.length:0} resultado(s) </span>
        <Divider/>
      </Grid>
      

    </Grid>
      

      <Grid container justify="center" >
      {stateNoFound ? (
        <NoFoundComponent search={filterProperty.values.search} />
      ) : (
        properties.map((property) => {
          return (
            <Grid item xs={12} className={classes.cards} key={property._id}>
            <PropertyCard
              orientation="horizontal"
              property={property}
            />
            </Grid>
          );
        })
      )}
      </Grid>
      {!stateNoFound ? (
        <div className={classes.containerIcons}>
          <IconButton
            className={classes.icons}
            onClick={() => {
              updatePageNumber(-1);
            }}
          >
            {<ArrowBackIcon />}
          </IconButton>
          <Typography style={{ marginTop: 10 }}>
            Pagina {statePageNumber}
          </Typography>
          <IconButton
            className={classes.icons}
            onClick={() => {
              updatePageNumber(1);
            }}
          >
            {<ArrowForwardIcon />}
          </IconButton>
        </div>
      ) : null}
      {!stateNoFound ? (
        <Typography className={classes.errorMessage}>
          {errors ? errors.properties : ""}
        </Typography>
      ) : null}
      {!stateNoFound ? (
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
      ) : null}
      {!stateNoFound ? (
        <Drawer
          PaperProps={{ component: StyledPaper }}
          anchor="bottom"
          open={showOrderComponent}
          onClose={onCloseOrderComponent}
        >
          <OrderProperty
            orderPrice={filterProperty.values.priceOrder}
            orderArea={filterProperty.values.areaOrder}
            updateOrderPrice={updateOrderPrice}
            updateOrderArea={updateOrderArea}
            handleSubmit={handleSubmit}
          />
        </Drawer>
      ) : null}
      {!stateNoFound ? (
        <OrderFilterButton
          onChangeFilter={handleShowFilterComponent}
          onChangeOrder={handleShowOrderComponent}
        />
      ) : null}
    </div>

  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PROPERTIES,
    variables: { pageNumber: 1 },
  });

  if (!data)
    return {
      props: {
        error: "Error",
      },
    };   
  return {
    props: {
      properties: data.getProperties,
    },
  };
}
