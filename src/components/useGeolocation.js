function useGeolocation() {
  function getPosition(dispatch) {
    if (!navigator.geolocation) {
      console.log("allow permition");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch({
          type: "currentPosition",
          payload: `${pos.coords.latitude},${pos.coords.longitude}`,
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  return { getPosition };
}

export default useGeolocation;
