
export interface BeforeData {
  name: string;
  totalAttackCount: number;
  usedAttackCount: number;
  attackHistory: (number | 'noData')[]
}
export class AddBeforeData implements BeforeData {
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

export interface MemberData {
  tag: string,
  name: string,
  townhallLevel: number,
  mapPosition: number,
  attacks?:
  {
    attackerTag: string,
    defenderTag: string,
    stars: number,
    destructionPercentage: number,
    order: number,
    duration: number
  }[],
  opponentAttacks: number,
  bestOpponentAttack?: {
    attackerTag: string,
    defenderTag: string,
    stars: number,
    destructionPercentage: number,
    order: number,
    duration: number
  }
}

export function bindToBefore(currentData: any, beforeData: any[]): (BeforeData | null)[] {
  // if (currentData.state === "notInWar") {
  //   return
  // }

  const newBeforeData: (BeforeData | null)[] = [...beforeData]

  currentData.clan.members.forEach((data: MemberData) => {
    let userData = newBeforeData.find(obj => obj?.name === data.name);
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
  return newBeforeData;
}

export function historyColor(data: (number | "noData")) {
  if (data === 'noData') {
    return 'bg-slate-400'
  }
  if (data === 0) {
    return 'bg-red-500'
  }
  if (data === 1) {
    return 'bg-yellow-300'
  }
  if (data === 2) {
    return 'bg-green-500'
  }
}

export function addBlacklist(name: string, blackList: string[]) {
  const newBlackList = [...blackList]
  newBlackList.push(name);
  console.log(blackList);
  return newBlackList;
}
export function unAddBlacklist(name: string, blackList: string[]) {
  const newBlackList = [...blackList].filter((data) => data !== name);
  console.log(blackList);
  return newBlackList;
}

// function bindToBefore111(fetchData, currentData, beforeData) {
//   if (fetchData.state === "notInWar") {
//     return
//   }
//   if (fetchData.startTime !== currentData.startTime) {
//     const newBeforeData: (BeforeData | null)[] = [...beforeData]
//     currentData.clan.members.forEach((data) => {
//       let userData = newBeforeData.find(obj => obj.name === data.name);
//       if (!userData) {
//         const addData = new AddBeforeData(data.name)
//         newBeforeData.push(addData);
//         userData = addData;
//       }
//       if (data.attacks) {
//         userData.totalAttackCount += 2;
//         userData.usedAttackCount += data.attacks.length;
//         userData.attackHistory.push(data.attacks.length);
//         userData.attackHistory.shift();
//       } else {
//         userData.totalAttackCount += 2;
//         userData.attackHistory.push(0);
//         userData.attackHistory.shift();
//       }
//     });
//     // setBeforeData(newBeforeData);

//     return newBeforeData;
//   }
// }