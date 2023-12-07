import Filters from '@/components/Filters';
import FlightsList from '@/components/FlightsList';
import { getDateNow } from '@/helpers/helper';
import React from 'react';

function Arrivals(props) {
    
    const jsonTime = getDateNow();

    return (
        <div className='container max-w-7xl'>
            <Filters jsonTime={jsonTime} flightDirection={'A'} />
            <div className=' mt-8'>
               <FlightsList jsonTime={jsonTime} flightDirection={'A'}/>
            </div>
        </div>
    );
}
export default Arrivals;