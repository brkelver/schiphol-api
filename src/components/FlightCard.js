import Link from 'next/link';
import React from 'react';
import airlines from 'public/airlines.json'
import airports from 'public/airports.json'
import { getAirline, getAirport } from '@/helpers/helper';
import { arrivingFlightStatuses, departingFlightStatuses } from '@/helpers/helper';

function FlightCard({flight, display = 'list-item', flightDirection}) {
    return (
        <li style={{display:display}}>
            <Link href={flightDirection === 'D' ? `/departures/${flight.id}?id=${flight.id}`: `/arrivals/${flight.id}?id=${flight.id}`}>
                <div className='flex justify-between w-full min-w p-8 mb-5 border-2 bg-white items-center shadow-md hover:shadow-xl group rounded-lg'>
                    <p className='font-bold text-lg w-1/3'>{(flight.scheduleTime).slice(0,-3)}</p>
                    <div className='underline-offset-4 group-hover:underline w-1/3 px-8'>
                        <p className='font-medium text-lg'>{getAirport(airports,flight.route.destinations[0])} ({flight.route.destinations[0]})</p>
                        <p>{flight.prefixIATA} {flight.flightNumber} {getAirline(airlines,flight.prefixIATA)}</p>
                    </div>
                    <div className='flex min-w-[30%] justify-between w-1/3'>
                        <p className='p-2 bg-[#0061FE] text-white rounded-md'>{flightDirection === 'D' ? (departingFlightStatuses[flight.publicFlightState.flightStates[0]]).toUpperCase() : arrivingFlightStatuses[flight.publicFlightState.flightStates[0]]}</p>
                        <p className='text-[#0061FE]'>Details</p>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default FlightCard;