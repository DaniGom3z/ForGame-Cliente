// En useLongPolling.js
import { useState, useEffect } from "react";

const useLongPolling = (endpoint, interval = 5000) => {
  const [data, setData] = useState({ totalUsuarios: 0 });

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const newData = await response.json();
        setData(newData);

        // Realizar la siguiente solicitud automáticamente
        fetchData();
      } else {
        console.error('Error al obtener datos:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Iniciar la primera solicitud

    // Limpieza para evitar fugas de memoria
    return () => {};
  }, [endpoint]);

  return data;
};

export default useLongPolling;
