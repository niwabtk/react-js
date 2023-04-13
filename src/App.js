import React, { useState } from 'react';
import AttendanceList from './component/AttendanceList';
import AddAttendance from './component/AddAttendance';
import EditAttendance from './component/EditAttendance';



const App = () => {
  const [attendance, setAttendance] = useState([
    { id: 1, nama: 'Joni', kelas: '10A', tanggal: '2022-01-01', status: 'Hadir' },
    { id: 2, nama: 'Dewi', kelas: '10B', tanggal: '2022-01-02', status: 'Hadir' },
    { id: 3, nama: 'Budi', kelas: '10C', tanggal: '2022-01-03', status: 'Hadir' },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState({ id: null, nama: '', kelas: '', tanggal: '', status: '' });

  const addAttendance = (newAttendance) => {
    const id = attendance.length + 1;
    const newAttendanceWithId = { id, ...newAttendance };
    setAttendance([...attendance, newAttendanceWithId]);
  };

  const deleteAttendance = (id) => {
    setAttendance(attendance.filter((item) => item.id !== id));
  };

  const editAttendance = (updatedAttendance) => {
    setAttendance(
      attendance.map((item) => (item.id === updatedAttendance.id ? updatedAttendance : item))
    );
    setCurrentAttendance({ id: null, nama: '', kelas: '', tanggal: '', status: '' });
    setEditing(false);
  };

  const setEditAttendance = (id) => {
    const item = attendance.find((item) => item.id === id);
    setCurrentAttendance(item);
    setEditing(true);
  };

  return (
    <div>
      <h1 className='text-center'>Sistem Absensi Sekolah</h1>
      {editing ? (
        <EditAttendance attendance={currentAttendance} onEdit={editAttendance} />
      ) : (
        <div>
          <AddAttendance onAdd={addAttendance} />
          <AttendanceList attendance={attendance} onDelete={deleteAttendance} onEdit={setEditAttendance} />
        </div>
      )}
    </div>
  );
};

export default App;
