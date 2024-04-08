import React, { createContext, useState, useContext } from 'react';

const EllipsisOptionsContext = createContext();

export const useEllipsisOptions = () => useContext(EllipsisOptionsContext);

export const EllipsisOptionsProvider = ({ children }) => {
  const [showEllipsisOptions, setShowEllipsisOptions] = useState(false);
  const [showAlert,setShowAlert] = useState(false);
  
  const toggleEllipsisOptions = () => {
    setShowEllipsisOptions(!showEllipsisOptions);
    setShowAlert(false);
  };

  const hideEllipsisOptions = () => {
    setShowEllipsisOptions(false);
  };

  
  const displayAlert = () => {
    setShowAlert(true);
  };

  
  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <EllipsisOptionsContext.Provider value={{ hideAlert,displayAlert,showAlert,showEllipsisOptions, toggleEllipsisOptions, hideEllipsisOptions }}>
      {children}
    </EllipsisOptionsContext.Provider>
  );
};
