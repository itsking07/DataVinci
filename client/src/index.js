import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contextApi/auth';
import { Toaster } from 'react-hot-toast';
import {CartProvider} from './contextApi/cart'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AuthProvider>
    <CartProvider>
    <Toaster />
    <App />
    </CartProvider>
  </AuthProvider>
);


