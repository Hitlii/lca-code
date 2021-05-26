import { gql } from "@apollo/client";

export const GET_ALL_CLIENTS = gql`
  query getClients {
    getClients {
      _id
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
    getClient(_id: $id) {
      _id
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
    $priceOrder: Float
    $areaOrder: Float
    $pageNumber: Float!
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
        pageNumber: $pageNumber
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

export const GET_ADMIN_PROPERTIES = gql
`
  query getAdminProperties(
    $zone: String
    $type: String
    $status: String
    $city: String
    $search: String
    $area: AreaInput
    $price: PriceInput
    $pagination: PropertyPaginationInput!
  ) {
    getAdminProperties(
      filter:{
      zone: $zone
      type: $type
      status: $status
      city: $city
      search: $search
      area: $area
      price: $price
      }
      pagination: $pagination
    ){
      _id
      code
      zone
      isFeatured
      area
      location {
        state
        city
        address
      }
      meta{
        url
      }
      media{
        images
      }
    }
  }
`
export const GET_ADMIN_PROPERTY = gql 
`
  query getAdminProperty(
    $url: String!
  ) {
    getAdminProperty(url: $url) {
      _id
      status
      media {
        images
      }
      location {
        address
        city
        state
      }
      vendors {
        _id
        name
        gender
        birthday
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
      tickets {
        _id
        clients {
          _id
        name
        gender
        birthday
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
    }
  }
`