import * as Yup from 'yup';

export const newShiftSchema = Yup.object().shape({
  date: Yup.date().required('Debe ingresar una fecha'),
  checkIn: Yup.string().required('Debe ingresar la hora de entrada'),
  checkOut: Yup.string().required('Debe ingresar la hora de salida'),
  optionals: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
  ),
});
