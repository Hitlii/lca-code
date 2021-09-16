import React, { useState, useRef } from "react";

import Head from 'next/head'
import Pixel from '../../components/Pixel'
import client from "../../lib/apollo-client";
import { GET_PROPERTIES } from "../../graphql/queries";



import OrderFilterPropertiesForm from '../../components/OrderFilterPropertiesForm';
export default function AllPropertiesPage(props) {

 
   return (
    <div>
      <Head>
            <title>Buscar Propiedades</title>
            <meta name="description" content="Encuentra tu propiedad ideal, ya sea en zona campestre, comercial o urbana."/>
      </Head>
      <Pixel name='FACEBOOK_PIXEL_1'/>
      <main role="main">
        <OrderFilterPropertiesForm propertiesData={props.propertiesData} isAdmin={false}/>
      </main>
    </div>

  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PROPERTIES,
    variables: { pageNumber: 1 },
  });

  if (!data)
    return {
      props: {
        error: "Error",
      },
    };   
  return {
    props: {
      propertiesData: data.getProperties,
    },
  };
}
