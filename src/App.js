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
  const results = data.results;
  // to see all data from scheme see: <pre>{JSON.stringify(data, null, 2)}</pre>
  return (
    <>
      <h1>{results[0].name.first} {results[0].name.last}</h1>
      <img src={results[0].picture.medium} alt="random user"/>
      <p>gender: {results[0].gender}</p>
      <p>age: {results[0].dob.age}</p>
      <p>from: {results[0].location.city}, {results[0].location.country}</p>
      <p>email: {results[0].email}</p>
      <p>cell: {results[0].cell}</p>
    </>
  );
}
