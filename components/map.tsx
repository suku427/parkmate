// 'use client'

// import { buildMapInfoCardContent, buildMapInfoCardContentForDestination, destinationPin, getStreetFromAddress, libs, parkingPin, parkingPinWithIndex } from "@/lib/utils"
// import { MapAddressType, MapParams } from "@/types"
// import { useJsApiLoader } from "@react-google-maps/api"
// import { useEffect, useRef } from "react"

// function Map({ mapParams }: { mapParams: string}) {

//     const params = JSON.parse(mapParams) as MapParams[]
//     let infoWindow: google.maps.InfoWindow

//     const { isLoaded } = useJsApiLoader({
//         nonce: "477d4456-f7b5-45e2-8945-5f17b3964752",
//         googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
//         libraries: libs
//     })

//     const mapRef = useRef<HTMLDivElement>(null)

//     const getPinType = (loc: MapParams): string => {
//         return loc.type === MapAddressType.DESTINATION ? 'parking_destination_tr' : 'parking_pin_tr'
//     }
//     useEffect(() => {
//         if (isLoaded) {
//             const mapOptions = {
//                 center: {
//                     lat: params[0].gpscoords.lat,
//                     lng: params[0].gpscoords.lng
//                 },
//                 zoom: 14,
//                 mapId: 'MY-MAP-ID-1234'
//             }

//             const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions)

//             setMarker(gMap)

//         }
//     },[isLoaded])

//     function setMarker(map: google.maps.Map) {
//         infoWindow = new google.maps.InfoWindow({
//             maxWidth: 200
//         })

//         params.map((loc, index) => {

//             const marker = new google.maps.marker.AdvancedMarkerElement({
//                 map: map,
//                 position: loc.gpscoords,
//                 title: loc.address
//             })

//             if (loc.type === MapAddressType.PARKINGLOCATION) {
//                 marker.setAttribute("content", buildMapInfoCardContent(getStreetFromAddress(loc.address),
//                 loc.address,
//                 loc.numberofspots as number,
//                 loc.price?.hourly as number))

//                 marker.content = parkingPinWithIndex(getPinType(loc), index).element
//             } else if(loc.type === MapAddressType.ADMIN) {
//                 marker.setAttribute("content", buildMapInfoCardContent(getStreetFromAddress(loc.address),
//                 loc.address,
//                 loc.numberofspots as number,
//                 loc.price?.hourly as number))

//                 marker.content = parkingPin(getPinType(loc)).element
//             } else {
//                 const cityCircle = new google.maps.Circle({
//                     strokeColor: '#00FF00',
//                     strokeOpacity: 0.8,
//                     strokeWeight: 2,
//                     fillColor: '#0FF000',
//                     fillOpacity: 0.35,
//                     map,
//                     center: {
//                         lat: params[0].gpscoords.lat,
//                         lng: params[0].gpscoords.lng
//                     },
//                     radius: loc.radius
//                 })

//                 marker.content = destinationPin(getPinType(loc)).element
//                 marker.setAttribute("content", buildMapInfoCardContentForDestination(getStreetFromAddress(loc.address), loc.address))
//             }

//             marker.addListener('click', () => {
//                 infoWindow.close()
//                 infoWindow.setContent(marker.getAttribute('content'))
//                 infoWindow.open({
//                     map,
//                     anchor: marker
//                 })
//             })
//         })
//     }

//     return (
//         <div className="flex flex-col space-y-4">
//             {
//                 isLoaded ? <div style={{ height: '600px'}} ref={mapRef} /> : <p>Loading...</p>
//             }
//         </div>
//     )
// }

// export default Map

// 'use client'

// import { buildMapInfoCardContent, buildMapInfoCardContentForDestination, getStreetFromAddress } from "@/lib/utils"
// import { MapAddressType, MapParams } from "@/types"
// import L from "leaflet"
// import "leaflet/dist/leaflet.css"
// import { useEffect, useRef } from "react"

// function Map({ mapParams }: { mapParams: string }) {

//     const params = JSON.parse(mapParams) as MapParams[]
//     const mapRef = useRef<HTMLDivElement>(null)
//     let mapInstance: L.Map | null = null

//     const getPinType = (loc: MapParams): string => {
//         return loc.type === MapAddressType.DESTINATION ? 'parking_destination_tr' : 'parking_pin_tr'
//     }

//     useEffect(() => {
//         if (mapRef.current && !mapInstance) {
//             // Initialize the map
//             mapInstance = L.map(mapRef.current).setView([params[0].gpscoords.lat, params[0].gpscoords.lng], 14)

//             // Add OpenStreetMap tile layer
//             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 maxZoom: 19,
//             }).addTo(mapInstance)

//             // Add markers to the map
//             setMarkers(mapInstance)
//         }

