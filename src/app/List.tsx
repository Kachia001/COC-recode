import { useState } from "react";
import { MemberData } from "./function";
export default function List(props: any) {
  const [currentData, setCurrentData] = useState({ ...props.data });
  const nameSort = () => {
    const newData = { ...currentData };
    const sortData = [...newData.clan.members].sort((a, b) => a.name.localeCompare(b.name));
    currentData.clan.members = sortData;
    setCurrentData(newData);
  }
  const positionSort = () => {
    const newData = { ...currentData };
    const sortData = [...newData.clan.members].sort((a, b) => a.mapPosition - b.mapPosition);
    currentData.clan.members = sortData;
    setCurrentData(newData);
  }
  const townhallSort = () => {
    const newData = { ...currentData };
    const sortData = [...newData.clan.members].sort((a, b) => a.townhallLevel - b.townhallLevel);
    currentData.clan.members = sortData;
    setCurrentData(newData);
  }
  const attackSort = () => {
    const newData = { ...currentData };
    const sortData = [...newData.clan.members].sort((a, b) => {
      if(a.attacks && b.attacks){
        return a.attacks.length - b.attacks.length;}
      if (a.attacks! && b.attacks!) {
        return 0
      } else if(a.attacks!){
        return 1
      } else if(b.attacks!){
        return -1
      } else {
        return 0
      }
    });
    currentData.clan.members = sortData;
    setCurrentData(newData);
  }

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
  return (
    <div className='w-1/2 text-center'>
      <div>current</div>
      <div
        className={`text-4xl font-bold text-center ${stateColor(currentData)}`}>
        {currentData.state}
      </div>
      <div className='flex items-center font-bold'>
        <div className='w-1/12'>No</div>
        <div className='w-6/12 flex' onClick={nameSort}>
          <div className='w-8/12'>Name</div>
          <div className='w-4/12'>P, L</div>
        </div>
        <div className='w-1/12' onClick={positionSort}>Map Position</div>
        <div className='w-2/12' onClick={townhallSort}>Townhall Level</div>
        <div className='w-2/12' onClick={attackSort}>Attacks</div>
      </div>
      {currentData.clan.members.map((data: MemberData, index: number) => {
        const opponentData = currentData.opponent.members.filter((opponentData: MemberData) => {
          if (data.attacks) {
            if (data.attacks.length === 1) {
              return opponentData.tag === data.attacks[0].defenderTag
            }
            if (data.attacks.length === 2) {
              return opponentData.tag === data.attacks[0].defenderTag || opponentData.tag === data.attacks[1].defenderTag
            }
          }
        })
        return (
          <div className={`flex mb-1 ${index % 2 ? null : 'bg-slate-300'} items-center`} key={index}>
            <div className='w-1/12'>{index + 1}</div>
            <div className='w-6/12 flex'>
              <div className='flex gap-5 items-center w-2/3 justify-center'>
                <div>{data.name}</div>
                <div className='flex flex-col'>{data.attacks ? data.attacks.map((data, i) => {
                  return (
                    <div key={i}>
                      {Array.from({ length: data.stars }).map((_, i) => {
                        return (
                          <span key={i}>⭐</span>
                        )
                      })}
                    </div>
                  )
                }) : null}</div>
              </div>
              <div className='flex flex-col w-1/3'>
                {opponentData ? opponentData.map((data: MemberData, i: number) => {
                  return (
                    <div key={i} className='flex gap-5 justify-center'>
                      <div>{data.mapPosition}</div>
                      <div>{data.townhallLevel}</div>
                    </div>
                  )
                }) : null}
              </div>
            </div>
            <div className='w-1/12'>{data.mapPosition}</div>
            <div className='w-2/12'>{data.townhallLevel}</div>
            <div className='w-2/12'>{data.attacks ? data.attacks.length : "noData"}</div>
          </div>
        )
      })}
    </div>
  )
}
