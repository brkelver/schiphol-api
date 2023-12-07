'use client'
import { filterData, getAirport, getAnotherDate } from '@/helpers/helper';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import airports from 'public/airports.json'
import { useRouter } from 'next/navigation';


function SearchBar({ jsonTime, flightDirection }) {
    const [searchInput, setSearchInput] = useState('');
    const [isFetched, setIsFetched] = useState(false)

    const router = useRouter();

    const tomorrow = getAnotherDate(1);

    const API_URL = `/api?route=${searchInput}&flightDirection=${flightDirection}&includedelays=false&page=0&sort=+scheduleDate,+scheduleTime,+mainFlight&fromDateTime=${jsonTime}&searchDateTimeField=scheduleDateTime&toScheduleDate=${tomorrow}`

    const { refetch, data, isSuccess } = useQuery({
        queryKey: ['searchflight'],
        queryFn: async () => {
            const res = await fetch(API_URL);
            const data = await res.json();

            const unique = filterData(data.slice(0,data.length-2));
            return unique;
        },
        enabled: false
    })

    useEffect(() => {
        const fetchData = async () => {

            if (searchInput.length === 3) {
                await refetch();
                setIsFetched(true);
            } else {
                setIsFetched(false);
            }
        }
        fetchData();

    }, [searchInput])

    const handleChange = async (val) => {
        setSearchInput(val);
    }
    const handleClick = async (val) => {
        router.push(`/departures?route=${searchInput}`)
    }

    return (
        <div className='relative group' >
            <div className='h-[48px] w-[48px] p-0 absolute right-0 cursor-pointer z-20 flex items-center justify-center'  onClick={() => handleClick()}>

                <FaMagnifyingGlass className='' />
            </div>
            <input className='w-[480px] h-[48px] border-2 border-slate-700/40 p-3 text-base focus:shadow-xl focus:shadow-slate-700/40 focus:border-2 focus:outline-none' value={searchInput} onChange={(e) => handleChange(e.target.value)}>
            </input>
            <ul className={`bg-white w-[480px] z-10 px-4 py-2 absolute border-2 border-t-0 border-slate-700/40 ${isFetched ? 'block' : 'hidden'} shadow-2xl`}>
                {isSuccess && <p className='w-full py-2 text-start border-b-2 border-slate700/40 '>{data.length > 1 ? 'LOOKING FOR ONE OF THESE FLIGHTS' : 'LOOKING FOR THIS FLIGHT?'}</p>}
                {isFetched && data.map((flight) => {
                    return <>
                        <li key={flight.id}>
                            <Link href={flightDirection === 'D' ? `/departures/${flight.id}?id=${flight.id}`: `/arrivals/${flight.id}?id=${flight.id}`} className='w-full py-2 text-start flex text-lg text-[#0061FE] font-semibold'>
                                <div className='flex w-1/3 space-x-2'>
                                    <p>{flight.prefixIATA}</p>
                                    <p>{flight.flightNumber}</p>
                                </div>
                                <div className='flex w-2/3 justify-between'>
                                    <p>{getAirport(airports, flight.route.destinations[0])}</p>
                                    <p>{(flight.scheduleTime).slice(0, 5)}</p>
                                </div>
                            </Link>
                        </li>

                    </>
                })}
            </ul>
        </div>
    );
}

export default SearchBar;