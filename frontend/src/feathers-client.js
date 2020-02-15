import feathers from '@feathersjs/feathers'
// import rest from '@feathersjs/rest-client'
// import axios from 'axios'
import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
import feathersVuex from 'feathers-vuex'

const socket = io('http://' + window.location.hostname + ':3030', { transports: ['websocket'] })
// const apiUrl = process.env.API_URL
// console.log(window.location.hostname)
// let restClient = rest(apiUrl)
// const transport = restClient.axios(axios)

const feathersClient = feathers()
//  .configure(transport)
  .configure(socketio(socket))

export default feathersClient

// Setting up feathers-vuex
const { makeServicePlugin, BaseModel, models, FeathersVuex } = feathersVuex(
  feathersClient,
  {
    idField: 'id' // Must match the id field in your database table/collection
  }
)

export { makeServicePlugin, BaseModel, models, FeathersVuex }
