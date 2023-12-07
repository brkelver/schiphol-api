'use client'
import { getAnotherDate, getDayMonth } from '@/helpers/helper';
import { useRouter } from 'next/navigation';
import React from 'react';

function DropDown({flightDirection}) {

    const router = useRouter();
    const dropdownList = []

    for(let i = 2;i<22;i++){
        let title = getDayMonth(getAnotherDate(i));
        dropdownList.push({value: `${i}`, title: title})
    }

    const handleChange = (e) => {
        const direction = flightDirection === 'D' ? 'departures' : 'arrivals';
        if(e === '0'){
            router.push(`/${direction}`)
            return;
        }
        const day = getAnotherDate(e);
        router.push(`/${direction}?day=${day}`)
    }

    return (
        <div className="relative w-full lg:max-w-sm ">
            <select onChange={(e)=>handleChange(e.target.value)} 
            className="w-[200px] p-2.5 text-[#3984FF] bg-white border-[1px] border-slate-700/50 rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 cursor-pointer" defaultValue='0'>

                <option value='-1' className='text-[#1E1919]' >Yesterday</option>
                <option value='0' className='text-[#1E1919]'>Today</option>
                <option value='1' className='text-[#1E1919]'>Tomorrow</option>

                {dropdownList.map((opt) => (<option className='text-[#1E1919] p-4' value={opt.value} key={opt.value}>{opt.title}</option>))}

            </select>
        </div>
    );
}

export default DropDown;