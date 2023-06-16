import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref,set } from "firebase/database";
const url = "https://latihan-f28f4-default-rtdb.firebaseio.com/absensi.json"
const EditAttendance = ({ attendance, onUpdate, onCancel }) => {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    setNama(attendance.nama);
    setKelas(attendance.kelas);
    setTanggal(attendance.tanggal);
    setStatus(attendance.status);
    setId(attendance.id);
  }, [attendance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const updatedAttendance = { ...attendance, nama, kelas, tanggal, status };
    // onUpdate(updatedAttendance);
    set(ref(database, 'latihan/' + id), {
      nama,
      kelas,
      tanggal,
      status
    })
      .then(() => {
        // Data saved successfully!
        alert('data sukses update')
      })
      .catch((error) => {
        alert('data gagal update');
        // The write failed...
      });


  };

  return (
    <div>
      <h2>Edit Data Absensi</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama:
          <input className='form-control' type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
        </label>
        <br />
        <label>
          Kelas:
          <input className='form-control' type="text" value={kelas} onChange={(e) => setKelas(e.target.value)} />
        </label>
        <br />
        <label>
          Tanggal:
          <input className='form-control' type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <select className='form-control' value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Pilih Status --</option>
            <option value="Hadir">Hadir</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alpa">Alpa</option>
          </select>
        </label>
        <br />
        <button className='btn btn-success' type="submit">Simpan</button>&nbsp;
        <button className='btn btn-danger' type="button" onClick={onCancel}>Batal</button>
      </form>
    </div>
  );
};

export default EditAttendance;
