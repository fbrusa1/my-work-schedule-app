import { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { UserData, Option, Shift, ShiftData } from '../types';
import { newShiftSchema } from '../schemas/shiftSchema';
import Select from 'react-select';

type Props = {
  userData: UserData;
  options: Option[];
  onShiftAdded: () => void;
};

const ShiftForm = ({ userData, options, onShiftAdded }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const initialValues: ShiftData = {
    checkIn: '',
    checkOut: '',
    date: '',
    optionals: [],
  };

  const handleSubmit = async (
    values: ShiftData,
    actions: FormikHelpers<ShiftData>
  ) => {
    const data: Shift = {
      ...userData,
      ...values,
      };
    setIsSubmitted(true);
    await registerShift(data);
    actions.setSubmitting(false);
    actions.resetForm();
    onShiftAdded();
  };

  const registerShift = async (data: Shift | []) => {
    const res = await fetch('/api/shifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  };

  const renderOptionalsErrors = (errors: any) => {
    if (typeof errors === 'string') {
      return <div className="text-danger mt-1">{errors}</div>;
    } else if (Array.isArray(errors)) {
      return errors.map((error, index) => (
        <div key={index} className="text-danger mt-1">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      ));
    } else {
      return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newShiftSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, setFieldValue, values }) => (
        <Form className="mt-4">
          <div className="row mb-3 justify-content-center">
            <label htmlFor="date" className="col-form-label col-5">
              Fecha
            </label>
            <div className="col-7">
              <Field
                type="date"
                className="form-control shadow-sm"
                name="date"
                id="date"
                autoComplete="off"
              />
              {isSubmitted && errors.date && touched.date && (
                <div className="text-danger mt-1">{errors.date}</div>
              )}
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="checkIn" className="col-form-label col-5">
              Hora entrada
            </label>
            <div className="col-7">
              <Field
                type="time"
                className="form-control shadow-sm"
                name="checkIn"
                id="checkIn"
                autoComplete="off"
              />
              {isSubmitted && errors.checkIn && touched.checkIn && (
                <div className="text-danger mt-1">{errors.checkIn}</div>
              )}
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="checkOut" className="col-form-label col-5">
              Hora salida
            </label>
            <div className="col-7">
              <Field
                type="time"
                className="form-control shadow-sm"
                name="checkOut"
                id="checkOut"
                autoComplete="off"
              />
              {isSubmitted && errors.checkOut && touched.checkOut && (
                <div className="text-danger mt-1">{errors.checkOut}</div>
              )}
            </div>
          </div>
          <div
            className="row mb-3 justify-content-center collapse"
            id="collapseMoreOptions"
          >
            <label htmlFor="optionals" className="col-form-label col-5">
              Opciones
            </label>
            <div className="col-7">
              <Select
                instanceId="optionals-instance"
                id="optionals"
                name="optionals"
                options={options}
                isMulti
                classNamePrefix="select"
                className='shadow-sm'
                value={values.optionals}
                onChange={(selectedOptions) =>
                  setFieldValue('optionals', selectedOptions || [])
                }
              />
              {isSubmitted &&
                errors.optionals &&
                touched.optionals &&
                renderOptionalsErrors(errors.optionals)}
            </div>
          </div>
          <div className="mt-5">
            <button
              className="btn btn-success me-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMoreOptions"
              aria-expanded="false"
              aria-controls="collapseMoreOptions"
            >
              Más opciones
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
              onClick={() => setIsSubmitted(true)}
            >
              Agregar Turno
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ShiftForm;
