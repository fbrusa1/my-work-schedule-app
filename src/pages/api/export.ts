import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import * as XLSX from 'xlsx';

interface Shift {
  worker: string;
  hours: number;
}

let shifts: Shift[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const worksheet = XLSX.utils.json_to_sheet(shifts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shifts');

    const filePath = join(process.cwd(), 'public', 'shifts.xlsx');
    XLSX.writeFile(workbook, filePath);

    res.status(200).json({ filePath: '/shifts.xlsx' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
