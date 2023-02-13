
import {useState} from 'react';

export default function CityList({
  citiesData,
  idx,
  handleIdxChange,
  onSelect
}) {

    console.log("IDX in CityList: " + idx)

  return (
    <section className="city-list">
      <ul>
        {citiesData.map((city, index) =>
          <li key={city.path}>
            <button onClick={() => {
                console.log("index change to: " + index);
                console.log("path should change to: " + citiesData[index].path);
                handleIdxChange(index);
            }}>
              {city.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

