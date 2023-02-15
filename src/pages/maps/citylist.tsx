
import {useState} from 'react';
import { CityListProps } from "@/components/interfaces";

export default function CityList(props: CityListProps) {

  return (
    <section className="city-list">
      <ul>
        {props.citiesArray.map((city, index) =>
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

