/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
export default function App() {
  const [data, setData]=useState(null);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  useEffect(()=>{
    axios('https://randomuser.me/api')
        .then((response)=>{
          setData(response.data);
        })
        .catch((error)=>{
          console.error('Error fetching data: ', error);
          setError(error);
        })
        .finally(()=>{
          setLoading(false);
        });
  }, []);
  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return 'Error!' + error;
  }
  return (
    <>
      <h1>ladrão de galinha</h1>
      <img src={data.results[0].picture.medium} alt="random user"/>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
