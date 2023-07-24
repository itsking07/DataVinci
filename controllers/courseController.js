import Course from "../models/Course.js";
import CourseOrder from '../models/CourseOrder.js'

export const getCourseController = async (req, res) => {
    try {
      const courses = await Course.find({});
  
      if (courses.length === 0) {
        return res.status(404).json({ message: 'No courses found.' });
      }
  
      return res.status(200).json({ courses });
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const purchaseCourseController = async (req, res) => {
    try {
        const { cart, userId } = req.body; 
    
        const totalAmount = cart.reduce((acc, course) => acc + course.fee, 0);
    
        const order = await CourseOrder.create({
          user: userId,
          courses: cart,
          totalAmount,
        });
    
        // Send the response to the client
        res.status(201).json({ success: true, data: order });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Payment failed' });
      }
};

export const showCourseController = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const courseOrders = await CourseOrder.find({ user: userId }).populate('courses');
  
      if (courseOrders.length === 0) {
        return res.status(404).json({ error: 'No course orders found for the user' });
      }
  
      res.status(200).json({ success: true, data: courseOrders });
    } catch (error) {
      console.error('Error fetching course orders:', error);
      res.status(500).json({ error: 'Failed to fetch course orders' });
    }
  };
  
  

  export const soldCoursesController = async (req, res) => {
    try {
      // Find all sold course orders
      const courseOrders = await CourseOrder.find();
  
      if (courseOrders.length === 0) {
        return res.status(404).json({ message: 'No sold courses found.' });
      }
  
      // Send the response to the client
      res.status(200).json({ courseOrders });
    } catch (error) {
      console.error('Error fetching sold courses:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  