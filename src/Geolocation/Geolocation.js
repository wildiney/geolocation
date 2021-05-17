import { db } from '../firebase'
import { useEffect } from 'react'

function Geolocation() {

    useEffect(() => {
        function getPosition() {
            console.log("getting position")
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const position = { date: new Date().toLocaleString(), latitude: pos.coords.latitude, longitude: pos.coords.longitude }
                    db.collection('locations').add(position)
                    console.log(position)
                })
            }
        }

        const hours = new Date().getHours()
        let interval

        if (hours > 15 && hours < 19) {
            interval = setInterval(getPosition, 5 * 60 * 1000)
        } else if (hours > 8 && hours < 11) {
            interval = setInterval(getPosition, 5 * 60 * 1000)
        } else {
            interval = setInterval(() => console.log("out of time"), 15 * 60 * 1000)
        }

        return () => { clearInterval(interval) }
    }, [])

    return (<></>)

}

export default Geolocation