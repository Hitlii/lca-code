import { useFormik } from 'formik'
import * as yup from 'yup'

const useDescription = () => {
  const validationSchema = yup.object({
      title: yup 
        .string()
        .required('Título es requerido')
        .max(70, 'Muy largo!'),
      
    })

    const description = useFormik({
      initialValues: {
        title: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values)
      }
    })

    return {
        description,
    }
}

export default useDescription