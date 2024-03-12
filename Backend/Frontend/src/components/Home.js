import React from "react"
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation()
    console.log(location);
    return (
        <div className="homepage">

            <h1>Hello {location.state.email} </h1>
            <h1>Welcome to the Home</h1>

        </div>
    )
}
export default Home