import { createContext } from 'react';

interface EnergyColorContext {
  energy_color: [number, number, number];
  set_energy_color: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const EnergyColorContextInitialValue = {
  energy_color: [0, 0, 0] as [number, number, number],
  set_energy_color: (() => { }) as React.Dispatch<React.SetStateAction<[number, number, number]>>
}

export const EnergyColorContext = createContext<EnergyColorContext>(EnergyColorContextInitialValue);

interface User {
  user_clicks: number;
  user_name: string;
  user_id: number;
  user_lvl: number;
  user_power: number;
  set_user_power: React.Dispatch<React.SetStateAction<number>>;
  set_user_name: React.Dispatch<React.SetStateAction<string>>;
}

const UserContextInitialValue = {
  user_clicks: 0,
  user_name: '',
  user_id: 0,
  user_lvl: 1,
  user_power: 1,
  set_user_power: (() => { }) as React.Dispatch<React.SetStateAction<number>>,
  set_user_name: (() => { }) as React.Dispatch<React.SetStateAction<string>>
}



export const UserContext = createContext<User>(UserContextInitialValue);