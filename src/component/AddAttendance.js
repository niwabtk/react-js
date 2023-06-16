import React, { useState } from 'react';
import {database} from '../firebase'
import { ref, push } from "firebase/database";
const AddAttendance = ({ addAttendance }) => {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAttendance = { nama, kelas, tanggal, status };
    // addAttendance(newAttendance);
    push(ref(database, 'latihan/'), {
      nama,
      kelas,
      tanggal,
      status,
    })
    .then(() => {
      // Data saved successfully!
      console.log('sukses')
    })
    .catch((error) => {
      // The write failed...
      console.log('error');
    });
    


    setNama('');
    setKelas('');
    setTanggal('');
    setStatus('');
  };

  return (
    <div>
      <h2 className='text-center'>Tambah Data Absensi</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nama">
          Nama:
          <input id="nama" className='form-control' type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
        </label>
        <br />
        <label htmlFor="kelas">
          Kelas:
          <input id="kelas" className='form-control' type="text" value={kelas} onChange={(e) => setKelas(e.target.value)} />
        </label>
        <br />
        <label htmlFor="tanggal">
          Tanggal:
          <input id="tanggal" className='form-control' type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </label>
        <br />
        <label htmlFor="status">
          Status:
          <select id="status" className='form-control' value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Pilih Status --</option>
            <option value="Hadir">Hadir</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alpa">Alpa</option>
          </select>
        </label>
        <br/>
        <br/>
        <button type="submit" className='btn btn-primary'>Tambah</button>
      </form>
    </div>
  );
};

export default AddAttendance;
