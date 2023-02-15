
import {useState} from 'react';

export default function CityList(props: { CityListProps }) {

  return (
    <section className="city-list">
      <ul>
        {props.citiesData.map((city, index) =>
          <li key={city.path}>
            <button onClick={() => {
                console.log("index change to: " + index);
                console.log("path should change to: " + props.citiesData[index].path);
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

