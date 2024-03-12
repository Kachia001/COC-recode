import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';


function readData(params: string[]){
  const filePath = path.join('./data/blacklist', 'blacklist.json');
  const jsonBlackList = fs.readFileSync(filePath, 'utf-8');
  const blackList = JSON.parse(jsonBlackList);
  const updateBlackList = [...blackList].filter((data)=>{
    return !params.includes(data);
  })
  const updatedJsonList = JSON.stringify([...updateBlackList], null, 2);
  fs.writeFileSync(filePath, updatedJsonList);
}


export default function handler(req: NextApiRequest, res: NextApiResponse){
  readData(req.body.data);
  return res.status(200).json('succeed');
}