import { useFormik } from 'formik'
import * as yup from 'yup'

const useMetaInfo = () => {
    const validationSchema = yup.object({
        title: yup 
            .string()
            .required('Título es requerido')
            .max(55, 'Muy largo!'),
        description: yup 
            .string() 
            .required('Meta descripción es requerida.')
            .max(160, 'Muy largo!'),
        URL: yup 
            .string()
            .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Ingresa un URL válido'),
      
    })

    const metaInfo = useFormik({
      initialValues: {
        title: '',
        description: '',
        URL: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values)
      }
    })

    return {
        metaInfo,
    }
}

export default useMetaInfo