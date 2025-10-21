import React, { useContext, useState ,useEffect} from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter,jobs } = useContext(AppContext);
  const [showFilter,setShowFilter]=useState(true)
const [currentPage,setCurrentPage]=useState(1)
const [selectedCategories,setSelectedCategories]=useState([])
const [selectedLocations,setSelectedLocations]=useState([])
const [filteredJobs,setFilteredJobs]=useState(jobs)
const handleCategoryChange=(category)=>{
  setSelectedCategories(
    prev=>prev.includes(category)? prev.filter(cat=>cat!==category) : [...prev,category]
  )
}

const handleLocationChange=(location)=>{
  setSelectedLocations(
    prev=>prev.includes(location)? prev.filter(cat=>cat!==location) : [...prev,location]
  )
}

useEffect(()=>{
    
  const matchesCategory=job=> selectedCategories.length===0 || selectedCategories.includes(job.category)
   const matchesLocation = job=>selectedLocations.length===0 || selectedLocations.includes(job.location)
   const matchesTitle=job=>searchFilter.title==="" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
   const matchesSearchLocation=job=>searchFilter.location==="" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
   const newFilteredJobs=jobs.slice().reverse().filter(
    job=>matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
   )

   setFilteredJobs(newFilteredJobs)
   setCurrentPage(1)
},[jobs,selectedCategories,selectedLocations,searchFilter])
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row gap-8 py-10">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white shadow-sm rounded-lg p-5">
        {/* Current Search */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Current Search</h3>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-md">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                    src={assets.cross_icon}
                    alt="clear title"
                    className="w-3.5 h-3.5 cursor-pointer"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-md">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                    src={assets.cross_icon}
                    alt="clear location"
                    className="w-3.5 h-3.5 cursor-pointer"
                  />
                </span>
              )}
            </div>
          </div>
        )}
       
       <button onClick={e=>setShowFilter(prev=>!prev)} className="px-6 py-1.5 rounded border border-gray-400 lg:hidden">
        {showFilter?"close filter":"show filter"}
       </button>
        {/* Categories */}
        <div className={showFilter?"block":"hidden lg:block "}>
          <h4 className="font-medium text-lg mb-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-700">
            {JobCategories?.map((category, index) => (
              <li className="flex items-center gap-3" key={index}>
                <input
                  className="scale-110 accent-blue-500 cursor-pointer"
                  type="checkbox"
                  id={`category-${index}`}
                  onChange={()=>handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                <label htmlFor={`category-${index}`}>{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div className={showFilter?"block":"hidden lg:block"}>
          <h4 className="font-semibold text-lg mb-4">Search by Locations</h4>
          <ul className="space-y-3 text-gray-700">
            {JobLocations?.map((location, index) => (
              <li className="flex items-center gap-3" key={index}>
                <input
                  className="scale-110 accent-blue-500 cursor-pointer"
                  type="checkbox"
                  id={`location-${index}`}
                   onChange={()=>handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                <label htmlFor={`location-${index}`}>{location}</label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4 text-gray-800">
        <h3 className="font-semibold text-3xl mb-1">Latest Jobs</h3>
        <p className="text-gray-500 mb-6">
          Get your desired job from top companies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=>(
                <JobCard key={index} job={job}/>
            ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length>0&& (<div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list"><img onClick={()=>setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="" /></a>
            {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
               <a key={index} href="#job-list">
                <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage===index+1?'bg-blue-100 text-blue-500':'text-gray-500'}`}>{index+1}</button>
               </a>
            ))}
            <a href="#job-list"><img onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))} src={assets.right_arrow_icon} alt="" /></a>

        </div>)}
      </section>

    </div>
  );
};

export default JobListing;
