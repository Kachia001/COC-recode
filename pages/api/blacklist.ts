import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';


function readData(){
  const filePath = path.join('./data/blacklist', 'blacklist.json');
  const jsonBlackList = fs.readFileSync(filePath, 'utf-8');
  const blackList = JSON.parse(jsonBlackList);
  const arrayJsonList = JSON.stringify([...blackList], null, 2);
  return arrayJsonList;
}


export default function handler(req: NextApiRequest, res: NextApiResponse){
  return res.status(200).json(readData());
}