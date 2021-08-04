import React, { useState, useRef } from "react";

// Material UI Imports ------------------------------

import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FilledInput from '@material-ui/core/FilledInput'
import InputAdornment from '@material-ui/core/InputAdornment'

import {
  IconButton,
  Drawer,
  Typography,
  Paper,
  InputBase
} from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import OrderFilterButton from "../OrderFilterButton";
import NoFoundIcon from "../NoFoundIcon";
//ICONS
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

//COMPONENET
import FilterPropertiesForm from "../FilterPropertiesForm";
import PropertyCard from "../PropertyCard";
import OrderPropertyForm from "../OrderPropertiesForm";
import useFilterForm from "../../hooks/useFilterForm";

import AdminPropertyCard from '../AdminPropertyCard'
//STYLE
import {
  StyledPaperLarge,
  StyledPaper,
} from "../../styles/DrawerStyles";



// Graph QL Imports ------------------------------

import client from "../../lib/apollo-client";
import { GET_PROPERTIES,GET_ADMIN_PROPERTIES } from "../../graphql/queries";
import {useStyles} from './styles';


export default function OrderFilterPropertiesForm({propertiesData,isAdmin}) {
    const classes = useStyles();
    const [errors, setErrors] = useState();
    const pageNumber = useRef(1);
    const [properties, setProperties] = useState(propertiesData);
    const [statePageNumber, setStatePageNumber] = useState(1);
    const [stateNoFound, setStateNoFound] = useState(false);
    const { filterProperty, updateOrderPrice,updateOrderArea, resetFilterPropertyValues,getFilterParamsQuery} = useFilterForm();
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
      let variables = getFilterParamsQuery();
  
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
      if(isAdmin){
        const { data } = await client.query({
          query: GET_ADMIN_PROPERTIES,
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
      }else{
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
    }
  
  
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
    const resetStateButton = () => {
      setStateZonesButton([false, false, false]);
      setStateTypeButton([false, false, false]);
      setStateStatusButton([false, false]);
      setStateCitiesButton([false, false, false, false, false]);
      resetFilterPropertyValues();
    };
  
  
  
    async function handleSubmit(e) {
      e.preventDefault();
      let variables = getFilterParamsQuery();
      variables.pageNumber = 1;
      
      if(isAdmin){
        const { data } = await client.query({
          query: GET_ADMIN_PROPERTIES,
          variables,
        });
        pageNumber.current = 1;
    
        if (data.getAdminProperties.length) {
          setProperties(data.getAdminProperties);
          setStateNoFound(false);
        } else {
          setStateNoFound(true);
          resetStateButton()
          resetPageNumber();
        }
      }else{
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
          resetStateButton()
          resetPageNumber();
        }
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
        

        {/* admin search input */}
        {isAdmin ? <Grid item xs={12} className={classes.inputBox}>
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
        </Grid>
        :''}

        {/* client search input */}
        {!isAdmin ? 
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
                onKeyPress={(e)=>{if(e.key === 'Enter' ) handleSubmit(e)}}
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
        </Grid>:''}
        

        
        <Grid item xs={12}>
          <span>{stateNoFound? 0: properties?properties.length:0} resultado(s) </span>
          <Divider/>
        </Grid>
      </Grid>
        
  
        <Grid container justify="center" >
        {stateNoFound ? (
          <NoFoundIcon search={filterProperty.values.search} />
        ) : (
          properties.map((property) => {
            return (
              <Grid item xs={12} className={classes.cards} key={property._id}>
              {isAdmin ? 
              <AdminPropertyCard property={property}/>
              :
              <PropertyCard
                orientation="horizontal"
                property={property}
              />}
              </Grid>
            );
          })
        )}
        </Grid>
  
        {/* componente de siguiente pagina */}
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
        ) : ''}
        
        {!stateNoFound ? (
          <Typography className={classes.errorMessage}>
            {errors ? errors.properties : ""}
          </Typography>
        ) : ''}
  
  
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
              reset={resetStateButton}
            />
          </Drawer>
  
          <Drawer
            PaperProps={{ component: StyledPaper }}
            anchor="bottom"
            open={showOrderComponent}
            onClose={onCloseOrderComponent}
          >
            <OrderPropertyForm
              orderPrice={filterProperty.values.priceOrder}
              orderArea={filterProperty.values.areaOrder}
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
  
