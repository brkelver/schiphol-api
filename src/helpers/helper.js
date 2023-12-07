
export const filterData = (data) => {
    let newData = data.filter(
        (obj, index) =>
            data.findIndex(
                (item) => item.mainFlight === obj.mainFlight
            ) === index && obj.serviceType === 'J'
    )

    return newData;
}

export const filterNextData = (data, departureFlights) => {

    const newData = filterData(data);

    if (departureFlights.length > 0 && departureFlights[departureFlights.length - 1].mainFlight === newData[0].mainFlight) {
        newData.shift();
    }

    return newData;
}

export const getDateNow = () => {
    const date = new Date();

    const jsonTime = date.toLocaleString("sv-SE", { timeZone: 'Europe/Amsterdam' }).replaceAll('.', '-').replace(' ', 'T');

    return jsonTime;
}

export const getAnotherDate = (day) => {

    const today = new Date()
    const anotherDay = new Date(today)
    anotherDay.setDate(today.getDate() + parseInt(day));

    const jsonTime = anotherDay.toLocaleString("sv-SE", { timeZone: 'Europe/Amsterdam' }).replace(' ', 'T');

    return jsonTime.slice(0,10);
}

export const getDayMonth = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('nl-NL', { month: "long", day: "numeric" });

    const spaceIndex = formattedDate.indexOf(' ');
    const dayMonth = formattedDate.slice(0, spaceIndex + 1) + formattedDate.charAt(spaceIndex + 1).toUpperCase() + formattedDate.slice(spaceIndex + 2);

    return dayMonth;
}

export const fetchFlights = async (API_URL) => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
}

export const getAirline = (airlines, iata) => {

    const airline = airlines.filter((airline) => {

        return airline.iata == iata
    });

    return airline.length > 0 ? airline[0].publicName : '';
}

export const getAirport = (airports, route) => {

    const airport = airports.filter((airport) => {
        return airport.iata === route
    });

    return airport['0'].publicName.english;
}

export const getAirplane = (airplanes,iatamain,iatasub) => {
    const airplane = airplanes.filter((airplane) => {
        return (airplane.iataMain === iatamain && airplane.iataSub === iatasub)
    });
    return airplane['0'].longDescription;
}

export const getMainApiURL = (flightDirection, page, time, queryDirection = 'fromDateTime', sort = '+scheduleDate,+scheduleTime,+mainFlight') => {
    return `/api?flightDirection=${flightDirection}&includedelays=false&page=${page}&sort=${sort}&${queryDirection}=${time}&searchDateTimeField=scheduleDateTime`
}
export const getDayParamApiURL = (flightDirection, page, day) => {
    return `/api?scheduleDate=${day}&flightDirection=${flightDirection}&includedelays=false&page=${page}&sort=%2BscheduleTime%2C%20%2BmainFlight`
}

export const getRouteParamApiURL = (flightDirection, route, time) => {
    return `/api?flightDirection=${flightDirection}&route=${route}&includedelays=false&page=0&sort=%2BscheduleTime%2C%20%2BmainFlight&fromDateTime=${time}&searchDateTimeField=scheduleDateTime&toScheduleDate=2023-12-07`
}

export const arrivingFlightStatuses = {
    'SCH': 'Flight Scheduled',
    'AIR': 'Airbone',
    'EXP': 'Expected Landing',
    'FIR': 'Flight in Dutch Airspace',
    'LND': 'Landed',
    'FIB': 'FIBAG',
    'ARR': 'Arrived Flight Has Been Completely Handeled',
    'DIV': 'Diverted',
    'CNX': 'Cancelled',
    'TOM': 'Tomorrow'
}

export const departingFlightStatuses = {
    'SCH': 'Flight Scheduled',
    'DEL': 'Delayed',
    'WIL': 'Wait in Lounge',
    'GTO': 'Gate Open',
    'BRD': 'Boarding',
    'GCL': 'Gate Closing',
    'GTD': 'Gate Closed',
    'DEP': 'Departed',
    'CNX': 'Cancelled',
    'GCH': 'Gate Changed',
    'TOM': 'Tomorrow'
}
