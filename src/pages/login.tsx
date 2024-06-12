import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import { Company, LoginData } from '../types';
import * as Yup from 'yup';

const Login = () => {
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

  const validationSchema = Yup.object({
    document: Yup.string()
      .min(6, 'El DNI ingresado es invalido')
      .max(9, 'El DNI ingresado es invalido')
      .required('Debe ingresar un DNI valido'),
    company: Yup.number()
      .positive()
      .integer()
      .required('Debe seleccionar una empresa'),
  });

  const handleSubmit = (values: LoginData) => {
    // TO DO: Authenticate with DB
    // Find selected company name
    const { document, company } = values;
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
  };

  return (
    <main className="row form-signin">
      <div className="col-12 card p-4">
        <Formik
          initialValues={{ document: '', company: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>
              <div className="mb-3">
                <Field
                  type="text"
                  className="form-control text-center shadow-sm"
                  name="document"
                  placeholder="DNI"
                />
                <ErrorMessage
                  name="document"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <div className="mb-3">
                <Field as="select" className="form-select text-center shadow-sm" name="company">
                  <option value="" disabled={true}>Seleccione una empresa</option>
                  {companies.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="company"
                  component="div"
                  className="text-danger mt-1"
                />
              </div>
              <button
                className="w-100 btn btn-lg btn-primary mt-3"
                type="submit"
                disabled={isSubmitting}
              >
                Ingresar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default Login;
