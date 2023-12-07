import Filters from '@/components/Filters';
import FlightsList from '@/components/FlightsList';
import { getDateNow } from '@/helpers/helper';
import React from 'react';

function Departures(props) {

    const jsonTime = getDateNow();
    
    return (
        <div className='container max-w-7xl'>
            <Filters jsonTime={jsonTime} flightDirection={'D'} />
            <FlightsList jsonTime={jsonTime} flightDirection={'D'} />
        </div>
    );
}

export default Departures;