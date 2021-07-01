/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';
import Gender from './results.js';

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
  const gender = results[0].gender;
  const location = results[0].location.city + ', '+ results[0].location.country;
  // to see all data from scheme see: <pre>{JSON.stringify(data, null, 2)}</pre>
  return (
    <>
      <div className="head">
        <h1>{results[0].name.first} {results[0].name.last}</h1>
        <img src={results[0].picture.medium} alt="random user"/>
      </div>
      <p>gender: {Gender(gender)}</p>
      <p>age: {results[0].dob.age}</p>
      <p>from: {location}</p>
      <p>email: {results[0].email}</p>
      <p>cell: {results[0].cell}</p>
    </>
  );
}
