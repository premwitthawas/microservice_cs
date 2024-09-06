
import React from 'react'

interface Props {
    title?: string;
    subtitle?: string;
    center?: boolean;
}

const Heading = (props: Props) => {
    return (
        <div className={props.center ? 'text-center' : 'text-start'}>
            <div className='text-2xl font-bold'>
                {props.title}
            </div>
            <div className='font-light mt-2'>
                {props.subtitle}
            </div>
        </div>
    )
}

export default Heading