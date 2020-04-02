import React from 'react';
import GoogleMapReact from 'google-map-react';
import ReactDOM from 'react-dom';

export const Map = (props) => {

  const handleClick = (map, maps) => {
    const location = window.navigator && window.navigator.geolocation
    location.getCurrentPosition(position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      createMarker(map, maps, pos);
    })
  }

  const createMarker = (map, maps, location) => {
    const infoWindow = new maps.InfoWindow();
    const geocode = new maps.Geocoder();
    geocode.geocode({ location }, function (results, status) {
      if (status === 'OK') {
        const marker = new maps.Marker({ position: location, map, title: 'Click Me!' })
        maps.event.addListener(marker, 'click', function () {
          infoWindow.setPosition(location);
          infoWindow.setContent(results[0].formatted_address);
          infoWindow.open(map);
        });
        map.setCenter(location);
      }
    })
  }

  const handleOnLoad = (map, maps) => {
    const controlButtonDiv = document.createElement('div');
    ReactDOM.render(
      <button
        className="btn btn-success"
        onClick={() => handleClick(map, maps)}>
        Find Me!
      </button>,
      controlButtonDiv);
    map.controls[maps.ControlPosition.TOP_CENTER].push(controlButtonDiv);
  };

  const style = { height: '100vh', width: '100%' }

  return (
    <div style={style}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCxhHULsqibUfHdQgeL4K9mJIjM3HNDFY0" }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          handleOnLoad(map, maps)}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      />
    </div>
  );
}

Map.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11
};