import { gql } from "@apollo/client";

export const GET_ALL_CLIENTS = gql`
  query getClients {
    getClients {
      id
      name
      birthday
      gender
      contact {
        email
        phone
      }
      location {
        state
        city
        address
      }
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      birthday
      gender
      contact {
        email
        phone
      }
      location {
        city
        state
        address
      }
    }
  }
`;

export const GET_PROPERTIES = gql`
  query getProperties(
    $zone: String
    $type: String
    $status: String
    $city: String
    $search: String
    $price: PriceInput
    $area: AreaInput
    $priceOrder:Float
    $areaOrder:Float
    $limit:Float
    $offset:Float
  ) {
    getProperties(
      filter:{
      zone: $zone
      type: $type
      status: $status
      city: $city
      search: $search
      price: $price
      area: $area
      }
      order:{
        price:$priceOrder
        area:$areaOrder
      }
      pagination:{
        limit:$limit
        offset:$offset
      }
    ){
    _id
    status
    type
    zone
    area
    location {
      state
      city
      address
    }
    price
    currency
    specialPrice
    onPayments
    media {
      images
    }

  }
  }
  
`;
