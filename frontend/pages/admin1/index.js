import React, { useState ,useRef} from 'react'
import { useQuery } from '@apollo/client'
import { GET_ADMIN_PROPERTIES } from '../../graphql/queries'
import client from '../../lib/apollo-client'

import {
  IconButton,
  InputBase, 
  Paper,
} from '@material-ui/core'

import LoadingCircle from '../../components/LoadingCircle'

import { makeStyles } from '@material-ui/core/styles'
import AdminPropertyCard from '../../components/cards/AdminPropertyCard'
import NavBar from '../../components/bars/NavBar'

import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'


import {
  Drawer,
  Typography,
} from "@material-ui/core";


import OrderFilterButton from "../../components/buttons/OrderFilterButton";
import NoFoundComponent from "../../components/NoFoundComponent";




//COMPONENET
import FilterPropertiesForm from "../../components/forms/FilterPropertiesForm";
import OrderProperty from "../../components/OrderProperty";
import useFilterForm from "../../hooks/useFilterForm";
import { GET_PROPERTIES } from "../../graphql/queries";


import {
  StyledPaperLarge,
  StyledPaper,
} from "../../styles/DrawerStyles";

const useStyles = makeStyles((theme) => ({
    root: {
    margin: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 340,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: 'black'
  },
  propertyCard: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  addButton: {
    position: 'fixed',
    bottom: 100,
    right: 25,
    color: '#4CAF50',
    padding: 0,
  },
  addIcon: {
    width: 60,
    height: 60,
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
}))

function AllAdminPropertiesPage({ data }){

  const classes = useStyles();
  const [errors, setErrors] = useState();
  const pageNumber = useRef(1);
  const [properties, setProperties] = useState(data);
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
      reset()
      resetPageNumber();

    }

    setShowOrderComponent(false)
    setShowFilterComponent(false)
    console.log(variables)

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
        <Paper className={classes.root} elevation={0}>
          <InputBase
            id="search"
            name="search"
            type="text"
            className={classes.input}
            placeholder='Buscar Propiedad'
            value={filterProperty.values.search}
            onChange={filterProperty.handleChange}
            onKeyPress={(e)=>{if(e.key === 'Enter' ) handleSubmit(e)}}
            variant='outlined'
          />
          <IconButton type="submit" className={classes.iconButton}
            onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>
        </Paper>

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

      {stateNoFound ? (
        <NoFoundComponent search={filterProperty.values.search} />
      ) : (
        properties.map((property) => {
          return (
            <div
              key={property._id}
              className={classes.propertyCard}
            >
              <AdminPropertyCard 
                property={property}
              />
            </div>
          );
        })
      )}

        <IconButton href='/admin1/propiedades/post-propiedad' className={classes.addButton}>
          <AddCircleIcon className={classes.addIcon} />
        </IconButton>
        <NavBar />
    </div>
  )
}

// Codigo a utilizar cuando se arregle el problema de autorizacion
export async function getStaticProps(){
  const { data } = await client.query({
    query: GET_ADMIN_PROPERTIES,
    variables: {
      pagination: {
        pageNumber: 1
      }
    }
  })

  if (!data)
    return {
      props: {
        error: "Error",
      },
    }

  return {
    props: {
      data: data.getAdminProperties
    }
  }
}

export default AllAdminPropertiesPage