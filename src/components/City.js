import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function City(props) {
    const { getWeatherData, weatherData } = useContext(DataContext)
    // console.log(weatherData.name)
    console.log(props, 'from city comp')
    // console.log(props.city.temp)

    return (
        <div className="city">
            <h2>{props.city.cityName}</h2>
                {props.title && props.city.weather?
                <div><h2 className='resultCityName'>{props.city.name}</h2>
                <h3 className='resultCond'>{(props.city.weather[0].main)} </h3>
                <p className='resultTemp'>{Math.round(props.city?.main.temp)}℉ </p>
                <h3 className='resultCond'>{(props.city.weather[0].main)} </h3>
                <h3 className='resultCond'>Low: {Math.round(props.city.main.temp_min)}℉ </h3>
                <h3 className='resultCond'>High: {Math.round(props.city.main.temp_max)}℉ </h3>
                <h3 className='resultCond'>Humidity: {(props.city.main.humidity)}%</h3> </div> : <></>}

                {
                    (props.hideLink) ?
                    <></> :
                    <Link to={ `/weather/${props.city.cityName}`} city = {props.city}>Weather Details</Link>
                }
        </div>
    )
}