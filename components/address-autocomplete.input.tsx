
// import { LatLng } from '@/types'
// import React, { useEffect, useRef, useState } from 'react'
// import { useJsApiLoader } from '@react-google-maps/api'
// import { libs } from '@/lib/utils'
// import { Input } from './ui/input'

// type AddressAutoCompleteInputProps = {
//     onAddressSelect: (address: string, gpscoords: LatLng) => void,
//     selectedAddress?: string
// }   

// function AddressAutoCompleteInput({
//     onAddressSelect, selectedAddress
// } : AddressAutoCompleteInputProps) {

//     const [autoComplete, setAutoComplete] = 
//     useState<google.maps.places.Autocomplete | null>(null)

//     const { isLoaded } = useJsApiLoader({
//         nonce: "477d4456-f7b5-45e2-8945-5f17b3964752",
//         googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
//         libraries: libs
//     })

//     const placesAutoCompleteRef = useRef<HTMLInputElement>(null)

//     useEffect(() => {

//         if (isLoaded) {
//             const ontarioBounds = new google.maps.LatLngBounds(
//                 new google.maps.LatLng({ lat: 48.4026688, lng: -89.4053302 }), // south west
//                 new google.maps.LatLng({ lat: 54.3666786, lng: -82.5269667 }) // north east
//             )

//             const gAutoComplete  = new google.maps.places.Autocomplete(placesAutoCompleteRef.current as HTMLInputElement, {
//                 bounds: ontarioBounds,
//                 fields: ['formatted_address', 'geometry'],
//                 componentRestrictions: {
//                     country: ['ca']
//                 }
//             })

//             gAutoComplete.addListener('place_changed', () => {
//                 const place = gAutoComplete.getPlace()
//                 const position = place.geometry?.location
//                 onAddressSelect(place.formatted_address!, {
//                     lat: position?.lat()!,
//                     lng: position?.lng()!
//                 })
//             })
//         }
//     }, [isLoaded])

//     useEffect(() => {
//         // https://github.com/radix-ui/primitives/issues/1859
//         // Disable Radix ui dialog pointer events lockout
//         setTimeout(() => (document.body.style.pointerEvents = ""), 0)
//     })

//   return (
//     <Input ref={placesAutoCompleteRef} defaultValue={selectedAddress} />
//   )
// }

// export default AddressAutoCompleteInput
// import { LatLng } from '@/types'
// import L from 'leaflet'
// import 'leaflet-control-geocoder'
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
// import { useEffect, useRef, useState } from 'react'
// import { Input } from './ui/input'

// type AddressAutoCompleteInputProps = {
//     onAddressSelect: (address: string, gpscoords: LatLng) => void,
//     selectedAddress?: string
// }

// function AddressAutoCompleteInput({
//     onAddressSelect, selectedAddress
// }: AddressAutoCompleteInputProps) {

//     const [geocoder, setGeocoder] = useState<any>(null) // For Leaflet geocoder
//     const placesAutoCompleteRef = useRef<HTMLInputElement>(null)

//     useEffect(() => {
//         if (!geocoder) {
//             // Initialize the Leaflet Control Geocoder (using Nominatim API)
//             const leafletGeocoder = L.Control.Geocoder.nominatim()

//             // Set the geocoder in state for later use
//             setGeocoder(leafletGeocoder)
//         }
//     }, [])

//     const handlePlaceChange = async () => {
//         const address = placesAutoCompleteRef.current?.value
//         if (address && geocoder) {
//             // Use Nominatim API via leaflet-control-geocoder to fetch GPS coordinates
//             geocoder.geocode(address, (results: any) => {
//                 if (results && results.length > 0) {
//                     const result = results[0]
//                     const gpscoords = {
//                         lat: result.center.lat,
//                         lng: result.center.lng
//                     }

//                     // Call onAddressSelect with the address and GPS coordinates
//                     onAddressSelect(result.name, gpscoords)
//                 }
//             })
//         }
//     }

