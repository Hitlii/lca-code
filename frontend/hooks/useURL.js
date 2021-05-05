import { useFormik } from 'formik'
import * as yup from 'yup'

const useURL = () => {
  const validationSchema = yup.object({
      URL: yup 
        .string()
        .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Ingresa un URL válido'),
    })

    const URL = useFormik({
      initialValues: {
        URL: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values)
      }
    })

    return {
        URL,
    }
}

export default useURL