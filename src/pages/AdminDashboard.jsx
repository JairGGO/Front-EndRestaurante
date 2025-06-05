// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/admin/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      const response = await api.post('/admin/products', productData);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // ... renderizado del dashboard
};

export default AdminDashboard;