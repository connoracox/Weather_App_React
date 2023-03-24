import { useEffect, useState, useContext } from "react";
import City from '../components/City'
import CityForm from "../components/CityForm";
import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'


export default function Home() {
  const { favorites } = useContext(DataContext)
  const { user } = useContext(AuthContext)
  console.log(favorites, "from Home Page")
  return (
    
      <div>
        
          <h1>Home</h1>
          {/* {
              (user.loggedIn) ?
              // <CityForm />
              :
              <></>
          } */}
          { favorites? favorites.map((city) => <City city={city} key={city.id} />): <></> }
      </div>
  )
}
