import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <footer className='flex justify-center items-center bg-black text-white h-[48px]'>
            Made by&nbsp;
            <Link href='https://www.github.com/brkelver' className='text-[#0061FE]'>
                Burak Elver
            </Link>
        </footer>
    );
}

export default Footer;