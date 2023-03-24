import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../contexts/DataProvider'


export default function Weather() {
    const [loadingState, setLoadingState] = useState("LOADING")
    const [cityName, setCityName] = useState("Stamford")
    const [currSearch, setCurrSearch] = useState(null)
    const { getWeatherData, weatherData, addCity } = useContext(DataContext)
    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        async function handleWeather() {
            const data = await getWeatherData(cityName)
            console.log(data, "from weather file")
            setLoadingState("LOADED")
        }
        handleWeather()
    }, [cityName])

    function handleSearch(e) {
        e.preventDefault()
        setCityName(currSearch)
        console.log('test')
    }

    return (
        <div className='weatherApp'>
            <div className='searchDiv'>
                <form onSubmit={(e) => handleSearch(e) }>
                    <input type="text" 
                    className='searchBar'
                    placeholder='Search City...'
                    name='city' 
                    id='city' 
                    onChange={(e) => setCurrSearch(e.target.value)} />
                    <button className='searchBtn'>Search</button>
                </form>
            </div>
            {
                (loadingState === "LOADING") ?
                <p>Loading...</p> :
                <div className="weather">
                    <h2 className='resultCityName'>{weatherData?.name}</h2>
                    <p className='resultTemp'>{Math.round(weatherData?.main.temp)}℉ </p>
                    <h3 className='resultCond'>{(weatherData?.weather[0].main)} </h3>
                    <h3 className='resultCond'>Low: {Math.round(weatherData?.main.temp_min)}℉ </h3>
                    <h3 className='resultCond'>High: {Math.round(weatherData?.main.temp_max)}℉ </h3>
                    <h3 className='resultCond'>Humidity: {(weatherData?.main.humidity)}%</h3> */
                    <button className='addCityBtn' onClick={() => addCity(weatherData)}>Add City</button>
                </div>
            }
            
        </div>
    )
}