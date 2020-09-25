import { createContext } from 'react';

interface PlanetEnergyColor {
  planet_energy_color: [number, number, number];
  set_planet_energy_color: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const PlanetEnergyColorInitialValue = {
  planet_energy_color: [64, 191, 255] as [number, number, number],
  set_planet_energy_color: (() => { }) as React.Dispatch<React.SetStateAction<[number, number, number]>>
}

export const PlanetEnergyColorContext = createContext<PlanetEnergyColor>(PlanetEnergyColorInitialValue);