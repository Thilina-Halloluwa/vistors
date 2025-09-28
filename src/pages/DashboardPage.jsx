import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
// Import our new chart components
import VisitorsByCompanyChart from './VisitorsByCompanyChart';
import HourlyTrafficChart from './HourlyTrafficChart';

function DashboardPage() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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


  // This hook calculates the filtered list of visitors
const filteredVisitors = useMemo(() => {
  if (!searchTerm) {
    // If the search bar is empty, return the original full list
    return visitors;
  }
  // Otherwise, filter the list
  return visitors.filter(visitor =>
    // Convert both the name and search term to lower case for case-insensitive matching
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [visitors, searchTerm]); // Dependencies: This code re-runs only when visitors or searchTerm changes




  // --- DATA PROCESSING FOR CHARTS ---
  // useMemo prevents this heavy calculation from running on every single render.
  const chartData = useMemo(() => {
    // 1. Process data for the Bar Chart (Visitors by Company)
    const companyCounts = visitors.reduce((acc, visitor) => {
      const company = visitor.company || 'Unknown';
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    }, {});
    const companyData = Object.keys(companyCounts).map(company => ({
      company,
      visitors: companyCounts[company],
    }));

    // 2. Process data for the Line Chart (Visitors by Hour)
    const hourCounts = visitors.reduce((acc, visitor) => {
      if (visitor.checkInTime) {
        const hour = visitor.checkInTime.toDate().getHours(); // Get hour (0-23)
        acc[hour] = (acc[hour] || 0) + 1;
      }
      return acc;
    }, {});
    const trafficData = Array.from({ length: 24 }, (_, i) => {
      const hourLabel = i.toString().padStart(2, '0') + ':00'; // Format as "09:00"
      return { hour: hourLabel, visitors: hourCounts[i] || 0 };
    }).filter(h => h.visitors > 0); // Optionally filter to only show hours with visitors

    return { companyData, trafficData };
  }, [visitors]); // This dependency array tells useMemo to re-run only when 'visitors' changes

return (
    <div className="dashboard-container">
      {!loading && (
        <div className="charts-container">
          <div className="chart">
            <h2>Visitors by Company</h2>
            <VisitorsByCompanyChart data={chartData.companyData} />
          </div>
          <div className="chart">
            <h2>Hourly Check-In Traffic</h2>
            <HourlyTrafficChart data={chartData.trafficData} />
          </div>
        </div>
      )}

      {/* Wrap the log in a new container */}
      <div className="log-container">
        <h2>Visitor Log</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>Loading visitors...</p>}
        
        <div className="table-wrapper">
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
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className={visitor.checkOutTime ? 'checked-out' : ''}>
                  <td>{visitor.name}</td>
                  <td>{visitor.company}</td>
                  <td>{visitor.checkInTime?.toDate().toLocaleTimeString()}</td>
                  <td>{visitor.checkOutTime ? visitor.checkOutTime.toDate().toLocaleTimeString() : '---'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;