import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import InstallBootstrapJS from '../components/InstallBootstrapJS';
import {
  MdMenu,
  MdPerson,
  MdDriveFileMoveOutline,
  MdLogout,
} from 'react-icons/md';
import { UserData } from '../types';

type Props = {
  children: ReactNode;
  title?: string;
  userData: UserData;
};

const Layout = ({ children, title = 'My App', userData }: Props) => {
  const router = useRouter();
  let companyName = '';
  if (userData) {
    companyName = userData.companyName;
  }

  const signOut = async () => {
    localStorage.removeItem('userData');
    router.push('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Head>
        <title>{title}</title>
      </Head>
      <InstallBootstrapJS />
      <header>
        <nav
          className="navbar border-bottom border-body"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              {` Work Schedule App`}
            </a>
            <div className="d-flex align-items-center ms-auto">
              <div className="dropdown">
                <button
                  className="btn btn-light"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdMenu className="navbar-icons" />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end mt-1"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <div className="dropdown-header d-flex align-items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="dropdown-user-img"
                        src="/profile-1.png"
                        alt="User Image"
                      />
                      <div className="dropdown-user-details">
                        <div className="dropdown-user-details-name">
                          Facundo Brusa
                        </div>
                        <div className="dropdown-user-details-company">
                          {companyName}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a className="d-flex dropdown-item" href="#">
                      <MdPerson className="navbar-icons me-1" />
                      Mi Perfil
                    </a>
                  </li>
                  <li>
                    <a className="d-flex dropdown-item" href="#">
                      <MdDriveFileMoveOutline className="navbar-icons me-1" />
                      Exportar a Excel
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={signOut}>
                      <MdLogout className="navbar-icons me-1" />
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className='container my-4'>{children}</main>
      <footer className="text-center mt-auto py-3">
        <p className='mb-0 text-white'>&copy; {new Date().getFullYear()} Work Schedule App</p>
      </footer>
    </div>
  );
};

export default Layout;
