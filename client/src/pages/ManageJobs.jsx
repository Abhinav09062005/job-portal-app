import React from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useEffect } from 'react';

const ManageJobs = () => {
  const navigate=useNavigate()
  const [jobs,setJobs]=useState(false)
  const {backendUrl,companyToken}=useContext(AppContext)
  const fetchCompanyJobs=async()=>{
       try {
        const{data}=await axios.get(backendUrl+'/api/company/list-jobs',{headers:{token:companyToken}})
       
      if(data.success){
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData);
        
      } else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.message)
       }
  }
  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs()
    }
  },[companyToken])
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Jobs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Visible</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {manageJobsData.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">{job.title}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{moment(job.date).format('ll')}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{job.location}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{job.applicants}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded' >Add new Job</button>
      </div>
    </div>
  );
};

export default ManageJobs;
