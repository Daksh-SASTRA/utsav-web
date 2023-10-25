'use client'
import React, { useEffect, useState } from 'react'
import styles from './event.module.css'
import eventsData from '@/components/config/EventsData.json'

const Event = ({ eventId }) => {

    const [eventData, setEventData] = useState({});
    const [showLinkPreview, setShowLinkPreview] = useState(false);

    // const handlePreviewClick = () => {
    //     setShowLinkPreview(true);
    // };

    // const handlePreviewClose = () => {
    //     setShowLinkPreview(false);
    // };

    useEffect(() => {
        const filteredEvent = eventsData.find((event) => event.eventId === eventId);
        setEventData(filteredEvent);
    }, []);

    return (
        <div className={`${styles.econtainer}`}>
            {showLinkPreview ? 
                <div className={`${styles.linkpreview}`}>
                    <iframe
                        title="Link Preview"
                        src={eventData.register_link}
                        width="100%"
                        height="500px" // Adjust the height as needed
                    ></iframe>
                    <a className={`${styles.close_btn} ${styles.flexCenter}`} onClick={handlePreviewClose}>Close</a>
                </div>
            
            :
                <>
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
                            <a className={`${styles.register_btn} ${styles.flexCenter}`} href={eventData.register_link} target="_blank" >Register</a>

                        </div>
                    </div>
                </>
            }

        </div>
    )
}



export default Event