//     useEffect(() => {
//         // Disable Radix UI dialog pointer events lockout
//         setTimeout(() => (document.body.style.pointerEvents = ""), 0)
//     })

//     return (
//         <Input
//             ref={placesAutoCompleteRef}
//             defaultValue={selectedAddress}
//             onChange={handlePlaceChange}
//             placeholder="Enter address"
//         />
//     )
// }

// export default AddressAutoCompleteInput
// import { LatLng } from '@/types'
// import L from 'leaflet'
// import 'leaflet-control-geocoder'
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
// import { useEffect, useRef, useState } from 'react'
// import { Input } from './ui/input'

// type AddressAutoCompleteInputProps = {
//     onAddressSelect: (address: string, gpscoords: LatLng) => void,
//     selectedAddress?: string
// }

// function AddressAutoCompleteInput({
//     onAddressSelect, selectedAddress
// }: AddressAutoCompleteInputProps) {

//     const [geocoder, setGeocoder] = useState<any>(null) // For Leaflet geocoder
//     const placesAutoCompleteRef = useRef<HTMLInputElement>(null)

//     useEffect(() => {
//         if (!geocoder) {
//             // Initialize the Leaflet Control Geocoder (using Nominatim API)
//             const leafletGeocoder = L.Control.Geocoder.nominatim()
//             setGeocoder(leafletGeocoder)
//         }
//     }, [])

//     const handlePlaceChange = async () => {
//         const address = placesAutoCompleteRef.current?.value
//         if (address && geocoder) {
//             geocoder.geocode(address, (results: any) => {
//                 if (results && results.length > 0) {
//                     const result = results[0]
//                     const gpscoords = {
//                         lat: result.center.lat,
//                         lng: result.center.lng
//                     }
//                     onAddressSelect(result.name, gpscoords)
//                 }
//             })
//         }
//     }

//     useEffect(() => {
//         setTimeout(() => (document.body.style.pointerEvents = ""), 0)
//     })

//     return (
//         <Input
//             ref={placesAutoCompleteRef}
//             defaultValue={selectedAddress}
//             onChange={handlePlaceChange}
//             placeholder="Enter address"
//         />
//     )
// }

// export default AddressAutoCompleteInput
import { LatLng } from '@/types';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Input } from './ui/input';

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;

type AddressAutoCompleteInputProps = {
    onAddressSelect: (address: string, gpscoords: LatLng) => void;
    selectedAddress?: string;
};

function AddressAutoCompleteInput({
    onAddressSelect, selectedAddress
}: AddressAutoCompleteInputProps) {
    const placesAutoCompleteRef = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<{ name: string; coords: LatLng }[]>([]);

    const handlePlaceChange = async () => {
        const address = placesAutoCompleteRef.current?.value;
        if (address) {
            try {
                // Fetch suggestions from Mapbox Geocoding API
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`);
                const data = await response.json();

                if (data.features && data.features.length > 0) {
                    const results = data.features.map((feature: any) => ({
                        name: feature.place_name,
                        coords: {
                            lat: feature.center[1],
                            lng: feature.center[0]
                        }
                    }));
                    setSuggestions(results);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Error fetching address suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionSelect = (suggestion: { name: string; coords: LatLng }) => {
        placesAutoCompleteRef.current!.value = suggestion.name;
        onAddressSelect(suggestion.name, suggestion.coords);
        setSuggestions([]); // Clear suggestions after selection
    };

    useEffect(() => {
        // Disable Radix UI dialog pointer events lockout
        setTimeout(() => (document.body.style.pointerEvents = ""), 0);
    }, []);

    return (
        <div>
            <Input
                ref={placesAutoCompleteRef}
                defaultValue={selectedAddress}
                onChange={handlePlaceChange}
                placeholder="Enter address"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AddressAutoCompleteInput;
