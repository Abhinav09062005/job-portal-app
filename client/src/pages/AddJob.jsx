import React, { useEffect, useRef, useState, useContext } from 'react';
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + '/api/company/post-job',
        { title, description, location, salary, level, category },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSalary(0);

        // Clear description editor
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write job description here...',
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Add New Job</h2>

      {/* Job Title */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          placeholder="Type job title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Job Description */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium text-gray-700">Job Description</label>
        <div
          ref={editorRef}
          className="h-40 border border-gray-300 rounded-lg p-2 focus:outline-none"
        ></div>
      </div>

      {/* Select Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Category */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Job Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {JobCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Job Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {JobLocations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Job Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      {/* Salary */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium text-gray-700">Job Salary</label>
        <input
          type="number"
          placeholder="2500"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
