import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaMotorcycle, FaTruck, FaTaxi } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineMyLocation } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../contextapi/Context';

const Prises = () => {
  const { pickupLocation, dropLocation } = useContext(MyContext);
  const [kmrange, setKmRange] = useState(0);
  const [expectTime, setExpectTime] = useState("");
  const [selectedService, setSelectedService] = useState('Bike');
  const [loading, setLoading] = useState(true);
  const param = useParams();

  const calculateFare = (distance, serviceType) => {
    const pricing = {
      Bike: { base: 20, perKm: 5 },
      Auto: { base: 30, perKm: 8 },
      'Cab Economy': { base: 50, perKm: 12 },
      'Cab Premium': { base: 80, perKm: 18 }
    };
    return pricing[serviceType].base + (distance * pricing[serviceType].perKm);
  };

  const fetchDistanceData = async () => {
    setLoading(true);
    const data = {
      pickup_lat: pickupLocation.lat,
      pickup_lng: pickupLocation.lng,
      drop_lat: dropLocation.lat,
      drop_lng: dropLocation.lng,
      id: param.id,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_localhost}/user/distance-matrix`, data);
      setKmRange(parseFloat(response.data.data.distance));
      setExpectTime(response.data.data.duration);
    } catch (err) {
      console.error('Error fetching distance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistanceData();
  }, []);

  const services = [
    { name: 'Bike', icon: <FaMotorcycle /> },
    { name: 'Auto', icon: <FaTruck /> },
    { name: 'Cab Economy', icon: <FaTaxi /> },
    { name: 'Cab Premium', icon: <FaTaxi /> }
  ];

  return (
    <div className='p-4 text-white shadow-md rounded-xl m-4 md:m-6 lg:m-10 bg-gray-800'>
      <h2 className='text-xl font-bold mb-2'>Select Pickup & Drop Location</h2>

      {loading ? (
        <div className='flex justify-center items-center py-10'>
          <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : (
        <>
          <div className='bg-gray-700 rounded-md p-4 my-4'>
            <div className='flex items-center gap-2'>
              <i className='text-green-400'><FaLocationDot /></i>
              <input type='text' placeholder='Pickup Location' className='w-full py-2 bg-transparent' value={pickupLocation.address} readOnly />
            </div>
            <hr className='my-2 opacity-50' />
            <div className='flex items-center gap-2'>
              <i className='text-red-400'><MdOutlineMyLocation /></i>
              <input type='text' placeholder='Drop Location' className='w-full py-2 bg-transparent' value={dropLocation.address} readOnly />
            </div>
          </div>

          <h3 className='text-lg font-semibold mb-2'>Select Service</h3>
          <div className='space-y-2'>
            {services.map(service => (
              <div key={service.name} className={`flex items-center justify-between p-3 bg-gray-700 rounded-lg cursor-pointer ${selectedService === service.name ? 'border border-blue-400' : ''}`} onClick={() => setSelectedService(service.name)}>
                <div className='flex items-center space-x-2'>
                  <span className='text-xl'>{service.icon}</span>
                  <span className='font-medium'>{service.name}</span>
                </div>
                <span className='text-white'>₹{calculateFare(kmrange, service.name)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className='mt-4 text-gray-400 text-center'>💵 Cash</div>
      <button className='w-full text-center mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300'>
        Book now
      </button>
    </div>
  );
};

export default Prises;
