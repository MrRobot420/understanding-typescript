import { GOOGLE_API_KEY } from "../config"
import axios from 'axios'

const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

type GoogleGeocodingResponse = { 
    results: { geometry: { location: { lat: number, long: number } } }[]
    status: 'OK' | 'ZERO_RESULTS'
}


function searchAddressHandler(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value

    const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`

    axios.get<GoogleGeocodingResponse>(API_URL).then(response => {
        if (response.data.status !== 'OK') {
            throw new Error('Could not fetch location!')
        }
        const coordinates = response.data.results[0].geometry.location
    }).catch(err => {
        console.log(err)
    })
}

form.addEventListener('submit', searchAddressHandler)