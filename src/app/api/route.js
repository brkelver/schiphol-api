import { NextResponse } from "next/server";

export async function GET(request) {

    let params = '';
    
    const { searchParams } = new URL(request.url);
    searchParams.forEach((v,k) => params+=`${k}=${v}&`);
    
    const API_URL = `https://api.schiphol.nl/public-flights/flights?${params}`;
    
    const options = {
        "method": "GET",
        headers: {
            'accept': 'application/json',
            'resourceversion': 'v4',
            'app_id':process.env.APP_ID,
            'app_key':process.env.APP_KEY
        }
    };

    const res = await fetch(API_URL,options);
    const isLast = res.headers.has('Link') ? !res.headers.get('Link').includes('next') : true
    const last = {last: isLast}
    
    const data = await res.json();
    return NextResponse.json([...data.flights, last]);
  }