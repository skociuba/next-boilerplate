import fs from 'fs';
import path from 'path';

export async function getData(locale: string) {
  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return data;
}
