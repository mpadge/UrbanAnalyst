
import {useState} from 'react';
import { CityListProps } from "./interfaces";

export default function CityList(props: CityListProps) {

  return (
    <section className="city-list">
      <ul>
        {props.citiesArray.map((city, index) =>
          <li key={city.path}>
            <button onClick={() => {
                props.handleIdxChange(index);
                props.handleViewStateChange({...props.citiesArray[index].initialViewState,
                    pitch: 0,
                    bearing: 0 });
            }}>
              {city.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

