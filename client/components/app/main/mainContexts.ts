import { createContext } from 'react';

interface planetEnergyColor {
  planetEnergyColor: [number, number, number];
  setPlanetEnergyColor: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const planetEnergyColorInitialValue = {
  planetEnergyColor: [64, 191, 255] as [number, number, number],
  setPlanetEnergyColor: (() => { }) as React.Dispatch<React.SetStateAction<[number, number, number]>>
}

export const PlanetEnergyColorContext = createContext<planetEnergyColor>(planetEnergyColorInitialValue);