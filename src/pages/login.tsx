import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Company } from '../types';

const Login = () => {
  const [document, setDocument] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [companies, setCompanies] = useState<Company[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Simulate fetching companies from an API
    const fetchCompanies = async () => {
      const response = await new Promise<{ data: Company[] }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: [
              { id: 1, name: 'Empresa 1' },
              { id: 2, name: 'Empresa 2' },
            ],
          });
        }, 1000);
      });

      setCompanies(response.data);
    };

    fetchCompanies();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TO DO: Authenticate with DB
    if (document && company) {
      // Find selected company name
      const selectedCompany =
        companies.find((comp) => comp.id === Number(company)) || '';
      if (!selectedCompany) return;
      const companyId = selectedCompany.id;
      const companyName = selectedCompany.name;
      // Save in localStorage
      const userData = {
        document,
        companyId,
        companyName,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      // Redirect to home if it's valid
      router.push('/');
    }
  };

  return (
    <main className="row form-signin">
      <div className="col-12">
        <form onSubmit={handleSubmit}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mb-4"
            src="/bootstrap-logo.svg"
            alt="Login image"
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="document"
              placeholder="DNI"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            aria-label="Select company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="">Seleccione una empresa</option>
            {companies.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.name}
              </option>
            ))}
          </select>

          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
