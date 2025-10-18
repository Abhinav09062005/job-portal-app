import React, {useContext,useState,useRef} from 'react'
import { assets } from '../assets/assets'
import {AppContext} from '../context/AppContext'
const Hero = () => {

   const {setSearchFilter,setIsSearched}=useContext(AppContext)
   const titleRef =useRef(null)
   const locationRef=useRef(null)
   const onSearch =()=>{
      setSearchFilter({
        title:titleRef.current.value,
        location: locationRef.current.value
      })
      setIsSearched(true)
      
   }
  return (
    <div className="w-full px-4 sm:px-8 lg:px-20 my-10">
  <div className="max-w-6xl mx-auto">
    <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center rounded-xl">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
        Over 10,000+ jobs to apply
      </h2>
      <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio perferendis at, debitis blanditiis non consequuntur incidunt ratione? Provident!
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded text-gray-600 max-w-xl mx-auto gap-2 px-3 py-2">
        <div className="flex items-center flex-1">
          <img className="h-4 sm:h-5 mr-2" src={assets.search_icon} alt="" />
          <input ref={titleRef}
            type="text"
            placeholder="search for jobs"
            className="text-xs sm:text-sm p-2 rounded outline-none w-full"
          />
        </div>
        <div className="flex items-center flex-1">
          <img className="h-4 sm:h-5 mr-2" src={assets.location_icon} alt="" />
          <input ref={locationRef}
            type="text"
            placeholder="location"
            className="text-xs sm:text-sm p-2 rounded outline-none w-full"
          />
        </div>
        <button onClick={onSearch} className="bg-blue-600 px-6 py-2 rounded text-white">
          Search
        </button>
      </div>
    </div>

    <div className="border border-gray-300 shadow-md mt-6 p-6 rounded-md">
      <div className="flex justify-center gap-10 lg:gap-16 flex-wrap items-center">
        <p className="font-medium">Trusted By</p>
        <img className="h-6" src={assets.microsoft_logo} alt="" />
        <img className="h-6" src={assets.walmart_logo} alt="" />
        <img className="h-6" src={assets.accenture_logo} alt="" />
        <img className="h-6" src={assets.samsung_logo} alt="" />
        <img className="h-6" src={assets.amazon_logo} alt="" />
        <img className="h-6" src={assets.adobe_logo} alt="" />
      </div>
    </div>
  </div>
</div>

  )
}

export default Hero