import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import FlightCard from './FlightCard';
import { fetchFlights, filterData, getMainApiURL } from '@/helpers/helper';

function PreviousFlights({ display, shownPrevData, flightDirection, jsonTime}) {

    const [prevPage,setPrevPage] = useState(0);
    const [prevFlights,setPrevFlights] = useState([]);
    const [shownPrev,setShowPrev] = useState(false);

    const API_URL = getMainApiURL(flightDirection,prevPage,jsonTime, 'toDateTime', '-scheduleDate,-scheduleTime,+mainFlight');
    

    useEffect(()=>{
        setShowPrev(true);
        setPrevPage(prevPage+1);
    },[shownPrevData])

    const {data} = useQuery({
        queryKey: ['prevFlights',prevPage],
        queryFn: async () => {
            const data = await fetchFlights(API_URL);

            if(data[data.length-1].last){
                const unique = filterData(data.slice(0,data.length-2));

                setPrevFlights([...prevFlights, ...unique]);
                return data;
            }

            const unique = filterData(data.slice(0,data.length-2));

            if(prevFlights.length > 0 && unique[0].mainFlight == prevFlights[0].mainFlight){
                unique.shift();
            }

            if(prevFlights.length < (shownPrevData <= 50 ? 100 : shownPrevData + 50)){
                setPrevFlights([...prevFlights,...unique])
                setPrevPage(prevPage+1);
            }
            
            return data;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        
    });

    return (
        <>
            {shownPrev && prevFlights.slice(0,shownPrevData <= 50 ? 50 : shownPrevData).reverse().map((flight) => <FlightCard flight={flight} key={flight.id} display={display} flightDirection= {flightDirection} />)}
        </>
    );
}

export default PreviousFlights;