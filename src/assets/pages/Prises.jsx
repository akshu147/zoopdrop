import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FaMotorcycle, FaTruck, FaTaxi } from 'react-icons/fa'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { MyContext } from '../../contextapi/Context'
import { FaLocationDot } from 'react-icons/fa6'
import { MdOutlineMyLocation } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const Prises = () => {
  const { pickupLocation, setPickupLocation, dropLocation, setDropLocation } =
    useContext(MyContext)
  const [selectedService, setSelectedService] = useState('Bike')
  const [kmrange, setkmrange] = useState(0)
  const [expecttime, setexpecttime] = useState("")
  const param = useParams()
  console.log(kmrange, "data")
  const destinationcount = async () => {
    const data = {
      pickup_lat:pickupLocation.lat,
      pickup_lng:pickupLocation.lng,
      pickup_address:pickupLocation.address,
      drop_lat:dropLocation.lat,
      drop_lng:dropLocation.lng,
      drop_address:dropLocation.address,
      id:param.id,

    }


    try {
      const responce = await axios.post(`${import.meta.env.VITE_localhost}/user/distance-matrix`,data)
      console.log(responce)
        setkmrange(parseInt(responce.data.data.distance))
      setexpecttime(responce.data.data.duration)
      
      
    } catch (err) {
      console.log('something wwent wrong')
      console.log(err)
    }
  }
  useEffect(() => {
    destinationcount()
  }, [])
  const services = [
    { name: 'Bike', icon: <FaMotorcycle />, fare:kmrange },
    { name: 'Auto', icon: <FaTruck />, fare:kmrange },
    { name: 'Cab Economy', icon: <FaTaxi />, fare:kmrange  },
    { name: 'Cab Premium', icon: <FaTaxi />, fare:kmrange }
  ]
  return (
    <div className='p-4 text-white shadow-[0px_0px_10px_lightblue] rounded-xl m-[20px_10px] md:m-[20px_40px] lg:m-[40px_100px]'>
      <h2 className='text-xl font-bold mb-2'>Select Pickup & Drop Location</h2>

   

      <div className='bg-[#ffffff45] rounded-[10px] my-[20px] px-4'>
        <div className=' flex items-center gap-2'>
          <i className='text-green-400'>
            <FaLocationDot />
          </i>
          <input
            type='text'
            placeholder='Pickup Location'
            className='w-full py-2 rounded-md focus:outline-none'
            value={pickupLocation.address} // Using context value
            readOnly
          />
        </div>

        <hr className='mx-[20px] opacity-65' />
        <div className='flex items-center gap-2'>
          <i className='text-red-400'>
            <MdOutlineMyLocation />
          </i>
          <input
            type='text'
            placeholder='Drop Location'
            className='w-full py-2 rounded-md focus:outline-none'
            value={dropLocation.address} // Using context value
            readOnly
          />
        </div>
      </div>

      <h3 className='text-lg font-semibold mb-2'>Select Service</h3>
      <div className='space-y-2'>
        {services.map(service => (
          <div
            key={service.name}
            className={`flex items-center justify-between p-3 bg-slate-700 rounded-lg cursor-pointer ${
              selectedService === service.name ? 'border border-blue-400' : ''
            }`}
            onClick={() => setSelectedService(service.name)}
          >
            <div className='flex items-center space-x-2'>
              <span className='text-xl'>{service.icon}</span>
              <span className='font-medium'>{service.name}</span>
            </div>
            <span className='text-white'>{kmrange * 5}</span>
          </div>
        ))}
      </div>

      <div className='mt-4 text-gray-400 text-center'>💵 Cash</div>
      <button className='w-full text-center mt-2 px-4 py-1 text-[20px] bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300'>
        Book now
      </button>
    </div>
  )
}

export default Prises
