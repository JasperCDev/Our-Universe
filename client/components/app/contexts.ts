import { createContext } from 'react';

interface EnergyColorContext {
  energyColor: [number, number, number];
  setEnergyColor: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const EnergyColorContextInitialValue = {
  energyColor: [0, 0, 0] as [number, number, number],
  setEnergyColor: (() => { }) as React.Dispatch<React.SetStateAction<[number, number, number]>>
}

export const EnergyColorContext = createContext<EnergyColorContext>(EnergyColorContextInitialValue);

interface User {
  userClicks: number;
  username: string;
  userId: number;
  userLvl: number;
  userPower: number;
  setUserPower: React.Dispatch<React.SetStateAction<number>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const UserContextInitialValue = {
  userClicks: 0,
  username: '',
  userId: 0,
  userLvl: 1,
  userPower: 1,
  setUserPower: (() => { }) as React.Dispatch<React.SetStateAction<number>>,
  setUsername: (() => { }) as React.Dispatch<React.SetStateAction<string>>
}



export const UserContext = createContext<User>(UserContextInitialValue);