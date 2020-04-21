# Contact Tracing on Stationary Devices

A [Node](https://nodejs.org/)-based implementation of Bluetooth contact-tracing. 

Compatible with the [Android BLE protocol specified by TCN Coalition](https://github.com/TCNCoalition/TCN#tcn-sharing-with-bluetooth-low-energy), and the [joint protocol announced by Apple & Google](https://covid19-static.cdn-apple.com/applications/covid19/current/static/contact-tracing/pdf/ContactTracing-BluetoothSpecificationv1.1.pdf).

There are two primary motivations:

1) To enable more controllable testing & simulation of Bluetooth-based contact-tracing

2) To allow stationary devices in public locations (e.g stores, restaurants, businesses) to participate in and supplement mobile contact-tracing systems 


## Prepare

**Ubuntu / Debian / Raspbian**

    sudo apt-get update
    sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev

Tested on Raspberry Pi Zero W (ARMv6l) with Raspbian 9 (Stretch) & on Ubuntu Desktop 18 (Bionic Beaver)

**Mac (Scanning Only)** 

Install [XCode](https://itunes.apple.com/ca/app/xcode/id497799835)

Tested on MacOS 10.15 (Catalina)


## Install

    npm install


## Run

    sudo node contact-tracing.js

With optional arguments:

    sudo node contact-tracing.js <TYPE> <FORMAT>

**TYPE** ( Default : `tcn` ) : Specifies which Bluetooth procol to use
- `cds` : Contact Detection Service ( Apple & Google )
- `tcn` : Temporary Contact Number  ( TCN Coalition )

**FORMAT** ( Default : `hex` ) : Specifies which output format to use when logging the rolling 128-bit identifier
- `hex` : e.g. `00112233445566778899aabbccddeeff`
- `base64` : e.g. `ABEiM0RVZneImaq7zN3u/w==`

NOTE : Default for **TYPE** will be switched to `cds` in an upcoming version, once Apple & Google officially release their contact tracing SDK