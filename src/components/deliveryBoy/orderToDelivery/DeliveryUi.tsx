'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getOrder } from '@/features/deliverySlice'
import OrderDetailsModal from './orderDetails'

function DeliveryUi() {
  const dispatch = useDispatch<AppDispatch>()
  const { order, loading, error } = useSelector((state: RootState) => state.delivery)

  const [showModal, setShowModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(getOrder())
  }, [dispatch])

  const orders = order.slice(0, 4)

  const handleViewDetails = (postId: string) => {
    setSelectedPostId(postId)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPostId(null)
  }

  return (
    <div className="p-4 mt-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-[#B8755D] mb-6">My Delivery Orders</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : orders?.length === 0 ? (
        <p className="text-gray-500">No delivery orders assigned.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {orders?.map((item) => {
            const bid = item.bidId
            const post = bid?.postId

            return (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-[#B8755D]">{post?.eventName}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {post?.district} | {new Date(post?.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })} at {new Date(`1970-01-01T${post?.time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                </p>
                <p className="text-sm text-gray-600 mb-1">Chef: {bid?.chefId?.name}</p>
                <p className="text-sm text-gray-600">
                  Delivery Status: <span className="font-medium">{item.status}</span>
                </p>
                <button
                  className="mt-3 inline-block px-4 py-1.5 text-sm bg-[#B8755D] text-white rounded hover:bg-[#a06451]"
                  onClick={() => handleViewDetails(item._id)}
                >
                  View Details
                </button>
              </div>
            )
          })}
        </div>
      )}

      {showModal && selectedPostId && (
        <OrderDetailsModal
          postId={selectedPostId}
          show={showModal}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default DeliveryUi
