export default function CityList({
  selectedCity,
  cities,
  onSelect
}) {
  return (
    <section className="city-list">
      <ul>
        {cities.map(city =>
          <li key={city.path}>
            <button onClick={() => {
              onSelect(city);
            }}>
              {city.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

