import React, { useState } from 'react';
import AddAttendance from './AddAttendance';
import EditAttendance from './EditAttendance';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([
    { id: 1, nama: 'John Doe', kelas: 'XII IPA 1', tanggal: '2022-01-01', status: 'Hadir' },
    { id: 2, nama: 'Jane Doe', kelas: 'XII IPA 2', tanggal: '2022-01-01', status: 'Izin' },
    { id: 3, nama: 'Bob Smith', kelas: 'XII IPS 1', tanggal: '2022-01-02', status: 'Sakit' },
    { id: 4, nama: 'Alice Smith', kelas: 'XII IPS 2', tanggal: '2022-01-02', status: 'Alpa' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAttendance, setEditAttendance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = (attendance) => {
    const newAttendance = { id: Date.now(), ...attendance };
    setAttendances([...attendances, newAttendance]);
    setShowAddForm(false);
  };

  const handleEdit = (attendance) => {
    const updatedAttendances = attendances.map((a) => (a.id === attendance.id ? attendance : a));
    setAttendances(updatedAttendances);
    setEditAttendance(null);
    setShowEditForm(false);
  };

  const handleDelete = (attendanceId) => {
    const updatedAttendances = attendances.filter((a) => a.id !== attendanceId);
    setAttendances(updatedAttendances);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setEditAttendance(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAttendances = attendances.filter(
    (attendance) =>
      attendance.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.tanggal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Daftar Absensi</h1>
      <div className='container'>
      <button onClick={() => setShowAddForm(true)} className='btn btn-success'>
          Tambah Data
        </button>&nbsp;<br/><br/>
  
  
  <input className='form-control' type="text" placeholder="Cari berdasarkan nama atau tanggal" onChange={handleSearch} />

       
      <table className='table table-striped table-hover border border-dark'>
        <thead>       
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendances.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.id}</td>
              <td>{attendance.nama}</td>
              <td>{attendance.kelas}</td>
              <td>{attendance.tanggal}</td>
              <td>{attendance.status}</td>
              <td>
                <button onClick={() => { setEditAttendance(attendance); setShowEditForm(true); }} className='btn btn-primary'>Edit</button>&nbsp;
                <button onClick={() => handleDelete(attendance.id)} className='btn btn-danger'>Hapus</button>
              </td>
            </tr>
        ))}
        </tbody>
        </table>
      </div>
        {showAddForm && <AddAttendance handleAdd={handleAdd} handleCancel={handleCancel} />}
        {showEditForm && (
        <EditAttendance attendance={editAttendance} handleEdit={handleEdit} handleCancel={handleCancel} />
        )}
        </div>
        );
        };

        export default AttendanceList;
