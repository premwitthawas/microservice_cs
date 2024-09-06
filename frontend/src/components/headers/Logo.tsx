'use client';
import { useParamsStore } from '@/hooks/useParams.store';
import { CarFront } from 'lucide-react';
import React from 'react'

const Logo = () => {
    const reset = useParamsStore(state => state.resetParams)
    return (
        <div onClick={() => reset()} className=" underline font-medium text-sm md:text-base tracking-tighter flex text-green-500 items-center cursor-pointer">
            Auction <CarFront className="w-5 h-5 ml-0.5 md:ml-2" />
        </div>
    )
}

export default Logo