import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import InstallBootstrapJS from '../components/InstallBootstrapJS';
import { MdPerson } from 'react-icons/md';
import { UserData } from '../types';

type Props = {
  children: ReactNode;
  title?: string;
  userData: UserData;
};

const Layout = ({ children, title = 'My App', userData }: Props) => {
  const router = useRouter();
  const { companyName } = userData;

  const deleteShifts = async () => {
    await fetch('/api/shifts', {
      method: 'DELETE',
    });
  };

  const signOut = async () => {
    await deleteShifts();
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
          className="navbar bg-dark border-bottom border-body"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bootstrap-logo.svg"
                alt="Logo"
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              {` Work Schedule App`}
            </a>
            <div className="d-flex align-items-center ms-auto">
              <div className="dropdown me-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdPerson className="navbar-icons" />
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Mi Perfil
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Exportar a Excel
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={signOut}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <p className="fw-bold mb-0">Facundo Brusa</p>
                <p className='mb-0'>{companyName}</p>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow-1">{children}</main>
      <footer className="text-center mt-auto py-3">
        <p>&copy; {new Date().getFullYear()} Work Schedule App</p>
      </footer>
    </div>
  );
};

export default Layout;
