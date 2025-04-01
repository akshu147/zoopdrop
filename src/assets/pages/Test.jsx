import React from 'react';
import Autocomplete from 'react-google-autocomplete';

const Test = () => {
  return (
    <div style={{ padding: "20px" }} className='border text-white'>
      <h1>Google Autocomplete Example</h1>
      <Autocomplete
        apiKey="AIzaSyB5jk1PqvooOy0lab0OaNWzN8dYgdOuBOY"  // Replace with your actual API key
        onPlaceSelected={(place) => {
          console.log("Selected Place:", place);
        }}
        options={{
          types: ['(cities)'], // Restrict results to cities; you can change this as needed
          componentRestrictions: { country: "IN" }  // Restrict to a specific country
        }}
        style={{
          width: "90%",
          padding: "10px",
          fontSize: "16px"
        }}
        placeholder="Enter a location"
      />
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit facere dicta, laudantium cumque necessitatibus. Molestias modi veniam, ut eius, minima qui, provident ratione ipsam reprehenderit corporis veritatis! Laudantium, harum.
    </div>
  );
};

export default Test;
