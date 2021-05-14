import { useState } from 'react'
import MenuBar from '../components/bars/MenuBar'
// <<<<<<< Updated upstream
// import { makeStyles } from '@material-ui/core/styles'

// import PropertyCard from '../components/cards/PropertyCard'
// import ZoneButton from '../components/buttons/ZoneButton'

// const useStyles = makeStyles(({
//   root: {
//     margin: 0,
//     padding: 0,
//   },
//   img: {
//     display: 'block',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     marginBottom: 10,
//     width: '100%',
//     maxWidth: 766,
//     height: 200,
//     borderRadius: '0px 0px 15px 15px',
//   },
//   scrollmenu: {
//     display: 'flex',
//     overflowX: 'hidden',
//     overflowY: 'auto',
//     whiteSpace: 'nowrap'
//   }, 
// }))


// // Propiedades destacadas
// // La imagen principal 
// function Home(){

//   const classes = useStyles()

//   const properties = [
//     {
//       id: 1,
//       status: 'Venta',
//       zone: 'Comercial',
//       images: ['https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg'],
//       area: '4000',
//       address: 'Loma Tova',
//       city: 'Tecate',
//       state: 'B.C',
//       price: '68,000',
//       currency:'USD',
//       specialPrice: '72x $978 USD',
//     }, 
//     {
//       id: 2,
//       status: 'Renta',
//       zone: 'Urbana',
//       images: ['https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg'],
//       area: '4000',
//       address: 'Loma Tova',
//       city: 'Tecate',
//       state: 'B.C',
//       price: '68,000',
//       currency:'USD',
//       specialPrice: '72x $978 USD',
//     }, 
//     {
//       id: 3,
//       status: 'Venta',
//       zone: 'Campestre',
//       images: ['https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg'],
//       area: '4000',
//       address: 'Loma Tova',
//       city: 'Tecate',
//       state: 'B.C',
//       price: '68,000',
//       currency:'USD',
//       specialPrice: '72x $978 USD',
//     }, 
//   ]

//   return (
//     <div>
//       <MenuBar/>
//         <img 
//           className={classes.img}
//           src='https://cdn1.matadornetwork.com/blogs/2/2019/05/Tecate1-1200x853.jpg' 
//           alt='baby yoda'
//         />
//         <ZoneButton 
//           href='#'
//           text='Zona Comercial'
//         />
//         <PropertyCard 
//           orientation='vertical'
//           property={properties[0]}
//         />
//         <ZoneButton 
//           href='#'
//           text='Zona Urbana'
//         />
//         <PropertyCard 
//           orientation='vertical'
//           property={properties[1]}
//         />
//         <ZoneButton 
//           href='#'
//           text='Zona Campestre'
//         />
//         <PropertyCard 
//           orientation='vertical'
//           property={properties[2]}
//         />
//     </div>
// =======
import FilterPropertiesForm from "../components/forms/FilterPropertiesForm"
import { Button, Slide, Collapse, Fade } from '@material-ui/core'
import OrderFilterButton from "../components/buttons/OrderFilterButton"
import OrderProperty from '../components/OrderProperty'
import TicketForm from "../components/forms/TicketForm"
// Propiedades destacadas
// La imagen principal 
const Home = () => {
  const [use, setUse] = useState(false)

  return (
    <div >
      <MenuBar />
      {/* <Button onClick={() => { setUse(!use) }}>Hola</Button>
      <Collapse in={use} >
        {<FilterPropertiesForm />}
      </Collapse>
      <OptionProperty></OptionProperty>
      {/* <OrderFilterButton/> */}
      {/* <TicketForm/> */}
      {/* <OptionTicket stateComponent={true}/> */}
    <OrderProperty/>

    </div>
  )
}

export default Home