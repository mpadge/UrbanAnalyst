
import {useState} from 'react';
import { CityData, CityListProps } from "./interfaces";

export default function CityList(props: CityListProps) {

  return (
    <section className="city-list">
      <ul>
        {props.citiesData.Data.map((city, index) =>
          <li key={city.path}>
            <button onClick={() => {
                props.handleIdxChange(index);
            }}>
              {city.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

