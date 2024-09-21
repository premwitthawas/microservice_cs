import AuctionForm from '@/components/auctions/AuctionForm'
import Heading from '@/components/helpers/Heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const CreateAuctionPage = () => {
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <Heading title='Sell your car!' subtitle='Please enter the details of you car' />
      <Separator className='mb-2'/>
      <AuctionForm />
    </div>
  )
}

export default CreateAuctionPage