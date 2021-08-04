
import { useFormik } from "formik";
const useFilterForm = (initialValues) => {
  const dataDefault = {
    search: "",
    zone: "",
    type: "",
    status: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    priceOrder: "",
    areaOrder: "",

  };
  const filterProperty = useFormik({
    initialValues: initialValues ? initialValues : dataDefault,
    //validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (values.minPrice > values.maxPrice) {
        errors.minPrice = "Error en los precios minimo";
        errors.maxPrice = "Error en los precios maximo";
      }
      if (values.minArea > values.maxArea) {
        errors.minArea = "Error en la area minimo";
        errors.maxArea = "Error en la area maximo";
      }
      return errors;
    },
  });

  function updateOrderPrice  (value){
    filterProperty.setFieldValue(
      "priceOrder",
      filterProperty.values.orderPrice === value ? "" : value
    );
    filterProperty.setFieldValue("areaOrder", "");
    
  };
  function updateOrderArea (value){
    filterProperty.setFieldValue(
      "areaOrder",
      filterProperty.values.orderArea === value ? "" : value
    );
    filterProperty.setFieldValue("priceOrder", "");
    }
  function resetFilterPropertyValues() {
    filterProperty.setFieldValue("city", "");
    filterProperty.setFieldValue("status", "");
    filterProperty.setFieldValue("type", "");
    filterProperty.setFieldValue("zone", "");
    filterProperty.setFieldValue("minPrice", "");
    filterProperty.setFieldValue("maxPrice", "");
    filterProperty.setFieldValue("minPrice", "");
    filterProperty.setFieldValue("maxPrice", "");
    filterProperty.setFieldValue("priceOrder", "");
    filterProperty.setFieldValue("areaOrder", "");
  }
  function getFilterParamsQuery() {
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

  return { filterProperty, updateOrderPrice,updateOrderArea,resetFilterPropertyValues ,getFilterParamsQuery};
};

export default useFilterForm;
