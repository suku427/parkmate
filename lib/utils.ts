// import { Library } from "@googlemaps/js-api-loader"
// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export const libs: Library[] = ['core', 'maps', 'places', 'marker']

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


// export function formatAmountForDisplay(
//   amount: number, currency: string
// ): string {

//   let numberFormat = new Intl.NumberFormat(['en-US'], {
//     style:'currency',
//     currency: currency,
//     currencyDisplay: 'symbol'
//   })

//   const formatedAmount = numberFormat.format(amount)
//   return formatedAmount === 'NaN' ? '' : formatedAmount
// }

// export function formatAmountForStripe(
//   amount: number,
//   currency: string
// ): number {

//   let numberFormat = new Intl.NumberFormat(['en-US'], {
//     style:'currency',
//     currency: currency,
//     currencyDisplay: 'symbol'
//   })

//   const parts = numberFormat.formatToParts(amount)
//   let zeroDecimalCurrency: boolean = true

//   for (let part of parts) {
//     if (part.type === 'decimal') {
//       zeroDecimalCurrency = false
//     }
//   }

//   return zeroDecimalCurrency ? amount : Math.round(amount * 100)
// }


// export function getStreetFromAddress(address: string) {
//   return address.split(',')[0]
// }

// /// google maps
// export const buildMapInfoCardContent = (title: string, address: string, totalSpots: number, price: number)
// : string => {

//   return `
//     <div class="map_infocard_content">
//       <div class="map_infocard_title">${title}</div>
//       <div class="map_infocard_body">
//       <div>${address}</div>
//       <hr />
//       <div>Total spots: ${totalSpots}</div>
//       <div>Hourly price: ${formatAmountForDisplay(price, 'CAD')}</div>
//       </div>
      
//   </div>
//   `
// }

// export const buildMapInfoCardContentForDestination = (title: string, address: string): string => {
//   return `
//   <div class="map_infocard_content">
//       <div class="map_infocard_title">${title}</div>
//       <div class="map_infocard_body">
//       <div>${address}</div>
//       </div>
      
//   </div>`;
// }

// export const parkingPin = (type: string) => {
//   const glyphImg = document.createElement('div')
//   glyphImg.innerHTML = `
//     <div class="map_pin_container">
//       <img src='http://localhost:3000/${type}.png' />
//     </div>
//   `

//   const pinElement = new google.maps.marker.PinElement({
//     glyph: glyphImg
//   })

//   return pinElement
// }

// export const parkingPinWithIndex = (type: string, index: number) => {
//   const glyphImg = document.createElement('div')
//   glyphImg.innerHTML = `
//     <div class="map_pin_container">
//       <div class="map_pin_id"><span>${index}</span></div>
//       <img src='http://localhost:3000/${type}.png' />
//     </div>
//   `

//   const pinElement = new google.maps.marker.PinElement({
//     glyph: glyphImg
//   })

//   return pinElement
// }

// export const destinationPin = (type: string) => {
//   const glyphImg = document.createElement('img');
//   glyphImg.src = `http://localhost:3000/${type}.png`;
//   const pinElement = new google.maps.marker.PinElement({
//       glyph: glyphImg
//   })

//   return pinElement
// }

// export type ReturnType = {
//   time: string,
//   display: string
// }
// export function getTimeSlots(startTime = "00:00", endTime="23:45"): ReturnType[] {
//   const timeArray : ReturnType[] = []
//   const parsedStartTime: Date = new Date(`2000-01-01T${startTime}:00`)
//   const parsedEndTime: Date = new Date(`2000-01-01T${endTime}:00`)

//   let currentTime: Date = parsedStartTime
//   while (currentTime <= parsedEndTime) {
//     const hours = currentTime.getHours().toString().padStart(2, "0")
//     const minutes = currentTime.getMinutes().toString().padStart(2, "0")
//     const ampm = currentTime.getHours() < 12 ? "AM" : "PM"
//     const timeString = `${hours}:${minutes} ${ampm}`
//     timeArray.push({
//       time: `${hours}:${minutes}`,
//       display: timeString
//     })

