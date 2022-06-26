import { useState } from 'react';
import './App.css';

function App() {
  const [route, setRoute] = useState({
    route: '',
    stations: [],
  });

  const handleRoute = e => {
    const { value } = e.target;
    setRoute(route => ({ ...route, route: value }));
  };

  const addStation = e => {
    setRoute(route => ({
      ...route,
      stations: [
        ...route.stations,
        {
          name: '',
          lat: '',
          lon: '',
          errors: {},
        },
      ],
    }));
  };

  const handleStation = (value, name, key) => {
    setRoute(route => ({
      ...route,
      stations: route.stations.map((station, i) => {
        if (key === i) {
          station[name] = value;
          let current = route.stations.find(
            (r, index) => r[name] === value && key !== index
          );
          if (current) {
            station.errors[
              name
            ] = `${name} değeri başka bir ${value} değeriyle zaten tanımlanmış.`;
          } else {
            delete station.errors[name];
          }
        }
        return station;
      }),
    }));
  };

  const enabled =
    route.route &&
    route.stations.every(station =>
      Object.entries(station).every(([key, value]) =>
        key === 'errors' ? Object.values(value).length === 0 : value
      )
    );

  return (
    <>
      <input
        type="text"
        value={route.route}
        onChange={handleRoute}
        placeholder="Güzergah"
      />
      <button onClick={addStation}>Yeni Durak Ekle</button>
      <br />
      <hr />
      {route.stations.map((station, key) => (
        <div>
          <input
            type="text"
            onChange={e => handleStation(e.target.value, 'name', key)}
            placeholder="Durak Adı"
          />
          <input
            type="text"
            onChange={e => handleStation(e.target.value, 'lat', key)}
            placeholder="Enlem"
          />
          <input
            type="text"
            onChange={e => handleStation(e.target.value, 'lon', key)}
            placeholder="Boylam"
          />
        </div>
      ))}
      <hr />
      <button disabled={!enabled}>Kaydet</button>
      <pre>{JSON.stringify(route, null, 2)}</pre>
    </>
  );
}

export default App;
