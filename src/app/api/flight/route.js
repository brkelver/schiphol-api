import { NextResponse } from "next/server";

export async function GET(request) {
    let params = '';
    
    const { searchParams } = new URL(request.url);
    searchParams.forEach((v) => params+=`${v}`);

    const API_URL = `https://api.schiphol.nl/public-flights/flights/${params}`;
    const options = {
        "method": "GET",
        headers: {
            'accept': 'application/json',
            'resourceversion': 'v4',
            'app_id':'3ba059da',
            'app_key':'8ef03c4010974ac06f2169855a8b5d6f'
        }
    };
    
    const res = await fetch(API_URL,options);
    const data = await res.json();

    return NextResponse.json(data);

  }