import Filters from '@/components/Filters';
import FlightsList from '@/components/FlightsList';
import React from 'react';

function Arrivals() {
    

    return (
        <div className='container max-w-7xl'>
            <Filters  flightDirection={'A'} />
            <FlightsList flightDirection={'A'}/>
        </div>
    );
}
export default Arrivals;