'use client'

import { getAllBids } from '@/features/bidSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DetailModal from './DetailModal'

function ReqUi() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { allbids, loading, error } = useSelector((state: RootState) => state.chefBids)
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(getAllBids())
  }, [dispatch])

  const completedBids = allbids?.filter(
    (bid) => bid.status === 'completed' && bid.postId?.deliveryStatus === 'pending'
  ) || []

  const displayedBids = completedBids.slice(0, 3)

  const openModal = (id: string) => {
    setSelectedBidId(id)
  }

  const closeModal = () => {
    setSelectedBidId(null)
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md h-auto  max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Latest Order Requests</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : completedBids.length === 0 ? (
        <p className="text-gray-500">No order requests found.</p>
      ) : (
        <>
          <ul className="grid gap-4">
            {displayedBids?.map((bid) => (
              <li
                key={bid._id}
                onClick={() => openModal(bid._id)}
                className="bg-white rounded-lg p-5 shadow-sm border hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="text-lg font-medium text-[#B8755D]">{bid.postId?.eventName}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  📅 {bid.postId?.date} at 🕒 {bid.postId?.time}
                </p>
                <p className="text-sm text-gray-500">📍 {bid.postId?.district}</p>
              </li>
            ))}
          </ul>

          {selectedBidId && <DetailModal bidId={selectedBidId} onClose={closeModal} />}

          {completedBids.length > 3 && (
            <div className="mt-6 text-right">
              <button
                onClick={() => router.push('/deliveryBoy/request')}
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                View All Orders →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ReqUi
