import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMedicationContext } from "./components/MedicationContext";
import { useFormData } from "./components/FromDataContext";

const AlanContainer = () => {
  const rootElRef = useRef(null);
  const navigate = useNavigate(); // Use the useNavigate hook to access navigation functions
  const { showMed, handleClick } = useMedicationContext(); // Use your context
  const { formData, setFormData } = useFormData();
  useEffect(() => {
    alanBtn({
      key: "b206627e11034544c6145e87d15d98952e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log(commandData);

        if (commandData.command === "openForm") {
          handleClick();
        }
        if (commandData.command === "name") {
          console.log(commandData.data);
          setFormData({
            ...formData,
            name: commandData.data,
          });
        }
      },
    });
  }, []);

  return (
    <div className="alan-btn-container">
      <div ref={rootElRef}></div>
    </div>
  );
};

export default AlanContainer;
