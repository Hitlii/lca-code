import React, { useState, useRef } from "react";



import client from "../../lib/apollo-client";
import { GET_PROPERTIES } from "../../graphql/queries";



import OrderFilterPropertiesForm from '../../components/OrderFilterPropertiesForm';
export default function AllPropertiesPage(props) {

   return (
    <div>
     <OrderFilterPropertiesForm propertiesData={props.propertiesData} isAdmin={false}/>
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
