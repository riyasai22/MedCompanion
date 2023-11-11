import React, { createContext, useContext, useState } from "react";

const MedicationContext = createContext();

export const useMedicationContext = () => {
  return useContext(MedicationContext);
};

export const MedicationProvider = ({ children }) => {
  const [showMed, setShowMed] = useState(false);

  const handleClick = () => {
    setShowMed(!showMed);
  };

  return (
    <MedicationContext.Provider value={{ showMed, handleClick }}>
      {children}
    </MedicationContext.Provider>
  );
};
