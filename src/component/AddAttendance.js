import React, { useState } from 'react';

const AddAttendance = ({ onAdd }) => {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAttendance = { nama, kelas, tanggal, status };
    onAdd(newAttendance);
    setNama('');
    setKelas('');
    setTanggal('');
    setStatus('');
  };

  return (
    <div>
      <h2 className='text-center'>Tambah Data Absensi</h2>
      <form onSubmit={handleSubmit}>
        <label className=''>
          Nama:
          <input className='form-control' type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
        </label>
        <br />
        <label>
          Kelas:
          <input type="text" value={kelas} onChange={(e) => setKelas(e.target.value)} />
        </label>
        <br />
        <label>
          Tanggal:
          <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Pilih Status --</option>
            <option value="Hadir">Hadir</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alpa">Alpa</option>
          </select>
        </label>
        <br />
        <button type="submit" className='btn btn-primary'>Tambah</button>
      </form>
    </div>
  );
};

export default AddAttendance;
