import axios from "axios";
import { useState } from "react";
import "./AddEmergencyContact.css";
import { useEffect } from "react";
const AddEmergencyContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    number: "",
  });

  const { name, relation, number } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:5000/api/medications/relative", formData)
      .then((response) => {
        console.log("Relative added:", response.data);
        getContacts();
        setFormData({
          name: "",
          relation: "",
          number: "",
        });

        // Optionally, you can reset the form or perform other actions after a successful request.
      })
      .catch((error) => {
        console.error("Error adding relative:", error);
        // Handle the error appropriately, e.g., display an error message to the user.
      });
  };

  const [contacts, setContacts] = useState([]);

  const getContacts = () => {
    axios
      .get("http://localhost:5000/api/medications/relative")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching emergency contacts:", error);
      });
  };
  useEffect(() => {
    // Fetch emergency contacts from the server
    getContacts();
  }, []); // The empty dependency array ensures the fetch runs only once

  return (
    <div className="connection">
      <form className="add_emer" onSubmit={handleSubmit}>
        <h2>Emergency Contacts</h2>

        <div className="input-group">
          <div className="label-group">
            <label className={`label mandatory light`} htmlFor="name">
              Name
              <span>*</span>
            </label>
          </div>
          <input
            name="name"
            placeholder="Enter relative's name"
            className="inp-field"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <div className="label-group">
            <label className={`label mandatory light`} htmlFor="relation">
              Relation
              <span>*</span>
            </label>
          </div>
          <input
            name="relation"
            placeholder="Enter relation"
            className="inp-field"
            type="text"
            value={relation}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <div className="label-group">
            <label className={`label mandatory light`} htmlFor="number">
              Mobile Number
              <span>*</span>
            </label>
          </div>
          <input
            name="number"
            placeholder="Enter mobile number"
            className="inp-field"
            type="text"
            value={number}
            onChange={handleChange}
          />
        </div>
        <button className="add-button" type="submit">
          Add Relative
        </button>
      </form>
      <div className="contact-list-main">
        <h2>Emergency Contacts List</h2>
        <ul className="contact-list">
          {contacts.map((contact, index) => (
            <li key={index} className="contact-item">
              <p className="contact-info">
                <strong>Name:</strong> {contact.name}
              </p>
              <p className="contact-info">
                <strong>Relation:</strong> {contact.relation}
              </p>
              <p className="contact-info">
                <strong>Mobile Number:</strong> {contact.number}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddEmergencyContact;
