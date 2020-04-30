const createLatLngObject = (lat, lng) => {
  return {
    lat: lat,
    lng: lng,
  };
};

const createLocationObject = (
  fromLat,
  fromLng,
  fromTitle,
  toLat,
  toLng,
  toTitle,
  strokeColor,
  battery
) => {
  return {
    from: { ...createLatLngObject(fromLat,fromLng), fromTitle,strokeColor,battery },
    to: { ...createLatLngObject(toLat,toLng), toTitle },
  };
};

export {createLocationObject, createLatLngObject };
