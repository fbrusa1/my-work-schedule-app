import { useState, useEffect } from 'react';
import { Shift, UserData, Option } from '../types';
import Layout from './_layout';
import WithAuth from '../components/WithAuth';
import ShiftForm from '../components/ShiftForm';
import { MdDelete, MdEdit } from 'react-icons/md';

const Home = () => {
  const [userData, setUserData] = useState<UserData>({
    document: '',
    companyId: null,
    companyName: '',
  });
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isShiftAdded, setIsShiftAdded] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    // Simulate fetching options from an API
    const fetchOptions = async () => {
      const response = await new Promise<{ data: Option[] }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: [
              { value: 1, label: 'Franco' },
              { value: 2, label: 'Franco Trabajado' },
              { value: 3, label: 'Franco Compensatorio' },
              { value: 4, label: 'Pernocte Alojamiento' },
              { value: 5, label: 'Pernocte Campo' },
              { value: 6, label: 'Guardia' },
            ],
          });
        }, 1000);
      });
      setOptions(response.data);
    };
    try {
      // set userData
      const userDataJSON: string = localStorage.getItem('userData') || '';
      const user: UserData = JSON.parse(userDataJSON);
      const { document, companyId, companyName } = user;
      setUserData({
        document,
        companyId,
        companyName,
      });
      fetchOptions();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (userData.document && userData.companyId) {
      fetch(
        `/api/shifts?document=${userData.document}&companyId=${userData.companyId}`
      )
        .then((res) => res.json())
        .then((data) => setShifts(data));
    }
  }, [isShiftAdded, userData.companyId, userData.document]);

  const handleShiftAdded = () => {
    setIsShiftAdded(!isShiftAdded);
  };

  const showOptionals = (optionals: Option[]) => {
    if (optionals.length === 0) return '-';
    const str = optionals.map((optional) => optional.label + ', ');
    return str.join('').slice(0, -2);
  };

  return (
    <Layout title="Home" userData={userData}>
      <div className="row justify-content-center text-center mx-1">
        <h1 className="text-white">Registro de Turnos</h1>
        <div className="col-12 col-md-10 col-lg-6 col-xxl-5 card p-4">
          <ShiftForm
            userData={userData}
            options={options}
            onShiftAdded={handleShiftAdded}
          />
        </div>
      </div>
      <div className="row justify-content-center text-center mx-1">
        <h2 className="text-white mt-5">Turnos Registrados</h2>
        <div className="col-12 col-md-10 col-lg-8 col-xxl-6 card">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Observaciones</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift, index) => (
                  <tr key={index}>
                    <td>{shift.date}</td>
                    <td>
                      {shift.checkIn} - {shift.checkOut}
                    </td>
                    <td>{showOptionals(shift.optionals)}</td>
                    <td>
                      <button className="btn btn-primary btn-sm mb-2 mb-md-0 mx-3 mx-md-1">
                        <MdEdit size={18} />
                      </button>
                      <button className="btn btn-danger btn-sm mx-3 mx-md-1">
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <td>2024-06-06</td>
                  <td>02:40 - 14:39</td>
                  <td>Franco Compensatorio</td>
                  <td>
                    <button className="btn btn-primary btn-sm mb-2 mb-md-0 mx-3 mx-md-1">
                      <MdEdit size={18} />
                    </button>
                    <button className="btn btn-danger btn-sm mx-3 mx-md-1">
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2024-06-10</td>
                  <td>02:40 - 14:39</td>
                  <td>Pernocte Alojamiento</td>
                  <td>
                    <button className="btn btn-primary btn-sm mb-2 mb-md-0 mx-3 mx-md-1">
                      <MdEdit size={18} />
                    </button>
                    <button className="btn btn-danger btn-sm mx-3 mx-md-1">
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2024-06-23</td>
                  <td>02:40 - 14:39</td>
                  <td>-</td>
                  <td>
                    <button className="btn btn-primary btn-sm mb-2 mb-md-0 mx-3 mx-md-1">
                      <MdEdit size={18} />
                    </button>
                    <button className="btn btn-danger btn-sm mx-3 mx-md-1">
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WithAuth(Home);
