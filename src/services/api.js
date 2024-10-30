import axios from "axios";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.API_BASE_URL;

export function useMobileForImei() {                  // get data by sending query
    
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

export function useGetWithoutQuery() {                // get data without sending anything
    
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching getting data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData }; 
}



export function useUpdateWithData() {                   // update database with sending form data
    
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint,data) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/${endpoint}`,data);
      setData(response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData }; 
}

export function useUpdateWithQuery() {                   // update database (state)
    
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (endpoint,data) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/${endpoint}`,{data});
      setData(response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, updateStatus }; 
}



export function useDelete() {                           // delete
    
  const [data1, setData] = useState(null);
  const [error1, setError] = useState(null);
  const [loading1, setLoading] = useState(false);

  const deleteData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data1, error1, loading1, deleteData }; 
}

export function usePost() {                           // post data with form data
    
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (endpoint,formData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`,formData);
      setData(response.data);
    } catch (error) {
      console.error("Error Posting data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData }; 
}