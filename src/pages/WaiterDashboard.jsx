// src/pages/WaiterDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

const WaiterDashboard = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await api.get('/waiter/tables');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const openTable = async (tableId) => {
    try {
      await api.post(`/waiter/tables/${tableId}/open`);
      // Actualizar el estado de las mesas
      const updatedTables = tables.map(table => 
        table.id === tableId ? { ...table, status: 'BUSY' } : table
      );
      setTables(updatedTables);
    } catch (error) {
      console.error('Error opening table:', error);
    }
  };

  // ... renderizado del dashboard
};

export default WaiterDashboard;