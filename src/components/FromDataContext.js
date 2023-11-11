import React, { createContext, useState, useContext } from "react";

const FormDataContext = createContext();

export const useFormData = () => {
  return useContext(FormDataContext);
};

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    icon: "",
    name: "",
    dosage: "",
    type: "",
    instruction: "",
    medicationPeriod: "",
    medicationPeriodType: "",
    reminder: "",
    days: "",
    alarmSound: "",
    alarmDuration: "",
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;
