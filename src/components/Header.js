import React from 'react';
import Link from 'next/link';

function Header() {
    return (
        <header>
            <div className='h-[5vh] bg-black flex justify-center'>
                <nav className='h-full w-full max-w-7xl text-white flex text-center font-bold text-lg space-x-4'>
                    <Link href='/' className='flex items-center'>Home</Link>
                </nav>
            </div>
            
            <div className='flex justify-between align-bottom items-center h-[50vh] bg-[url("/images/pexels-tanathip-rattanatum-2026324.jpg")] bg-cover object-cover bg-center'>
                <div className='w-full h-full bg-[rgba(0,0,0,0.3)] text-white'>
                </div>
            </div>
        </header>
    );
}

export default Header;