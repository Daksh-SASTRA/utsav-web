"use client"
import React, { useState } from 'react'
import styles from './allevents.module.css'
import Link from 'next/link'
import EventsData from '@/components/config/EventsData.json'


const AllEvents = () => {
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [activebt, setActiveBt] = useState('All');

    const filteredEvents = selectedDepartment === 'All'
        ? EventsData
        : EventsData.filter(e => e.dept === selectedDepartment);

    const departmentEvents = EventsData.filter(e => (e.dept !== 'Technotainment' && e.dept !== 'Gaming'))
    const techEvents = EventsData.filter(e => e.dept === 'Technotainment')
    const gamingEvents = EventsData.filter(e => e.dept === 'Gaming')


    return (
        <div className={`${styles.scontainer}`}>
            <div className={`${styles.scheduleHeadingMain} ${styles.flexCenter}`} >
                EVENTS
            </div>
            <div className={`${styles.daybuttons}`}>
                <a className={activebt == 'All' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('All'); setActiveBt('All'); }}>ALL</a>
                <a className={activebt == 'SoC' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('SoC'); setActiveBt('SoC'); }}>SoC</a>
                <a className={activebt == 'SEEE' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('SEEE'); setActiveBt('SEEE'); }}>SEEE</a>
                <a className={activebt == 'SoME' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('SoME'); setActiveBt('SoME'); }}>SoME</a>
                <a className={activebt == 'SoCE' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('SoCE'); setActiveBt('SoCE'); }}>SoCE</a>
                <a className={activebt == 'SCBT' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('SCBT'); setActiveBt('SCBT'); }}>SCBT</a>
                <a className={activebt == 'Technotainment' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('Technotainment'); setActiveBt('Technotainment'); }}>Technotainment</a>
                <a className={activebt == 'Gaming' ? styles.daybuttons__buttonactive : styles.daybuttons__button} onClick={() => { setSelectedDepartment('Gaming'); setActiveBt('Gaming'); }}>Gaming</a>
            </div>
            <div className={`${styles.eventsContainer}`}>
                {activebt == 'All' ?
                    <div className={`${styles.econ}`}>
                        <div className={`${styles.eventsContainer}`}>
                            {departmentEvents && departmentEvents.map((e, i) => {
                                return (
                                    <div key={i} className={`${styles.eventContainer}`}>
                                        <Link href={`/events/${e.eventId}`}>
                                            <p className={`${styles.eventName}`}>{e.title}</p>
                                            <p>Team : {e.dept}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={`${styles.hrstyle}`} ></div>
                        <div className={`${styles.eventsContainer}`}>
                            {techEvents && techEvents.map((e, i) => {
                                return (
                                    <div key={i} className={`${styles.eventContainer}`}>
                                        <Link href={`/events/${e.eventId}`}>
                                            <p className={`${styles.eventName}`}>{e.title}</p>
                                            <p>Team : {e.dept}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={`${styles.hrstyle}`} >
                            <br />
                        </div>
                        <div className={`${styles.eventsContainer}`}>
                            {gamingEvents && gamingEvents.map((e, i) => {
                                return (
                                    <div key={i} className={`${styles.eventContainer}`}>
                                        <Link href={`/events/${e.eventId}`}>
                                            <p className={`${styles.eventName}`}>{e.title}</p>
                                            <p>Team : {e.dept}</p>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    : filteredEvents && filteredEvents.map((e, i) => {
                        return (
                            <div key={i} className={`${styles.eventContainer}`}>
                                <Link href={`/events/${e.eventId}`}>
                                    <p className={`${styles.eventName}`}>{e.title}</p>
                                    <p>Team : {e.dept}</p>
                                </Link>
                            </div>
                        )
                    })}

            </div>


        </div>

    )
}

export default AllEvents


