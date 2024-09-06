'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useParamsStore } from '@/hooks/useParams.store';
import { ArrowDown01, ListFilter, LucideClockArrowDown, AlarmClockCheck, SlidersHorizontal, LucideClockArrowUp, Flame, BadgeAlert, CheckCircle2, ArrowLeftRight } from 'lucide-react';

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
    {
        lable: 'Alphabetical',
        Icon: ArrowDown01,
        value: 'make'
    },
    {
        lable: 'End Date',
        Icon: LucideClockArrowDown,
        value: 'endingSoon'
    },
    {
        lable: 'Recently added',
        Icon: AlarmClockCheck,
        value: 'new'
    },
];

const filterButtons = [
    {
        lable: 'Live Auctions',
        Icon: Flame,
        value: 'live'
    },
    {
        lable: 'Ending Soon',
        Icon: BadgeAlert,
        value: 'endingSoon'
    },
    {
        lable: 'Completed',
        Icon: CheckCircle2,
        value: 'finished'
    },
];

const FiltersAuction = () => {
    const pageSize = useParamsStore(state => state.pageSize);
    const ordeyValue = useParamsStore(state => state.orderBy);
    const filterValue = useParamsStore(state => state.filterBy);
    const setParams = useParamsStore(state => state.setParams);
    return (
        <div className='flex justify-between items-center mb-4'>

            <div className='flex gap-2 items-center'>
                <span className='uppercase text-sm text-gray-500 mr-2 flex items-center'><SlidersHorizontal className='w-5 h-5 mr-2' />Filter By</span>
                {
                    filterButtons.map((item, index) => {
                        return <Button
                            key={index}
                            color='black'
                            variant={`${filterValue === item.value ? 'default' : 'link'}`}
                            onClick={() => setParams({
                                filterBy: item.value
                            })}>
                            {item.lable} <item.Icon className='w-5 h-5 ml-2' />
                        </Button>
                    })
                }
            </div>
            <div className='flex gap-2 items-center'>
                <span className='uppercase text-sm text-gray-500 mr-2 flex items-center'><ArrowLeftRight className='w-5 h-5 mr-2' />Order By</span>
                {
                    orderButtons.map((item, index) => {
                        return <Button
                            key={index}
                            variant={`${ordeyValue === item.value ? 'default' : 'link'}`}
                            onClick={() => setParams({
                                orderBy: item.value
                            })}>
                            {item.lable} <item.Icon className='w-5 h-5 ml-2' />
                        </Button>
                    })
                }
            </div>

            <div className='flex gap-2 items-center'>
                <span className='uppercase text-sm text-gray-500 mr-2 flex items-center'><ListFilter className='w-5 h-5 mr-2' />Page size</span>
                <div>
                    {
                        pageSizeButtons.map((size, index) => {
                            return <Button
                                key={index}
                                variant={`${pageSize === size ? 'default' : 'link'}`}
                                onClick={() => setParams({
                                    pageSize: size
                                })}>
                                {size}
                            </Button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FiltersAuction