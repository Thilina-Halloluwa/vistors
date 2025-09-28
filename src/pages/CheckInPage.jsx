import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function CheckInPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !company) return;

    await addDoc(collection(db, "visitors"), {
      name: name,
      company: company,
      checkInTime: serverTimestamp(),
      checkOutTime: null,
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="form-container success">
        <h2>Thank You! ✅</h2>
        <p>You have been successfully checked in.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>Visitor Check-In</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Company</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
        <button type="submit">Complete Check-In</button>
      </form>
    </div>
  );
}

export default CheckInPage;