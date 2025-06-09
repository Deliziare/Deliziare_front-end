'use client'

import BottomBar from '@/components/deliveryBoy/bottomBar'
import DeliveryBoyTracker from '@/components/deliveryBoy/DeliveryTracker'
import Home from '@/components/deliveryBoy/home'
import Navbar from '@/components/deliveryBoy/Navbar'
import ReqUi from '@/components/deliveryBoy/OrderRequests/ReqUi'
import DeliveryUi from '@/components/deliveryBoy/orderToDelivery/DeliveryUi'
import React from 'react'

const page = () => {
  return (
    <div>
       <Navbar/>
      <div  className="min-h-screen bg-white py-6 px-4 sm:px-8 md:px-16">
       
        <ReqUi />
        <DeliveryUi/>
        <DeliveryBoyTracker/>
        <BottomBar/>
        </div>
      </div>
  
  )
}

export default page
