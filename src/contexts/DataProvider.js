import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, getDoc, addDoc } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const [weatherData, setWeatherData] = useState({})
    const [loadingState, setLoadingState] = useState("LOADING")
    const [cityName, setCityName] = useState("")
    const [currSearch, setCurrSearch] = useState(null)
    const [favorites, setFavorites] = useState([])
    const db = getFirestore()
    const { user } = useContext(AuthContext)

    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        async function getFavorites() {
            const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'cities'))
            const loadedCities = []
            querySnapshot.forEach((doc) => {
                loadedCities.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setFavorites(loadedCities)
        }
        getFavorites()
    }, [user.uid])
    console.log(favorites)

    async function getFavorite(cityName) {
        const docRef = doc(db, 'cities', cityName)
        const docSnap = await getDoc(docRef)
        // if(!docSnap.exists()) {
        //     throw new error
        // }
        return docSnap.data()
    }
        
    async function getWeatherData(cityName) {
        console.log(cityName, 'from getWeatherData')
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&units=imperial&appid=${API_KEY}`)
        const data = await response.json()
        setWeatherData(data)
        return data
    }

    async function addCity(cityName) {
        const newCity = {
            cityName
        }
        const docRef = await addDoc(collection(db, 'users', user.uid, 'cities'), newCity)
        return newCity
    }

    const value = {
        weatherData,
        getWeatherData,
        favorites,
        addCity
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}