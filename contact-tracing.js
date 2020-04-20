/* Bluetooth Contact Tracing Protocol */
/* Run: sudo node contact-tracing.js <cds|tcn> <hex|base64> */


const bleno = require( '@abandonware/bleno' )  // BLE Advertiser Library
const noble = require( '@abandonware/noble' )  // BLE Scanner Library
const uuid  = require( 'uuid' )   // UUID Generator Library


var service  = {
  cds : 'fd6f', // Contact Detection Service ( Apple & Google )
  tcn : 'c019'  // Temporary Contact Number  ( TCN Coalition )
}
var services = Object.values( service )
var timeout  = null


/* Optional Command Line Arguments */

var type   = process.argv[2] == 'cds' ? 'cds' : 'tcn'
var format = process.argv[3] == 'base64' ? 'base64' : 'hex'


/* Raw Ad Packet :    [  Flags |  Service  |  Data...  ] */

var ad = Buffer.from( [ 2, 1, 6, 3, 3, 0, 0, 19, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] )


/* Bluetooth Advertiser */

bleno.on( 'stateChange', state => {
  log( 'Bluetooth Advertiser is: ' +  state )
  if ( state === 'poweredOn' ) {
    roll()
  } else {
    bleno.stopAdvertising()
    clearTimeout( timeout )
  }
} )

bleno.on( 'advertisingStart', _ => {
  log( 'Advertised ' +  ad.toString( format, 11 ) )
} )

var roll = _ => {
  uuid.v4( null, ad, 11 )
  ad[5] = ad[9] = parseInt( service[ type ], 16 ) & 255
  ad[6] = ad[10] = parseInt( service[ type ], 16 ) >> 8
  bleno.startAdvertisingWithEIRData( ad )
  timeout = setTimeout( roll, 15 * 60 * 1000 )
}


/* Bluetooth Scanner */

noble.on( 'stateChange', state => {
  log( 'Bluetooth Scanner is: ' +  state )
  if ( state === 'poweredOn' ) {
    noble.startScanning( services, false )
  } else {
    noble.stopScanning()
  }
} )

noble.on( 'discover', peripheral => {
  if ( peripheral.advertisement.serviceData ) {
    peripheral.advertisement.serviceData.forEach( data => {
      if ( services.includes( data.uuid ) ) {
        log( 'Discovered ' + data.data.toString( format ) )
      }
    } )
  }
} )


/* Helper Functions */

var log = text => text && console.log( new Date().toUTCString(), text )

