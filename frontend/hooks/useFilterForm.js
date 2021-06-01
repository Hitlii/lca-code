
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

  return { filterProperty, resetFilterPropertyValues };
};

export default useFilterForm;
