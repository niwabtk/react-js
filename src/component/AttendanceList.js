import React, { useState,useEffect } from 'react';
import AddAttendance from './AddAttendance';
import EditAttendance from './EditAttendance';
const url = "https://latihan-f28f4-default-rtdb.firebaseio.com/absensi.json"
const AttendanceList = () => {
  const [attendances, setAttendances] = useState([
    // { id: 1, nama: 'John', kelas: 'XII IPA 1', tanggal: '2022-01-01', status: 'Hadir' },
    // { id: 2, nama: 'Janet', kelas: 'XII IPA 2', tanggal: '2022-01-01', status: 'Izin' },
    // { id: 3, nama: 'Bobi', kelas: 'XII IPS 1', tanggal: '2022-01-02', status: 'Sakit' },
    // { id: 4, nama: 'Alice', kelas: 'XII IPS 2', tanggal: '2022-01-02', status: 'Alpa' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAttendance, setEditAttendance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const myFetch = async () => {
      try {
        let response = await fetch(url, {
        })
        // alert("data berhasil diambil");
        if (!response.ok) {
          throw new Error(response.status);
        }
        const dataResponse = await response.json();
        // console.log(response.json());
        const tampungData = [];
        for (const vv in dataResponse) {
          if (Object.hasOwnProperty.call(dataResponse, vv)) {
            const i = dataResponse[vv];
            // console.log(i.nama);
            tampungData.push({
              id : vv,
              nama : i.nama,
              kelas : i.kelas,
              tanggal : i.tanggal,
              status : dataResponse[vv].status
            })
          }
        }

        setAttendances(tampungData);
        
      }
      catch (error) {
        alert(`Terjadi gangguan dengan pesan:"${error}"`);
      }
    }
    myFetch();

  },[])

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
