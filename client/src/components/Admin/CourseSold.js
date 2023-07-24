import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Global/Spinner';

const SoldCourses = () => {
  const [soldCourses, setSoldCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchSoldCourses();
  }, []);

  const fetchSoldCourses = async () => {
    try {
      const response = await axios.get('/api/v1/auth/admin/sold/courses');
      const { courseOrders } = response.data;
      setSoldCourses(courseOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sold courses:', error);
      setError('Error fetching sold courses. Please try again later.'); // Set error message in case of error
      setLoading(false);
    }
  };

  const formatLocalDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className='p-10'>
      <h1 className='text-center font-bold text-xl '>Sold Courses</h1>
      {loading ? ( 
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p> // Display error message if there's an error
      ) : soldCourses.length === 0 ? (
        <p>No sold courses found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {soldCourses.map((course) => (
            <div key={course._id} className="border p-4 rounded-lg shadow">
              <p className="font-bold">Title:</p>
              <ul>
                {course.courses.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
              <p className="font-bold mt-2">Price: ${course.totalAmount}</p>
              <p className="font-bold mt-2">Date of Purchase: {formatLocalDate(course.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoldCourses;
