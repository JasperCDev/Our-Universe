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
  set_user_name: React.Dispatch<React.SetStateAction<string>>;
}

const UserContextInitialValue = {
  user_clicks: 0,
  user_name: '',
  user_id: 0,
  set_user_name: (() => { }) as React.Dispatch<React.SetStateAction<string>>
}



export const UserContext = createContext<User>(UserContextInitialValue);