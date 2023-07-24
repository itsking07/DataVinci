import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contextApi/auth';
import axios from 'axios';

const CourseOrders = () => {
  const [auth] = useAuth();
  const [courseOrders, setCourseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = auth?.user?._id;

  const fetchCourseOrdersByUserId = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/auth/user/allcourse/${userId}`);
      const data = response.data;

      if (data.success) {
        setCourseOrders(data.data);
        setError(null); 
      } else {
        setError(data.error || 'Course orders not found'); 
      }

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Course orders not found');
      } else {
        setError('An error occurred while fetching course orders.');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseOrdersByUserId(userId);
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Course Orders</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : courseOrders.length === 0 ? (
        <p className="text-gray-500">No course orders found.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courseOrders.map((order) => (
            <li key={order._id} className="border rounded-lg p-4 bg-white shadow-md">
              <h2 className="text-lg font-bold mb-2">{auth?.user.name}'s Order</h2>
              <p className="text-blue-500">
                <strong>Ordered Date</strong> : {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <ul>
                {order.courses.map((course) => (
                  <li key={course._id} className="flex items-center justify-between py-1">
                    <p className="flex-1">{course.name}</p>
                    <span className="text-blue-500">${course.fee}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center">
                <p className="font-bold">Total Amount:</p>
                <span className="ml-2 text-green-500">${order.totalAmount}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseOrders;
