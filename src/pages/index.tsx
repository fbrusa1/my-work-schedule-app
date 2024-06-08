import { useState, useEffect } from 'react';
import { Shift, UserData } from '../types';
import Layout from './_layout';
import WithAuth from '../components/WithAuth';
import ShiftForm from '../components/ShiftForm';

const Home = () => {
  const [userData, setUserData] = useState<UserData>({
    document: '',
    companyId: null,
    companyName: '',
  });
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isShiftAdded, setIsShiftAdded] = useState(false);

  useEffect(() => {
    const userDataJSON: string = localStorage.getItem('userData') || '';
    const user: UserData = JSON.parse(userDataJSON);
    const { document, companyId, companyName} = user;
    setUserData({
      document,
      companyId,
      companyName,
    });
  }, []);

  useEffect(() => {
    fetch('/api/shifts')
      .then((res) => res.json())
      .then((data) => setShifts(data));
  }, [isShiftAdded]);

  const handleShiftAdded = () => {
    setIsShiftAdded(!isShiftAdded);
  };

  return (
    <Layout title="Home" userData={userData}>
      <div className="form-shifts">
        <h1>Registro de Turnos</h1>
        <ShiftForm userData={userData} onShiftAdded={handleShiftAdded}/>
        <h2 style={{ marginTop: '20px' }}>Turnos Registrados</h2>
        <div className="row">
          <div className="col-3 mx-auto">
            <ul className="list-group list-group-flush">
              {shifts.map((shift, index) => (
                <li
                  className="list-group-item list-group-item-secondary"
                  key={index}
                >
                  <span className="fw-bold">{shift.date}</span>{' '}
                  {`(${shift.checkIn} - ${shift.checkOut})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WithAuth(Home);