//         return () => {
//             if (mapInstance) {
//                 mapInstance.remove()
//             }
//         }
//     }, [])

//     // function setMarkers(map: L.Map) {
//     //     params.forEach((loc, index) => {
//     //         const marker = L.marker([loc.gpscoords.lat, loc.gpscoords.lng]).addTo(map)

//     //         let popupContent = ""

//     //         if (loc.type === MapAddressType.PARKINGLOCATION || loc.type === MapAddressType.ADMIN) {
//     //             popupContent = buildMapInfoCardContent(getStreetFromAddress(loc.address), loc.address, loc.numberofspots as number, loc.price?.hourly as number)
//     //         } else {
//     //             popupContent = buildMapInfoCardContentForDestination(getStreetFromAddress(loc.address), loc.address)
//     //             L.circle([loc.gpscoords.lat, loc.gpscoords.lng], {
//     //                 color: 'green',
//     //                 fillColor: '#0FF000',
//     //                 fillOpacity: 0.35,
//     //                 radius: loc.radius
//     //             }).addTo(map)
//     //         }

//     //         marker.bindPopup(popupContent)
//     //     })
//     // }
//     function setMarkers(map: L.Map) {
//         params.forEach((loc) => {
//             const marker = L.marker([loc.gpscoords.lat, loc.gpscoords.lng]).addTo(map);
    
//             let popupContent = "";
    
//             if (loc.type === MapAddressType.PARKINGLOCATION || loc.type === MapAddressType.ADMIN) {
//                 popupContent = buildMapInfoCardContent(
//                     getStreetFromAddress(loc.address),
//                     loc.address,
//                     loc.numberofspots as number,
//                     loc.price?.hourly as number
//                 );
//             } else {
//                 popupContent = buildMapInfoCardContentForDestination(
//                     getStreetFromAddress(loc.address),
//                     loc.address
//                 );
    
//                 // Check if radius is defined before creating the circle
//                 if (loc.radius !== undefined) {
//                     L.circle([loc.gpscoords.lat, loc.gpscoords.lng], {
//                         color: 'green',
//                         fillColor: '#0FF000',
//                         fillOpacity: 0.35,
//                         radius: loc.radius // Use radius here since we've checked for undefined
//                     }).addTo(map);
//                 } else {
//                     console.warn(`Radius is undefined for location: ${loc.address}`);
//                 }
//             }
    
//             marker.bindPopup(popupContent);
//         });
//     }
    

//     return (
//         <div className="flex flex-col space-y-4">
//             <div style={{ height: '600px' }} ref={mapRef}></div>
//         </div>
//     )
// }

// export default Map
'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { buildMapInfoCardContent, buildMapInfoCardContentForDestination, destinationPin, parkingPin, parkingPinWithIndex } from "@/lib/utils"
import { MapAddressType, MapParams } from "@/types"
import { getStreetFromAddress } from "@/lib/utils"; 

// Set the Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

function Map({ mapParams }: { mapParams: string }) {
    const params = JSON.parse(mapParams) as MapParams[];
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mapOptions = {
            container: mapRef.current as HTMLDivElement, // Reference to the map container
            style: 'mapbox://styles/mapbox/streets-v11', // Choose a style
            center: [params[0].gpscoords.lng, params[0].gpscoords.lat] as [number, number], // Set center of the map as a tuple
            zoom: 14,
        };

        const map = new mapboxgl.Map(mapOptions);

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Set markers on the map
        setMarkers(map);

        return () => map.remove(); // Cleanup on unmount
    }, []);

    function setMarkers(map: mapboxgl.Map) {
        params.forEach((loc, index) => {
            const markerElement = document.createElement('div');
            markerElement.className = getPinType(loc); // Get appropriate pin type
            const marker = new mapboxgl.Marker(markerElement)
                .setLngLat([loc.gpscoords.lng, loc.gpscoords.lat] as [number, number]) // Ensure this is a tuple
                .addTo(map);

            const popupContent = buildMapInfoCardContent(getStreetFromAddress(loc.address), loc.address, loc.numberofspots as number, loc.price?.hourly as number);
            const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
                .setHTML(popupContent)
                .setMaxWidth("200px");

            marker.setPopup(popup); // Set popup on marker

            // Show the popup when marker is hovered
            markerElement.addEventListener('mouseenter', () => {
                popup.addTo(map);
            });

            // Hide the popup when mouse leaves the marker
            markerElement.addEventListener('mouseleave', () => {
                popup.remove();
            });
        });
    }

    const getPinType = (loc: MapParams): string => {
        return loc.type === MapAddressType.DESTINATION ? 'parking_destination_tr' : 'parking_pin_tr';
    };

    return (
        <div className="flex flex-col space-y-4">
            <div style={{ height: '600px' }} ref={mapRef} />
        </div>
    );
}

export default Map;


