import React, { useState } from "react";

const BookingForm = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, service });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full mb-3 px-3 py-2 border rounded"
      />
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        required
        className="w-full mb-3 px-3 py-2 border rounded"
      >
        <option value="">Select Service</option>
        <option value="Hair">Hair</option>
        <option value="Skin">Skin</option>
        <option value="Massage">Massage</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
