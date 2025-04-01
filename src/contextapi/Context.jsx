import React, { createContext, useState } from 'react';

// Create Context
export const MyContext = createContext();

const Context = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState({
    adress:"",
    lat:0,
    lng:0
  });
  const [dropLocation, setDropLocation] = useState({
    address:"",
    lat:0,
    lng:0
  });

  return (
    <MyContext.Provider value={{ pickupLocation, setPickupLocation, dropLocation, setDropLocation }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
