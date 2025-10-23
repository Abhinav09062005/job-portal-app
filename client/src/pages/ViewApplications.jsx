import React, { useState } from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = index => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">View Job Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Resume</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={applicant.imgSrc}
                    alt={applicant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800 font-medium">{applicant.name}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{applicant.jobTitle}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{applicant.location}</td>
                <td className="px-4 py-3 text-sm text-blue-600 font-medium">
                  <a href={applicant.resumeLink || '#'} target="_blank" className="flex items-center gap-1">
                    Resume <img src={assets.resume_download_icon} alt="Download" className="w-4 h-4" />
                  </a>
                </td>
                <td className="px-4 py-3 text-sm relative">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    ...
                  </button>
                  {openDropdown === index && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                      <button className="block w-full text-left px-3 py-1 text-sm text-green-600 hover:bg-green-50">
                        Accept
                      </button>
                      <button className="block w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-red-50">
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
