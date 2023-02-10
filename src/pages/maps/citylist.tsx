export default function CityList({
  selectedCity,
  cities,
  onSelect
}) {
  return (
    <section className="city-list">
      <ul>
        {cities.map(city =>
          <li key={city.email}>
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

