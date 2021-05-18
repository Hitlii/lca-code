import React from "react";
import { useFormik } from "formik";
const useFilterForm = () => {
  const filterProperty = useFormik({
    initialValues: {
      search:"",
      zone: "",
      type: "",
      status: "",
      city: "",
      price: { minPrice:'', maxPrice: '' },
      area: { minArea: '', maxArea: '' },
      orderPrice:'',
      orderArea:'',
    },
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    validate:values=>{
      let errors ={}
      if(values.price.minPrice>values.price.maxPrice){
        errors.minPrice='Error en los precios minimo'
        errors.maxPrice='Error en los precios maximo'
      }
      if(values.area.minArea>values.area.maxArea){
        errors.minArea='Error en la area minimo'
        errors.maxArea='Error en la area maximo'
        
      }
      return errors
    }
  });
  function resetFilterPropertyValues(){
    filterProperty.setFieldValue("city", "");
    filterProperty.setFieldValue("status", "");
    filterProperty.setFieldValue("type", "");
    filterProperty.setFieldValue("zone", "");
    filterProperty.setFieldValue("price.minPrice", "");
    filterProperty.setFieldValue("price.maxPrice", "");
    filterProperty.setFieldValue("price.minPrice", "");
    filterProperty.setFieldValue("price.maxPrice", "");
  }

  return {filterProperty,resetFilterPropertyValues};
};

export default useFilterForm;
