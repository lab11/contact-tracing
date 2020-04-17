/* Bluetooth Contact Tracing Protocol */

const bleno = require( 'bleno' )  // BLE Advertiser Library
const noble = require( 'noble' )  // BLE Scanner Library
const uuid  = require( 'uuid' )   // UUID Generator Library

var service  = {
  cds : 'fd6f', // Contact Detection Service ( Apple & Google )
  tcn : 'c019'  // Temporary Contact Number  ( TCN Coalition )
}
var services = Object.values( service )
