import React, { useEffect, useState } from 'react';
import AttendanceList from './component/AttendanceList';
import AddAttendance from './component/AddAttendance';
import EditAttendance from './component/EditAttendance';

const url = "https://latihan-f28f4-default-rtdb.firebaseio.com/absensi.json"
const App = () => {
  const [attendance, setAttendance] = useState([
    // { id: 1, nama: 'Joni', kelas: '10A', tanggal: '2022-01-01', status: 'Hadir' },
    // { id: 2, nama: 'Dewi', kelas: '10B', tanggal: '2022-01-02', status: 'Hadir' },
    // { id: 3, nama: 'Budi', kelas: '10C', tanggal: '2022-01-03', status: 'Hadir' },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState({ id: null, nama: '', kelas: '', tanggal: '', status: '' });

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

        setAttendance(tampungData);
        
      }
      catch (error) {
        alert(`Terjadi gangguan dengan pesan:"${error}"`);
      }
    }
    myFetch();

  },[])

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
          <table>
            <tbody>
              <tr>
                {/* <td><AddAttendance addAttendance={addAttendance} /></td> */}
                <td><AttendanceList attendance={attendance} onDelete={deleteAttendance} onEdit={setEditAttendance} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
