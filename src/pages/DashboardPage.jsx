import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function DashboardPage() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'visitors'), orderBy('checkInTime', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const visitorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVisitors(visitorsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <header>
        <h1>Receptionist Dashboard</h1>
      </header>
      <main>
        {loading && <p>Loading visitors...</p>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className={visitor.checkOutTime ? 'checked-out' : ''}>
                <td>{visitor.name}</td>
                <td>{visitor.company}</td>
                <td>{visitor.checkInTime?.toDate().toLocaleTimeString()}</td>
                <td>{visitor.checkOutTime ? visitor.checkOutTime.toDate().toLocaleTimeString() : '---'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default DashboardPage;