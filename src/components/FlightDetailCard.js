'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FlightDetailsSpinner } from './Spinner';
import aircrafts from 'public/aircrafts.json'
import airports from 'public/airports.json'
import { getAirplane, getAirport } from '@/helpers/helper';

function FlightDetailCard({data, direction}) {

    let checkIn = '-';
    let baggageBelt = '-';

    if(data !== undefined &&data.checkinAllocations !== null){
        const tempCheckIn = data.checkinAllocations.checkinAllocations[0].rows.rows;
        if(tempCheckIn.length>1){
            checkIn = `${tempCheckIn['0'].position} - ${tempCheckIn[`${tempCheckIn.length-1}`].position}`;
        }else if(tempCheckIn.length===1){
            checkIn = `${tempCheckIn['0'].position}`;
        }
    }

    if(data !== undefined && data.baggageClaim !== null){
        baggageBelt = data.baggageClaim.belts['0'];
    }

    if( data === undefined ) return (<FlightDetailsSpinner />)

    if( direction === 'A') {
        return (
            <div className='flex w-[900px] shadow-lg  rounded-[32px]'>
                <div className='w-1/2'>
                    <Image src='/images/redcharlie-T1Do6YGPX8A-unsplash.jpg' width={600} height={1000} className='rounded-[32px]'/>
                </div>
                <div className='w-1/2 flex flex-col p-8 divide-y-4 divide-black'>
                    <p className='font-medium text-lg'>{data.prefixIATA} {data.flightNumber} to</p>
                    <h1 className='font-bold text-[48px]'>{getAirport(airports,data.route.destinations[0])}</h1>
                    <div className='flex flex-col'>
                        <div className='flex justify-around my-6'>
                            <div className='flex flex-col text-center'>
                                <p className='font-bold text-xl'>Date</p>
                                <p className='font-medium text-lg'>1 Dec</p>
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='font-bold text-xl'>Arrival time</p>
                                <p className='font-medium text-lg'>{(data.scheduleTime).slice(0,5)}</p>
                            </div>
                            
                        </div>
                        <div className='flex justify-evenly'>
                            <div className='flex flex-col text-center'>
                                <p className='font-bold text-xl'>Arrivals</p>
                                <p className='font-medium text-lg'>{data.terminal}</p>
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='font-bold text-xl'>Baggage Belt</p>
                                <p className='font-medium text-lg'>{baggageBelt}</p>
                            </div>
                        </div>
                        <div className='flex justify-evenly'>
                            <div className='flex flex-col text-center'>
                                <p className='font-bold text-xl'>Aircraft Type</p>
                                <p className='font-medium text-lg'>{getAirplane(aircrafts,data.aircraftType.iataMain,data.aircraftType.iataSub)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='flex w-[800px] shadow-lg  rounded-[32px]'>
            <div className='w-1/2'>
                <Image src='/images/redcharlie-T1Do6YGPX8A-unsplash.jpg' width={600} height={1000} className='rounded-[32px]'/>
            </div>
            <div className='w-1/2 flex flex-col p-8 divide-y-4 divide-black'>
                <p className='font-medium text-lg'>{data.prefixIATA} {data.flightNumber} to</p>
                <h1 className='font-bold text-[48px]'>{getAirport(airports,data.route.destinations[0])}</h1>
                <div className='flex flex-col'>
                    <div className='flex justify-around my-6'>
                        <div className='flex flex-col text-center'>
                            <p className='font-bold text-xl'>Date</p>
                            <p className='font-medium text-lg'>1 Dec</p>
                        </div>
                        <div className='flex flex-col text-center'>
                            <p className='font-bold text-xl'>Departure time</p>
                            <p className='font-medium text-lg'>{(data.scheduleTime).slice(0,5)}</p>
                        </div>
                        <div className='flex flex-col text-center'>
                            <p className='font-bold text-xl'>Departures</p>
                            <p className='font-medium text-lg'>{data.terminal}</p>
                        </div>
                    </div>
                    <div className='flex justify-evenly mb-6'>
                        <div className='flex flex-col text-center'>
                            <p className='font-bold text-xl'>Check-in desk</p>
                            <p className='font-medium text-lg'>{checkIn}</p>
                        </div>
                        <div className='flex flex-col text-center'>
                            <p className='font-bold text-xl'>Gate</p>
                            <p className='font-medium text-lg'>{data.gate}</p>
                        </div>
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='flex flex-col text-center'>
                            <p className='font-bold text-xl'>Aircraft Type</p>
                            <p className='font-medium text-lg'>{getAirplane(aircrafts,data.aircraftType.iataMain,data.aircraftType.iataSub)}</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default FlightDetailCard;