//     currentTime.setMinutes(currentTime.getMinutes() + 30)
//   }

//   return timeArray
// }
// import { LatLng } from "@/types"
// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
// import L from 'leaflet'

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function formatAmountForDisplay(
//   amount: number, currency: string
// ): string {

//   let numberFormat = new Intl.NumberFormat(['en-US'], {
//     style: 'currency',
//     currency: currency,
//     currencyDisplay: 'symbol'
//   })

//   const formattedAmount = numberFormat.format(amount)
//   return formattedAmount === 'NaN' ? '' : formattedAmount
// }

// export function formatAmountForStripe(
//   amount: number,
//   currency: string
// ): number {

//   let numberFormat = new Intl.NumberFormat(['en-US'], {
//     style: 'currency',
//     currency: currency,
//     currencyDisplay: 'symbol'
//   })

//   const parts = numberFormat.formatToParts(amount)
//   let zeroDecimalCurrency: boolean = true

//   for (let part of parts) {
//     if (part.type === 'decimal') {
//       zeroDecimalCurrency = false
//     }
//   }

//   return zeroDecimalCurrency ? amount : Math.round(amount * 100)
// }

// export function getStreetFromAddress(address: string) {
//   return address.split(',')[0]
// }

// /// OSM/Leaflet map functions

// export const buildMapInfoCardContent = (title: string, address: string, totalSpots: number, price: number): string => {
//   return `
//     <div class="map_infocard_content">
//       <div class="map_infocard_title">${title}</div>
//       <div class="map_infocard_body">
//       <div>${address}</div>
//       <hr />
//       <div>Total spots: ${totalSpots}</div>
//       <div>Hourly price: ${formatAmountForDisplay(price, 'CAD')}</div>
//       </div>
//     </div>
//   `
// }

// export const buildMapInfoCardContentForDestination = (title: string, address: string): string => {
//   return `
//     <div class="map_infocard_content">
//       <div class="map_infocard_title">${title}</div>
//       <div class="map_infocard_body">
//       <div>${address}</div>
//       </div>
//     </div>`;
// }

// // Function to create parking marker icon with Leaflet
// export const parkingPin = (type: string) => {
//   return L.icon({
//     iconUrl: `http://localhost:3000/${type}.png`,
//     iconSize: [32, 32], // Adjust the size of the icon as needed
//     iconAnchor: [16, 32], // Anchor point of the icon
//     popupAnchor: [0, -32] // Where the popup should open relative to the icon
//   })
// }

// // Function to create parking marker with index label
// export const parkingPinWithIndex = (type: string, index: number) => {
//   const markerHtml = `
//     <div class="map_pin_container">
//       <div class="map_pin_id"><span>${index}</span></div>
//       <img src='http://localhost:3000/${type}.png' />
//     </div>
//   `

//   return L.divIcon({
//     html: markerHtml,
//     className: 'custom-marker', // Optional class for custom styling
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32]
//   })
// }

// export const destinationPin = (type: string) => {
//   return L.icon({
//     iconUrl: `http://localhost:3000/${type}.png`,
//     iconSize: [32, 32], // Adjust the size of the icon
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32]
//   })
// }

// // Function to generate time slots for scheduling
// export type ReturnType = {
//   time: string,
//   display: string
// }
// export function getTimeSlots(startTime = "00:00", endTime="23:45"): ReturnType[] {
//   const timeArray : ReturnType[] = []
//   const parsedStartTime: Date = new Date(`2000-01-01T${startTime}:00`)
//   const parsedEndTime: Date = new Date(`2000-01-01T${endTime}:00`)

//   let currentTime: Date = parsedStartTime
//   while (currentTime <= parsedEndTime) {
//     const hours = currentTime.getHours().toString().padStart(2, "0")
//     const minutes = currentTime.getMinutes().toString().padStart(2, "0")
//     const ampm = currentTime.getHours() < 12 ? "AM" : "PM"
//     const timeString = `${hours}:${minutes} ${ampm}`
//     timeArray.push({
//       time: `${hours}:${minutes}`,
//       display: timeString
//     })

