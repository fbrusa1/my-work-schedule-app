import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Shift, ShiftData } from '../types';
import { newShiftSchema } from '../schemas/shiftSchema';

const ShiftForm = ({userData, onShiftAdded }: any) => {
  const [newShift, setNewShift] = useState({
    checkIn: '',
    checkOut: '',
    date: '',
  });

  const handleSubmit = async (values: ShiftData, actions: FormikHelpers<ShiftData>) => {
    const data: Shift = {
      ...userData,
      ...values
    }
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

  return (
    <Formik
      initialValues={newShift}
      validationSchema={newShiftSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4">
          <div className="row mb-3 justify-content-center">
            <label htmlFor="date" className="col-2 col-form-label">
              Fecha
            </label>
            <div className="col-2">
              <Field type="date" className="form-control" name="date" />
              <ErrorMessage name="date" component="p" />
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="checkIn" className="col-2 col-form-label">
              Hora entrada
            </label>
            <div className="col-2">
              <Field type="time" className="form-control" name="checkIn" />
              <ErrorMessage name="checkIn" component="p" />
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label htmlFor="checkOut" className="col-2 col-form-label">
              Hora salida
            </label>
            <div className="col-2">
              <Field type="time" className="form-control" name="checkOut" />
              <ErrorMessage name="checkOut" component="p" />
            </div>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            Agregar Turno
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ShiftForm;
