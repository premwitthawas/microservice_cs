'use client';
import React from 'react'
import Countdown, { zeroPad } from 'react-countdown';
import { ClockArrowDown } from 'lucide-react';
interface Timer {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    completed: boolean

}

interface Props {
    auctionEnd: string;
}

const renderer = (time: Timer) => {
    return (
        <div className={`border-2 border-white text-white py-1 px-2 
        rounded-lg flex justify-center ${time.completed ? 'bg-red-600' : (time.days === 0 && time.hours < 10) ? 'bg-amber-600' : 'bg-green-600'}`}>
            {time.completed ? (
                <span>Finished</span>
            ) : (
                <span className='flex items-center justify-center' suppressHydrationWarning={true}>
                    <ClockArrowDown className='w-5 h-5 text-white mr-2' /> {zeroPad(time.days)}:{zeroPad(time.hours)}:{zeroPad(time.minutes)}:{zeroPad(time.seconds)}
                </span>
            )
            }
        </div >
    );
}



const CountdownTimer = (props: Props) => {
    return (
        <div>
            <Countdown date={props.auctionEnd} renderer={renderer} />
        </div>
    )
}

export default CountdownTimer