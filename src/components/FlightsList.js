'use client'
import React, { useState, memo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import FlightCard from './FlightCard';
import PreviousFlights from './PreviousFlights';
import { fetchFlights, filterNextData, getDateNow, getDayMonth, getDayParamApiURL, getMainApiURL, getRouteParamApiURL } from '@/helpers/helper';
import { useSearchParams } from 'next/navigation';
import {FlightCardSpinner} from './Spinner';

const jsonTime = getDateNow();

const FlightCardDepertures = memo(function FlightCardDepertures({ flightDirection }) {

    const params = useSearchParams();
    
    const [flights, setFlights] = useState([]);
    const [displayPrev, setDisplayPrev] = useState('none');
    const [shownPrevData, setShownPrevData] = useState(0);
    const [shownNextData, setShownNextData] = useState(50);

    const nextPage = useRef(0);

    let today = getDayMonth(jsonTime);
    let API_URL = getMainApiURL(flightDirection,nextPage.current,jsonTime);

    if(params.has('day')) {
        today = getDayMonth(params.get('day'));
        const day = params.get('day').slice(0,10)
        API_URL = getDayParamApiURL(flightDirection,nextPage.current,day)

    }else if(params.has('route')) {
        const route = params.get('route')
        API_URL = getRouteParamApiURL(flightDirection,route, jsonTime);

    }

    const { data } = useQuery({
        queryKey: ['flights', nextPage.current],
        queryFn: async () => {
            const data = await fetchFlights(API_URL);

            if(data[data.length-1].last){
                const unique = filterNextData(data.slice(0,data.length-2), flights);

                setFlights([...flights, ...unique]);
                return data;
            }

            const unique = filterNextData(data.slice(0,data.length-2), flights);

            setFlights([...flights, ...unique]);

            if (flights.length < shownNextData + 50) {
                nextPage.current = nextPage.current + 1;
            }

            return data;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,

    });

    const getNextData = async () => {
        setShownNextData(shownNextData+50);
        nextPage.current = nextPage.current + 1;
    }

    const getPreviousData = async () => {
        setShownPrevData(shownPrevData + 50)
        setDisplayPrev('list-item');
    }

    if (flights.length <= 0) {
        return <FlightCardSpinner /> 
    }

    return (
        <>
            {params.has('day') ? '' : <button className='w-full min-w h-12 mb-5 bg-white border-2 shadow-lg hover:shadow-xl ' onClick={() => getPreviousData()}>Show Earlier Flights</button>}
            <div className='h-12'>
                <p className='font-bold text-lg'>{}{today}</p>
            </div>
            <ul>
                <PreviousFlights display={displayPrev} shownPrevData={shownPrevData} jsonTime= {jsonTime} flightDirection= {flightDirection} /> 
                {flights.slice(0, shownNextData).map((flight) => <FlightCard flight={flight} key={flight.id} flightDirection= {flightDirection} />)}
            </ul>
            <button className='w-full min-w h-12 mb-5 bg-white border-2 shadow-lg ' onClick={() => getNextData()}>Show Next Flights</button>
        </>

    );
})

export default FlightCardDepertures;