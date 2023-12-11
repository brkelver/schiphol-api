import Filters from '@/components/Filters';
import FlightsList from '@/components/FlightsList';
import React from 'react';

function Departures() {

    return (
        <div className='container max-w-7xl'>
            <Filters  flightDirection={'D'} />
            <FlightsList  flightDirection={'D'} />
        </div>
    );
}

export default Departures;