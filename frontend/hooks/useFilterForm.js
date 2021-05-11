import React from "react";
import { useFormik } from "formik";
const useFilterForm = () => {
  const filterProperty = useFormik({
    initialValues: {
      zone: "",
      type: "",
      statu: "",
      city: "",
      price: [0,100],
      area: { min: "", max: "" },
    },
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const zones = ["urbana", "campestre", "comercial"];
  const types = ["terreno", "casa", "rancho"];
  const status = ["venta", "renta"];
  const cities = ["tecate", "ensenada", "rosarito", "tijuana", "mexicali"];

  return { filterProperty, zones, types, status, cities };
};

export default useFilterForm;
