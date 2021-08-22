import { useFormik } from 'formik'
import * as yup from 'yup'

// /**
//     @description This functions handles the validation of property form.
//  */
// function propertyValidator(){

//     // Genral Info 
//     const propertyValidationSchema = yup.object({
//         code: yup 
//             .string()
//             .required('Este campo es requerido')
//             .max(15, 'Muy largo!'),
//         status: yup
//             .string(),
//         zone: yup
//             .string(),
//         type: yup 
//             .string(),

//         // Price Area
//         currency: yup
//             .string(),
//         price: yup
//             .number(),
//         specialPrice: yup 
//             .string()
//             .max(20, 'Muy largo, trate de reducir este campo'),
//         paymentPrice: yup 
//             .string()
//             .max(20, 'Muy largo, trate de reducir este campo'),
//         area: yup 
//             .number()
//             .required('Área es requerida'),

//         // Location  
//         state: yup
//             .string(),
//         city: yup
//             .string(),
//         address: yup
//             .string()
//             .max(20,'Muy largo:( Trate de reducir este campo'),
//               title: yup 
//             .string()
//             .required('Este campo es requerido')
//             .max(55, 'El titulo es muy largo, trate de hacerlo mas chico'),
//         description: yup 
//             .string() 
//             .required('Este campo es requerido.')
//             .max(160, 'La descripción es muy larga, trate de hacerla mas chica'),
        

//     })

//     // Price and area
//     const priceAreaSchema = yup.object({
//         currency: yup
//             .string()
//             .required('Divisa es requerida'),
//         price: yup
//             .number()
//             .required('Precio es requerido'),
//         specialPrice: yup 
//             .string()
//             .max(20, 'Muy largo, trate de reducir este campo'),
//         paymentPrice: yup 
//             .string()
//             .max(20, 'Muy largo, trate de reducir este campo'),
//         area: yup 
//             .number()
//             .required('Área es requerida')
//     })

//     // Location 
//     const locationSchema = yup.object({
//         state: yup
//             .string()
//             .required('Este campo es requerido'),
//         city: yup
//             .string()
//             .required('Este campo es requerido'),
//         address: yup
//             .string()
//             .required('Este campo es requerido')
//             .max(20,'Muy largo:( Trate de reducir este campo')
//     })

//     // Metadata
//     const metaSchema = yup.object({
//         title: yup 
//             .string()
//             .required('Este campo es requerido')
//             .max(55, 'El titulo es muy largo, trate de hacerlo mas chico'),
//         description: yup 
//             .string() 
//             .required('Este campo es requerido.')
//             .max(160, 'La descripción es muy larga, trate de hacerla mas chica'),
//         slug: yup 
//             .string()
//             .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//             'Esto no parece un URL'),
//     })

//     // Formik.
   

//     return propertyValidationSchema;





// }


 const propertyValidationSchema = yup.object({
        code: yup 
            .string()
            .required('Este campo es requerido')
            .max(15, 'Muy largo!'),
        status: yup
            .string()
            .required(),
        zone: yup
            .string()
            .required(),
        type: yup 
            .string()
            .required(),

        // Price Area
        currency: yup
            .string(),
        price: yup
            .number(),
        specialPrice: yup 
            .string()
            .max(20, 'Muy largo, trate de reducir este campo'),
        onPayments: yup 
            .string()
            .max(20, 'Muy largo, trate de reducir este campo'),
        area: yup 
            .number()
            .positive('El area debe de ser positiva'),

        // Location  
        city: yup
            .string(),
        address: yup
            .string()
            .max(20,'Muy largo:( Trate de reducir este campo'),
        title: yup 
            .string()
            .max(70, 'El titulo es muy largo, trate de hacerlo mas chico'),
        description: yup 
            .string() 
            .max(160, 'La descripción es muy larga, trate de hacerla mas chica'),
        images: yup
            .string()
            .required(),

        video: yup
        .string()
        .url('En este campo debe de ir un URL')
        

    })
export {
    propertyValidationSchema
    };