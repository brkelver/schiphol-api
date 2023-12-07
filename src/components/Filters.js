import Link from 'next/link';
import React from 'react';
import SearchBar from './SearchBar';
import DropDown from './DropDown';

function Filters({jsonTime, flightDirection}) {

    return (
        <div className='flex h-[120px] border-b-4 border-black mb-5 justify-around items-center text-center divide-solid divide-x-[1px] divide-black'>
            <div className='flex w-full h-full text-white font-bold items-center justify-center space-x-4 px-8 shadow-xl'>
                <Link href='/departures?direction=D' 
                    className={`${flightDirection === 'D' ? 'bg-[#0061FE] hover:bg-[#3984FF]' : 'bg-[white] hover:bg-[#0061FE] text-[#0061FE]'} border-[3px] border-[#1E1919] p-4 w-32  hover:text-white rounded-lg ease-in duration-200`}>
                    Departures
                </Link>
                <Link href='/arrivals?direction=A' 
                    className={`${flightDirection === 'A' ? 'bg-[#0061FE] hover:bg-[#3984FF]' : 'bg-[white] hover:bg-[#0061FE] text-[#0061FE]'} border-[3px] border-[#1E1919] p-4 w-32 hover:text-white rounded-lg ease-in duration-200`}>
                    Arrivals
                </Link>
            </div>
            <div className='w-full h-full flex items-center justify-center  shadow-xl'>
                <DropDown flightDirection={flightDirection}/>
            </div>
            <div className='w-full h-full flex items-center justify-center px-8  shadow-md'>
                <SearchBar jsonTime={jsonTime} flightDirection={flightDirection} />
            </div>
        </div>
    );
}

export default Filters;