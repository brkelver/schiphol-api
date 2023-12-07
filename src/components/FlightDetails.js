'use client'
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FlightDetailsSpinner } from './Spinner';
import FlightDetailCard from './FlightDetailCard';

function FlightDetails({direction}) {
    

    const params = useSearchParams();
    const param = params.get('id');
    
    const API_URL = `/api/flight?id=${param}`
    const fetchFlightDetails = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data;
    }

    const {data,isLoading,isError} = useQuery({
        queryKey:['flightDetail'],
        queryFn: async () => {
            const data = await fetchFlightDetails();
            return data;
        },
        refetchOnWindowFocus:false,
    })

    if(isLoading) return (<FlightDetailsSpinner />)

    return (
        <FlightDetailCard direction={direction} data={data}/>
    );
}

export default FlightDetails;