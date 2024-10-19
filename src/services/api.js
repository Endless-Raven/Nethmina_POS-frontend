import axios from "axios";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.API_BASE_URL;

export function useMobileForImei() {
    
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMobileData = async (endpoint,params) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
        params,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching mobile data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchMobileData }; 
}
