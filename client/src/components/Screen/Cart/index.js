import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../../../contextApi/cart';
import Banner from './Banner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextApi/auth';
import Swal from 'sweetalert2';

const Index = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [courses, setCourses] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = auth?.user?._id;
  const [discountAmount, setDiscountAmount] = useState(null);


  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    calculateSubtotal();
  }, [cart]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/v1/auth/course');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleRemove = (courseId) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === courseId);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const [isDiscountApplied, setIsDiscountApplied] = useState(false);



  const handleApplyDiscount = () => {
    const discountPercentage = 10;

    if (discountCode === 'DISCOUNT10') {
      const discountAmount = (subtotal * discountPercentage) / 100;
      const discountedSubtotal = subtotal - discountAmount;
      setSubtotal(discountedSubtotal);
      setDiscountCode('');
      setIsDiscountApplied(true); // Set the flag to indicate the discount is applied.
      setDiscountAmount(discountAmount); // Save the discount amount in state.
      toast.success('Discount applied!');
    } else {
      toast.error('Invalid discount code.');
    }
  };

  const handleRemoveDiscount = () => {
    const discountPercentage = 10;
    const originalSubtotal = subtotal + discountAmount;
    setSubtotal(originalSubtotal);
    setIsDiscountApplied(false); // Set the flag to indicate the discount is removed.
    setDiscountAmount(null); // Reset the discount amount to null.
  };
  const total = cart.reduce((acc, course) => acc + course.fee, 0);
  const calculateSubtotal = () => {

    setSubtotal(total);
  };

  const handlePayment = async () => {
    if (!auth.user) {
      toast.error('please login to checkout')
      return;
    }
    if (!isDiscountApplied) {
      toast.error('Please apply a valid discount code before checkout.');
      return;
    }
    try {
      const confirmResult = await Swal.fire({
        title: 'Confirm Purchase',
        text: 'Are you sure you want to proceed with the payment?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      });

      if (confirmResult.isConfirmed) {
        setLoading(true);
        const { data } = await axios.post('/api/v1/auth/course_purchase', {
          cart,
          userId,
        });
        setLoading(false);
        localStorage.removeItem('cart');
        setCart([]);
        navigate('/user/mycourses');
        toast.success('Payment Completed Successfully ');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="px-4 w-full md:w-3/4 lg:w-1/2">
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-center mb-2">
            Secure One-Step Checkout
          </h1>
          <h1 className="text-center text-2xl font-bold text-blue-400">
            Your Product Will Become Available Immediately After Purchase
          </h1>
        </div>
        <Banner />
        <h3 className="text-lg font-bold leading-normal mt-2  text-gray-800">
          Review your order
        </h3>

        <p>The following items have been added to your shopping cart.</p>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
          <div className="px-4 py-5 flex-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">S.No.</th>
                  <th className="px-4 py-2">Product Description</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((course, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{course.name}</td>
                    <td className="border px-4 py-2">${course.fee}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleRemove(course._id)}
                        className="flex items-center text-red-500"
                      >
                        <FaTrash className="mr-1" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isDiscountApplied ? (
              <button
                onClick={handleRemoveDiscount}
                className="mt-2 inline-block bg-red-400 text-white font-bold px-6 py-2 rounded-md shadow hover:shadow-lg"
              >
                Remove Discount
              </button>
            ) : (
              <div className="mb-4 relative mt-4">
                <label className="block text-blueGray-700 text-sm font-bold mb-2 text-center">
                  Promotion code: <span className="text-red-500">*</span>
                </label>
                <div className="flex items-stretch">
                  <input
                    required
                    placeholder="Discount code"
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="border-solid border-black border-2 px-3 py-2 text-sm w-full placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:border-lightBlue-500 transition duration-200"
                  />

                  <button
                    onClick={handleApplyDiscount}
                    className="ml-2 inline-block bg-green-400 text-white font-bold px-6 py-2 rounded-md shadow hover:shadow-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {isDiscountApplied && (
              <div>
                <hr className="mt-4 mb-2 bg-blueGray-300 ml-0" />
                <div className="flex justify-between">
                  <h6 className="text-blueGray-700 leading-normal mt-0 mb-2">
                    Subtotal
                  </h6>
                  <h6 className="leading-normal mt-0 mb-2">${total}</h6>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-blueGray-700 leading-normal mt-0 mb-2">
                    Discount
                  </h6>
                  <h6 className="leading-normal mt-0 mb-2">- ${discountAmount}</h6>
                </div>
              </div>
            )}

            <div>
              <hr className="mt-4 mb-2 bg-blueGray-300 ml-0" />
              <div className="flex justify-between">
                <h6 className="text-blueGray-700 leading-normal mt-0 mb-2">
                  Final Price
                </h6>
                <h6 className="leading-normal mt-0 mb-2">${subtotal}</h6>
              </div>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="ml-2 inline-block bg-green-400 text-white font-bold px-6 py-2 rounded-md shadow hover:shadow-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
