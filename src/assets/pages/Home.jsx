import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosFlash } from 'react-icons/io'
import { MdAddLocation, MdHeight, MdOutlinePinDrop } from 'react-icons/md'
import img from '../images/new.png'

import Aos from 'aos'
import 'aos/dist/aos.css' // Import AOS styles
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../contextapi/Context'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import Ofset from '../componants/Ofset'

const Home = () => {
  const apikey = import.meta.env.VITE_API_key
  const navigate = useNavigate()
  const pickublocation = useRef(null)
  const droplocation = useRef(null)
  const [drop, setDrop] = useState('')
  const [address, setAddress] = useState('')
  const [bottombar, setbottombar] = useState()
  const { pickupLocation, setPickupLocation, dropLocation, setDropLocation } =
    useContext(MyContext)
  // Initialize AOS on component mount
  useEffect(() => {
    Aos.init({ duration: 500, once: false })
  }, [])

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded.')
      return
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      pickublocation.current,
      {
        types: ['geocode'], // Change to ["(cities)"] for city suggestions
        componentRestrictions: { country: 'IN' } // Restrict to a specific country (optional)
      }
    )

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry) {
        console.error('No details available for this location.')
        return
      }

      setAddress(place.formatted_address)
      setPickupLocation({
        address:place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
    
      
     
    })
  }, [])

  // get current location functin
  const getCurrentLocation = async e => {
    e.preventDefault() // Prevents page reload
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

          try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`

            const response = await axios.get(url)
            if (response.data.results.length > 0) {
              const place = response.data.results[0].formatted_address
              console.log('Address:', place)
              setAddress(place)
              setPickupLocation({
                address:place,
                lat:latitude,
                lng:longitude
              })
            } else {
              console.error('No address found for this location.')
            }
          } catch (err) {
            console.error('Error fetching address:', err.message)
          }
        },
        error => {
          console.error('Error fetching location:', error)
          alert('Unable to fetch location. Please enable GPS.')
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  // get current location functin

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded.')
      return
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      droplocation.current,
      {
        types: ['geocode'], // Change to ["(cities)"] for city suggestions
        componentRestrictions: { country: 'IN' } // Restrict to a specific country (optional)
      }
    )

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry) {
        console.error('No details available for this location.')
        return
      }

      setDrop(place.formatted_address)
      setDropLocation({
        address:place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
    
    
    })
  }, [])
  


 
  const AddLocationtoDb = async e => {
    //for rent route and add location to database
    e.preventDefault()

    const usercookie = Cookies.get('webtoken')
    if (!usercookie) return  navigate('/login')
    let tokendata
    if (usercookie) {
      if (pickublocation.current.value === '')
        return alert('Please enter pickup location')
      if (droplocation.current.value === '')
        return alert('Please enter Drop location')
      const token = JSON.parse(usercookie)
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      tokendata = decodedToken
      navigate(`/rent/${tokendata.userId}`)
    } 
    try {
      const data = {
        pickupLocation: pickupLocation,
        dropLocation: dropLocation,
        pickupLat: pickupLocation.lat,   
        pickupLng: pickupLocation.lng,   
        dropLat: dropLocation.lat,       
        dropLng: dropLocation.lng,       
        user_id: tokendata.userId
      };
    
      const responce = await axios.post(`${import.meta.env.VITE_localhost}/user/getlocation`, data)
      console.log(responce)
    }
    catch(err) {
      console.log("something went wrong")
      console.log(err.message)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollTop / scrollHeight) * 100
      setbottombar(scrollPercentage)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <section className=' sm:p-[20px] md:p-[30px] lg:p-[50px] text-white overflow-hidden'>
        <div
          data-aos='fade-left'
          className='p-[20px_40px] rounded-[8px] text-center text-[20px] sm:text-[30px] md:text-[30px] font-semibold'
        >
          Ride <span className='text-orange-300 overline'>Fast</span>, Ride
          Smart{' '}
          <i className='inline-block text-amber-400'>
            <IoIosFlash />
          </i>
        </div>

        <div className='flex flex-col lg:flex-row justify-center  p-[10px_20px] gap-[20px]'>
          {/* Ride Booking Form */}

          <form
            className='flex flex-col  w-[100%] border-[1px] border-[#FFB86A] py-[20px] rounded-[20px] bg-slate-700'
            data-aos='fade-right'
          >
            {/* Pickup Location */}
            <div className='border border-slate-500 rounded-[20px] mx-[20px]'>
              {/* Pickup Location */}
              <div className='focus:shadow-md flex relative rounded-[8px] text-[20px] m-auto'>
                <i className='px-[10px] absolute transform top-[50%] translate-y-[-50%]'>
                  <MdAddLocation className='cursor-pointer' />
                </i>
                <input
                  ref={pickublocation}
                  type='text'
                  id='location'
                  className='w-full py-[15px] focus:outline-none ps-[40px]'
                  placeholder='Pickup Location'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
              <hr className='mx-[40px] opacity-50' />
              <div className='flex justify-end me-[40px]'>
                <button
                  onClick={getCurrentLocation}
                  className='flex gap-2 items-center mt-2 px-4 py-[2px] bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300'
                >
                  <i>
                    <FaLocationCrosshairs />
                  </i>
                  <span>Use current location</span>
                </button>
              </div>

              {/* Drop Location */}
              <div className='focus:shadow-md relative rounded-[8px] text-[20px] m-auto '>
                <i className='px-[10px] absolute transform top-[50%] translate-y-[-50%]'>
                  <MdOutlinePinDrop />
                </i>
                <input
                  ref={droplocation}
                  className='w-full py-[15px] focus:outline-none ps-[40px]'
                  placeholder='Drop Location'
                  value={drop}
                  onChange={e => setDrop(e.target.value)}
                />
              </div>
            </div>

            {/* Book Now Button */}

            <button
              onClick={AddLocationtoDb}
              className='mt-[10px] cursor-pointer font-semibold hover:shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 text-[20px] block m-auto w-[90%] sm:w-[70%] py-[10px] rounded-[8px] md:w-[60%] lg:w-[40%] transition duration-300'
            >
              Book Now
            </button>
          </form>

          {/* Extra Info Section */}
          <div
            className='border-[1px] border-[#FFB86A] w-[100%] p-[20px]  py-[20px] rounded-[20px] bg-slate-700'
            data-aos='fade-left'
          >
            <div className='text-[20px] font-semibold text-center'>
              Our <span className='text-orange-300 overline'>Service</span>
            </div>
            <div
              className='grid grid-cols-2 sm:grid-cols-3 gap-y-[20px] mt-[20px] gap-x-[20px]'
              data-aos='fade-right'
            >
              <div className='h-[100px] rounded-[10px]  border overflow-hidden'>
                <img width={'100%'} src={img} alt='' />
              </div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-left'
              >
                <img width={'100%'} src={img} alt='' />
              </div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-right'
              ></div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-left'
              ></div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-right'
              ></div>
              <div
                className='h-[100px] rounded-[10px]  border overflow-hidden'
                data-aos='fade-left'
              ></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row sm:p-[30px_100px] justify-evenly items-center mt-[30px] p-[30px_20px] gap-[30px] sm:gap-[50px] md:gap-[70px] lg:gap-[100px]'>
          <div className='grid grid-cols-2  gap-[20px]'>
            <div className='flex flex-col gap-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>

            <div className='flex flex-col gap-[30px] mt-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>
          </div>
          <div className=' space-y-[20px] md:space-y-[30px] lg:space-y-[40px]'>
            <div
              className='text-[25px] sm:text-[32px] md:text-[40px]'
              data-aos='fade-right'
            >
              Zoodrop – <span className='text-orange-300 overline'>Fast</span>{' '}
              Rides, Fair Prices
            </div>
            <p className='text-[18px] tracking-tight' data-aos='fade-left'>
              Zoodrop – The fastest way to ride, the smartest way to save! 🚀💨
              Get anywhere, anytime, at prices that make sense
            </p>
            <button className='border border-slate-500 p-[6px_20px] bg-[#5B5EB6] rounded-[10px] hover:bg-[#FFB86A]  text-[20px]'>
              Book Now
            </button>
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row-reverse sm:p-[30px_100px] justify-evenly items-center mt-[30px] p-[30px_20px] gap-[30px] sm:gap-[50px] md:gap-[70px] lg:gap-[100px]'>
          <div className='grid grid-cols-2  gap-[20px]'>
            <div className='flex flex-col gap-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-right'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>

            <div className='flex flex-col gap-[30px] mt-[30px]'>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
              <div
                className='border rounded-[15px] overflow-hidden'
                data-aos='fade-left'
              >
                <img src={img} width={'100%'} alt='' />
              </div>
            </div>
          </div>
          <div className=' space-y-[20px] md:space-y-[30px] lg:space-y-[40px]'>
            <div
              className='text-[25px] sm:text-[32px] md:text-[40px]'
              data-aos='fade-right'
            >
              Zoodrop – <span className='text-orange-300 overline'>Fast</span>{' '}
              Rides, Fair Prices
            </div>
            <p className='text-[18px] tracking-tight' data-aos='fade-left'>
              Zoodrop – The fastest way to ride, the smartest way to save! 🚀💨
              Get anywhere, anytime, at prices that make sense
            </p>
            <button className='border border-slate-500 p-[6px_20px] bg-[#5B5EB6] rounded-[10px] hover:bg-[#FFB86A]  text-[20px]'>
              Earning
            </button>
          </div>
        </div>
      </section>
      <div
        style={{ width: `${bottombar}%` }}
        className='fixed bottom-0 left-0 bg-[#FFB86A] h-[5px] transition-all duration-150'
      ></div>
      <Ofset/>
    </>
  )
}

export default Home
