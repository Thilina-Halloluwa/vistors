import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

function CheckOutPage() {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitorId, setSelectedVisitorId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchCheckedInVisitors = async () => {
      const q = query(collection(db, "visitors"), where("checkOutTime", "==", null));
      const querySnapshot = await getDocs(q);
      const visitorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVisitors(visitorsList);
    };
    fetchCheckedInVisitors();
  }, []);

  const handleCheckOut = async () => {
    if (!selectedVisitorId) return;
    const visitorRef = doc(db, "visitors", selectedVisitorId);
    await updateDoc(visitorRef, { checkOutTime: serverTimestamp() });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="form-container success">
        <h2>Thank You for Visiting! 👋</h2>
        <p>You have been successfully checked out.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>Visitor Check-Out</h1>
      <p>Please select your name from the list below.</p>
      <select onChange={(e) => setSelectedVisitorId(e.target.value)} value={selectedVisitorId}>
        <option value="">-- Select Your Name --</option>
        {visitors.map(visitor => (
          <option key={visitor.id} value={visitor.id}>{visitor.name} from {visitor.company}</option>
        ))}
      </select>
      <button onClick={handleCheckOut} disabled={!selectedVisitorId}>Complete Check-Out</button>
    </div>
  );
}

export default CheckOutPage;