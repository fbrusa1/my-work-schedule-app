import { NextApiRequest, NextApiResponse } from 'next';

interface Shift {
  worker: string;
  hours: number;
}

let shifts: Shift[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(shifts);
      break;
    case 'POST':
      const newShift: Shift = req.body;
      shifts.push(newShift);
      res.status(201).json(newShift);
      break;
    case 'DELETE':
      shifts = [];
      res.status(200).json(shifts);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
