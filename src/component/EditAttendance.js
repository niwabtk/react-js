import React, { useState, useEffect } from 'react';

const EditAttendance = ({ attendance, onUpdate, onCancel }) => {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setNama(attendance.nama);
    setKelas(attendance.kelas);
    setTanggal(attendance.tanggal);
    setStatus(attendance.status);
  }, [attendance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAttendance = { ...attendance, nama, kelas, tanggal, status };
    onUpdate(updatedAttendance);
  };

  return (
    <div>
      <h2>Edit Data Absensi</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama:
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
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
        <button type="submit">Simpan</button>
        <button type="button" onClick={onCancel}>Batal</button>
      </form>
    </div>
  );
};

export default EditAttendance;
