import { useState } from 'react';
import AdminTerrainsList from'../components/admin/AdminTerrainsList';
import AdminOverpassImport from '../components/admin/AdminOverpassImport';
import AdminReservations from '../components/admin/AdminReservations';
import '../components/admin/Admin.css';

const AdminTerrains = () => {
  const [activeTab, setActiveTab] = useState('terrains');
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div className="admin-container">
      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'terrains' ? 'active' : ''}`} onClick={() => setActiveTab('terrains')}>🗂️ Terrains</button>
        <button className={`admin-tab ${activeTab === 'import' ? 'active' : ''}`} onClick={() => setActiveTab('import')}>🌍 Import Overpass</button>
        <button className={`admin-tab ${activeTab === 'reservations' ? 'active' : ''}`} onClick={() => setActiveTab('reservations')}>📅 Réservations</button>
      </div>

      {activeTab === 'terrains' && <AdminTerrainsList refreshTrigger={refresh} onRefresh={handleRefresh} />}
      {activeTab === 'import' && <AdminOverpassImport onImport={handleRefresh} />}
      {activeTab === 'reservations' && <AdminReservations />}
    </div>
  );
};

export default AdminTerrains;