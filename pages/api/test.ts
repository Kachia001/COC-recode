import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const folderPath = './data/userData'
function readData(){
  const jsonFiles = [];
  const fileNames = fs.readdirSync(folderPath);
  for(const fileName of fileNames) {
    const filePath = path.join(folderPath, fileName);
    if(fileName.endsWith('.json')) {
      try{
        const fileContext = fs.readFileSync(filePath, 'utf-8')
        const jsonData = JSON.parse(fileContext);
        jsonFiles.push(jsonData);
      } catch (error) {
        console.log(`${fileName} 못읽음`)
      }
    } 
  }
  return jsonFiles;
}


export default function handler(req: NextApiRequest, res: NextApiResponse){
  console.log('api 요청');
  return res.status(200).json(JSON.stringify(readData()));
}