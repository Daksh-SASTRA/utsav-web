"use client"
import React, { useState } from 'react'
import styles from './schedule.module.css'
import Link from 'next/link'
import ScheduleData from '@/components/config/ScheduleData.json'


const Schedule = () => {
    const [day, setDay] = useState(1);
    const [activebt, setActiveBt] = useState(1);


    return (
        <div className={`${styles.scontainer}`}>
            <div className={`${styles.scheduleHeadingMain} ${styles.flexCenter}`} >
                SCHEDULE
            </div>
            <div className={`${styles.daybuttons}`}>
                <a className={activebt == 1 ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setDay(1); setActiveBt(1); }}>Day 1</a>
                <a className={activebt == 2 ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setDay(2); setActiveBt(2); }}>Day 2</a>
            </div>
            <div className={`${styles.scheduleContainer}`}>
                {day == 1 || 2 ?

                    (ScheduleData && ScheduleData[day].events.map((e, i) => {
                        return (
                            <div key={i} className={`${styles.eventContainer}`}>
                                <Link href={`/events/${e.eventId}`}>
                                    <p className={`${styles.eventName}`}>{e.eventname}</p>
                                    <p>Time</p>
                                    <p>Venue</p>
                                </Link>
                            </div>
                        )
                    }))
                    : <div> no events</div>
                }
            </div>

        </div>

    )
}

export default Schedule