//     currentTime.setMinutes(currentTime.getMinutes() + 30)
//   }

//   return timeArray
// }
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set your access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VrdW1hcjciLCJhIjoiY20yaGxwNW40MDZoazJtczNsY3R2czcxdiJ9.gnwJydNZmh0C_eGkEBDBAw'

// Utility to merge Tailwind classes
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Format the amount for display
export function formatAmountForDisplay(amount: number, currency: string): string {
    const numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol'
    })

    const formattedAmount = numberFormat.format(amount)
    return formattedAmount === 'NaN' ? '' : formattedAmount
}

// Format amount for Stripe (handles zero-decimal currencies)
export function formatAmountForStripe(amount: number, currency: string): number {
    const numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol'
    })

    const parts = numberFormat.formatToParts(amount)
    let zeroDecimalCurrency = true

    for (let part of parts) {
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false
        }
    }

    return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

// Get street from address (using the first part of the address)
export function getStreetFromAddress(address: string) {
    return address.split(',')[0]
}

// Mapbox: Build popup content for Parking Locations or Admin type
export const buildMapInfoCardContent = (
    title: string,
    address: string,
    totalSpots: number,
    price: number
): string => {
    return `
        <div class="map_infocard_content">
            <div class="map_infocard_title">${title}</div>
            <div class="map_infocard_body">
                <div>${address}</div>
                <hr />
                <div>Total spots: ${totalSpots}</div>
                <div>Hourly price: ${formatAmountForDisplay(price, 'CAD')}</div>
            </div>
        </div>
    `
}

// Mapbox: Build popup content for Destinations
export const buildMapInfoCardContentForDestination = (title: string, address: string): string => {
    return `
        <div class="map_infocard_content">
            <div class="map_infocard_title">${title}</div>
            <div class="map_infocard_body">
                <div>${address}</div>
            </div>
        </div>
    `
}

// Create a custom Mapbox marker element (replacing Google Maps pin functionality)
export const parkingPin = (type: string) => {
    const pinElement = document.createElement('div')
    pinElement.className = 'map_pin_container'
    pinElement.innerHTML = `<img src='http://localhost:3000/${type}.png' alt="Parking Pin"/>`
    return new mapboxgl.Marker({ element: pinElement })
}

// Create a custom Mapbox marker with an index
export const parkingPinWithIndex = (type: string, index: number) => {
    const pinElement = document.createElement('div')
    pinElement.className = 'map_pin_container'
    pinElement.innerHTML = `
        <div class="map_pin_id"><span>${index}</span></div>
        <img src='http://localhost:3000/${type}.png' alt="Parking Pin"/>
    `
    return new mapboxgl.Marker({ element: pinElement })
}

// Create a custom Mapbox marker for Destinations
export const destinationPin = (type: string) => {
    const pinElement = document.createElement('div')
    pinElement.className = 'map_pin_container'
    pinElement.innerHTML = `<img src='http://localhost:3000/${type}.png' alt="Destination Pin"/>`
    return new mapboxgl.Marker({ element: pinElement })
}

// Function to get time slots (same functionality as before)
export type ReturnType = {
    time: string,
    display: string
}

export function getTimeSlots(startTime = "00:00", endTime = "23:45"): ReturnType[] {
    const timeArray: ReturnType[] = []
    const parsedStartTime: Date = new Date(`2000-01-01T${startTime}:00`)
    const parsedEndTime: Date = new Date(`2000-01-01T${endTime}:00`)

    let currentTime: Date = parsedStartTime
    while (currentTime <= parsedEndTime) {
        const hours = currentTime.getHours().toString().padStart(2, "0")
        const minutes = currentTime.getMinutes().toString().padStart(2, "0")
        const ampm = currentTime.getHours() < 12 ? "AM" : "PM"
        const timeString = `${hours}:${minutes} ${ampm}`
        timeArray.push({
            time: `${hours}:${minutes}`,
            display: timeString
        })

        currentTime.setMinutes(currentTime.getMinutes() + 30)
    }

    return timeArray
}
