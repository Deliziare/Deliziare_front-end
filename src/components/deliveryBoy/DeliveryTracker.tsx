'use client'

import socket, { connectSocket } from '@/socket'
import React, { useEffect } from 'react'

const DeliveryBoyTracker: React.FC<{ userId: string }> = ({ userId }) => {
  useEffect(() => {
    connectSocket(userId) 

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        console.log('Sending location:', coords)
        socket.emit('locationUpdate', coords)
      },
      (err) => {
        console.error('Geolocation error', err)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
      socket.disconnect()
    }
  }, [userId])

  return ;
}

export default DeliveryBoyTracker
