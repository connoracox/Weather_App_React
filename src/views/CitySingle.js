import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import City from '../components/City'

export default function CitySingle(props) {
    const { id } = useParams()
    console.log(id, 'city single id')
    const[city, setCity] = useState({})
    const API_KEY = process.env.REACT_APP_API_KEY
    console.log(props, 'city')

    useEffect(() => {
        async function getCity() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${id.toLowerCase()}&units=imperial&appid=${API_KEY}`)
            const data = await response.json()
            setCity(data)
            console.log(city, 'after useeffect')
        }
        getCity()
    }, [])
    
    return (
        <div>
            <h1>City Single: { id }</h1>
            
            {city? <City city={city} title= {'single'} /> : ""}
        </div>
    )
}
