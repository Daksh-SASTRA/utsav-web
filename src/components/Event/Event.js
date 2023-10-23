'use client'
import React, { useEffect, useState } from 'react'
import styles from './event.module.css'
import eventsData from '@/components/config/EventsData.json'

const Event = ({ eventId }) => {

    const [eventData, setEventData] = useState({});

    useEffect(() => {
        const filteredEvent = eventsData.find((event) => event.eventId === eventId);
        setEventData(filteredEvent);
    }, []);

    return (
        <div className={`${styles.econtainer}`}>
            <div className={`${styles.eventHeadingMain} ${styles.flexCenter}`} >
                {eventData ? eventData.title : null}
            </div>
            <div className={`${styles.eventCard}`} >
                <div className={`${styles.eventImage}`}>
                    <img src="https://picsum.photos/500" />
                </div>
                <div className={`${styles.eventDesc}`}>
                    <p> {eventData ? eventData.desc : null}</p>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices nisi quis cursus. Maecenas id auctor dui. Vivamus ut consectetur arcu, nec accumsan urna. Aenean eleifend tempor odio sit amet tincidu.</p> */}
                    <a className={`${styles.register_btn} ${styles.flexCenter}`}>Register</a>
                </div>
            </div>

        </div>
    )
}



export default Event