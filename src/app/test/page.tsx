'use client'
import { isArrayBuffer } from "util/types";
import { lastData as fetchData } from "../data";
import { useEffect, useState } from "react";


export default function Page() {
  const [beforeData, setBeforeData] = useState<(BeforeData | null)[]>([]);
  const [currentData, setCurrentData] = useState(fetchData);
  
  useEffect(()=>{
    if (fetchData.state === "notInWar") {
      return
    }
    // if (fetchData.startTime !== currentData.startTime) {
      const newBeforeData: (BeforeData | null)[] = [...beforeData]
      currentData.clan.members.forEach((data) => {
        let userData = newBeforeData.find(obj => obj!.name === data.name);
        if (!userData) {
          const addData = new AddBeforeData(data.name)
          newBeforeData.push(addData);
          userData = addData;
        }
        if (data.attacks) {
          userData.totalAttackCount += 2;
          userData.usedAttackCount += data.attacks.length;
          userData.attackHistory.push(data.attacks.length);
          userData.attackHistory.shift();
        } else {
          userData.totalAttackCount += 2;
          userData.attackHistory.push(0);
          userData.attackHistory.shift();
        }
      });
      setBeforeData(newBeforeData);
    // }
  }, [])


  return (
    <div>
      {beforeData?.map((data, i) => {
        return (
          <div key={i} className="flex gap-3">
            <div>{data!.name}</div>
            <div>{data!.totalAttackCount}</div>
            <div>{data!.usedAttackCount}</div>
            <div>{data!.attackHistory}</div>
          </div>
        )
      })}
    </div>
  )
}
interface BeforeData {
  name: string;
  totalAttackCount: number;
  usedAttackCount: number;
  attackHistory: (number | 'noData')[]
}
class AddBeforeData implements BeforeData {
  name: string;
  totalAttackCount: number;
  usedAttackCount: number;
  attackHistory: (number | 'noData')[]
  constructor(name: string) {
    this.name = name;
    this.totalAttackCount = 0;
    this.usedAttackCount = 0;
    this.attackHistory = ['noData', 'noData', 'noData', 'noData', 'noData', 'noData'];
  }
}