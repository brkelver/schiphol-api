import FlightDetails from '@/components/FlightDetails';
import React from 'react';

function FLightDetailsPage() {
    return (
        <div className='h-[80vh] mt-32'>
            <FlightDetails direction={'D'} />
        </div>
    );
}

export default FLightDetailsPage;