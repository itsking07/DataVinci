import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../contextApi/cart';
import toast from 'react-hot-toast';

const CourseList = () => {
    const [cart, setCart] = useCart()
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/v1/auth/course');
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddToCart = (course) => {
        if (cart.some((item) => item._id === course._id)) {
          toast.error('This course is already in the cart.');
        } else {
          setCart([...cart, course]);
          localStorage.setItem('cart', JSON.stringify([...cart, course]));
          toast.success('Course added to cart');
        }
      }; 

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Course: {course.name}</h2>
                        <p className="text-gray-600 mb-2">Course Type: {course.type}</p>
                        <p className="text-gray-600 mb-2">Course Fee: Rs{course.fee}</p>
                        <p className="text-gray-600">
                            {course.discountCoupon ? (
                                <span>Discount Coupon: {course.discountCoupon}</span>
                            ) : (
                                <span className="text-red-500">Discount Coupon: N/A</span>
                            )}
                        </p>
                        <p className="text-gray-600">
                            Expiry Time: {new Date(course.expiryTime).toDateString()}
                        </p>
                        <p className="mt-4">{course.description}</p>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAddToCart(course)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
