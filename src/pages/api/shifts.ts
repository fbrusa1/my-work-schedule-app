import { NextApiRequest, NextApiResponse } from 'next';
import { Shift } from '../../types';
import fs from 'fs';
import path from 'path';

const shiftsFilePath = path.join(process.cwd(), 'src/data', 'shifts.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  let shifts: Shift[] = [];

  // Leer los datos de shifts desde el archivo JSON
  if (fs.existsSync(shiftsFilePath)) {
    const data = fs.readFileSync(shiftsFilePath, 'utf8');
    shifts = JSON.parse(data);
  }

  switch (method) {
    case 'GET':
      const { document, companyId } = req.query;
      const filteredShifts = shifts.filter((shift) => {
        return (
          shift.document === document &&
          shift.companyId &&
          shift.companyId.toString() === companyId
        );
      });
      res.status(200).json(filteredShifts);
      break;
    case 'POST':
      const newShift: Shift = req.body;
      shifts.push(newShift);
      fs.writeFileSync(shiftsFilePath, JSON.stringify(shifts, null, 2));
      res.status(201).json(newShift);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
