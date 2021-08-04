import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients ($name:String){
    getClients(name:$name) {
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

export const GET_FEATURED_PROPERTIES = gql` 
 query getFeaturedProperties{
  getFeaturedProperties{
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
    meta{
      url
    }
    
  }
}
`

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
    meta {
      url
    }
  }
}
  
`;



export const GET_ADMIN_PROPERTIES = gql`
  query getAdminProperties(
    $zone: String
    $type: String
    $status: String
    $city: String
    $search: String
    $price: PriceInput
    $area: AreaInput
    $pageNumber: Float!
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
      pagination:{
        pageNumber: $pageNumber
      }
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
export const GET_ADMIN_PROPERTY = gql `
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
        area
        price
        currency
        emissionDate
        promissory {
          months
          payment
        }
        paymentLocation
        paymentAddress
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

export const GET_PROPERTY = gql`
  query getProperty($url: String!) {
    getProperty(url: $url) {
      property {
      _id
      price
      specialPrice
      type
      area
      description {
        text
        isDeeded
        hasAllServices
      }
      code
      media {
        video
        images
      }
      location {
        city
        state
        address
        coordinates{
          lat
          lng
        }
      }
      vendors {
        gender
        birthday
        name
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
      meta {
        url
        description
      }
      isFeatured
    }
    relatedProperties {
      _id
      status
      type
      zone
      area
      specialPrice
      onPayments
      price
      currency
      location {
        state
        city
        address
      }
      media {
        images
      }
      meta {
        url
      }
    }
    }
      
  }
`

export const GET_TICKET = gql`
  query getTicket($_id: ID!) {
    getTicket(_id: $_id) {
      _id 
      propertyId
      status
      area
      price
      currency
  	  emissionDate
      promissory{
        months
        payment
      }
      paymentLocation
      paymentAddress
      clients{
        _id
        name
      }
    }
  }
`

export const GET_ALL_PROPERTIES = gql`
  query getAllProperties($isAdminCard: Boolean) {
    getAllProperties(isAdminCard: $isAdminCard) {
      _id
      meta {
        url
      }
    }
  }
`