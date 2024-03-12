'use client'
import Image from 'next/image'
import { data as lowData, lastData } from './data'
import { useEffect, useState } from 'react'
import { BeforeData, AddBeforeData, bindToBefore, historyColor, addBlacklist, unAddBlacklist } from './function'
import List from './List'
import Link from 'next/link'

export default function Home() {
  const [beforeData, setBeforeData] = useState<(BeforeData | null)[]>([]);
  const [currentData, setCurrentData] = useState(lastData);
  const stateColor = (data: any) => {
    if (data.state === "preparation") {
      return ('text-blue-700')
    }
    if (data.state === "warEnded") {
      return ('text-slate-500')
    }
    if (data.state === "notInWar") {
      return
    }
    if (data.state === "inWar") {
      return ('text-red-600')
    }
  }
  // const insertData = bindToBefore(lowData, currentData, beforeData);

  // if (insertData) {
  //   setBeforeData(insertData)
  // }

  useEffect(() => {
    let blackList: string[];
    fetch('api/blacklist').then((data) => data.json()).then((data) =>
      JSON.parse(data)).then((data) => {
        blackList = data;
      });

    fetch('api/test').then(data => data.json()).then(data => JSON.parse(data)).then((data) => {
      let emptyArray: (BeforeData | null)[] = [];
      data.forEach((data: any) => {
        if(bindToBefore(data, emptyArray)){
        emptyArray = bindToBefore(data, emptyArray)};
      })
      return emptyArray;
    }).then((data) => {
      setBeforeData(data.filter((element) => {
        return !blackList?.includes(element!.name)
      }))
    });
  }, [])


  return (
    <div className='p-5'>
      <div className='flex gap-1'>
        <BeforeList data={beforeData} />
        <List data={currentData} />
      </div>
    </div>
  )
}
function BeforeList(props: {data: any}) {
  const beforeData = props.data;
  const [blackList, setBlackList] = useState<string[]>([]);
  return (
    <div className='w-1/2 text-center'>
      <div>total</div>
      <div
        className={`text-4xl font-bold text-center`}>
        total data
      </div>
      <div className='flex items-center font-bold'>
        <div className='w-1/12'>No</div>
        <div className='w-3/12'>Name</div>
        <div className='w-2/12'>TotalAttack<br />Count</div>
        <div className='w-2/12'>UsedAttack<br />Count</div>
        <div className='w-4/12 flex justify-between items-center'>
          <div>AttackHistory</div>
          <Link href='/blacklist' className='bg-slate-500 rounded-lg p-1'>blackList<br/>management</Link>
          <button className='bg-slate-400 p-1 rounded-lg'
            onClick={async () => { await fetch('api/addblacklist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: blackList }) }); window.location.reload(); }}
          >Add<br/>BlackList</button>
        </div>
      </div>
      {beforeData.map((data:BeforeData, i: number) => {
        return (
          <div className={`flex mb-1 ${i % 2 ? null : 'bg-slate-300'} items-center`} key={i}>
            <div className='w-1/12'><input className='' type="checkbox" onChange={(e) => { e.currentTarget.checked ? setBlackList(addBlacklist(data.name, blackList)) : setBlackList(unAddBlacklist(data.name, blackList)) }} />{i + 1}</div>
            <div className='w-3/12'>{data.name}</div>
            <div className='w-2/12'>{data.totalAttackCount}</div>
            <div className='w-2/12'>{data.usedAttackCount}</div>
            <div className='w-4/12 flex gap-1'>
              {data.attackHistory.map((data, i: number) => {
                return (
                  <div className={`${historyColor(data)} w-1/6 h-full overflow-hidden`} key={i}>{data}</div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
