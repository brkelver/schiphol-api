import { NextResponse } from "next/server";

export async function GET(request) {
    let params = '';
    console.log(process.env.APP_ID);
    const { searchParams } = new URL(request.url);
    searchParams.forEach((v) => params+=`${v}`);

    const API_URL = `https://api.schiphol.nl/public-flights/flights/${params}`;
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
    const data = await res.json();

    return NextResponse.json(data);

  }