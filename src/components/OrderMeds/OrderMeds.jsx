import React, { useState } from "react";
import "./OrderMeds.css";

const OrderMeds = () => {
  const [medicationName, setMedicationName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");

  const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
  const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.REACT_APP_TWILIO_PHONE_NUMBER;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/medications/send-whatsapp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "+91930772873",
            from: `${twilioPhoneNumber}`,
            body: `This is an order request from MedCompanion for patient Indira K.Order: ${quantity} ${type} of ${medicationName}(s)`,
          }),
        }
      );

      if (response.status === 200) {
        console.log(
          `Ordering ${quantity} ${medicationName}(s) - Message sent!`
        );
        alert(
          `Order successfully placed for ${quantity} ${type} of ${medicationName}(s).`
        );
      } else {
        console.error("Error sending WhatsApp message:", response.status);
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  };

  return (
    <div className="order">
      <h2>Order Medications</h2>
      <form onSubmit={handleOrderSubmit} className="order-form">
        <div className="input-group">
          <label htmlFor="medicationName" className="label mandatory light">
            Medication Name
            <span>*</span>
          </label>
          <input
            type="text"
            id="medicationName"
            placeholder="Type in the medicine/pill name"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
            className="inp-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="quantity" className="label mandatory light">
            Quantity
            <span>*</span>
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            placeholder="Enter the quantity of medicine/pill "
            onChange={(e) => setQuantity(e.target.value)}
            className="inp-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="type" className="label mandatory light">
            Type
            <span>*</span>
          </label>
          <input
            type="text"
            id="type"
            placeholder="Mention the type of pill"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="inp-field"
          />
        </div>
        <button className="order-button" type="submit">
          Order
        </button>
      </form>
    </div>
  );
};

export default OrderMeds;
