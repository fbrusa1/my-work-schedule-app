import * as Yup from 'yup';

export const newShiftSchema = Yup.object().shape({
  date: Yup.date().required('La fecha es requerida'),
  checkIn: Yup.string().required('La hora de entrada es requerida'),
  checkOut: Yup.string().required('La hora de salida es requerida'),
});
