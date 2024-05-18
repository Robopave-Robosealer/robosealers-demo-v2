import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  DrawingManager,
  Polygon,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import { Button, Flex, Loader } from "@mantine/core";
const libraries: any = ["drawing"];

const Drawing = () => {
  const mapRef = useRef<any>();
  const polygonRef = useRef<any>();
  const drawingManagerRef = useRef<any>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDJBumFjSoH-7NL9545OiwwS8iF-Mb_LW0",
    libraries: libraries,
  });

  const [polygon, setPolygon] = useState<any>(null);
  const [create, setCreate] = useState<any>(false);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: "#ff0000",
    strokeColor: "#ff0000",
    strokeWeight: 2,
    draggable: true,
    editable: true,
  };

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window.google?.maps?.drawing?.OverlayType?.POLYGON],
    },
  };

  const onLoadMap = (map: any) => {
    mapRef.current = map;
  };

  const onLoadPolygon = (polygon: any) => {
    polygonRef.current = polygon;
  };

  const onOverlayComplete = ($overlayEvent: any) => {
    setCreate(false);

    drawingManagerRef.current.setDrawingMode(null);

    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      if (polygonRef.current) {
        polygonRef.current.setMap(null); // Remove the existing polygon
      }

      const newPolygon = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      // Start and end point should be the same for a valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);

      handleMapClick([...newPolygon]);
      setPolygon(newPolygon);
      setTimeout(() => {
        setCreate(true);
      }, 500);
      $overlayEvent.overlay?.setMap(null);
    }
  };

  const onEditPolygon = () => {
    if (polygonRef.current) {
      const coordinates = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));
      create && handleMapClick(coordinates);

      setPolygon(coordinates);
    }
  };

  const onDeletePolygon = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      setPolygon(null);
    }
  };

  const handleMapClick = (coordinatesArray: any) => {
    // setSuccessArea(true);

    coordinatesArray.forEach(async (coordinate: any, index: any) => {
      const lat: any = coordinate.lat;
      const lng = coordinate.lng;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        if (response.ok) {
          const data = await response.json();
          const addresstype = data.addresstype;

          // Check address properties to determine the location type
          const isaAddressTypeRoad = addresstype == "road";
          // const isBuilding = addresstype == "place";
          // const isWater = address?.waterway || address?.natural;

          if (!isaAddressTypeRoad) {
            toast(
              <div
                style={{
                  backgroundColor: "#D24545",
                  padding: "1rem",
                  color: "white",
                  border: "none",
                  borderRadius: ".5rem",
                }}
              >
                {`Oops!, The point ${index + 1}
                 you selected does not represent a
                road.`}
              </div>,
              {
                position: "top-right",
              }
            );
          }
        } else {
          toast("Oops!,Error Happened!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast("Oops!,Error Happened!");
      }
    });
  };
  const [location, setLocation] = useState({
    lat: 30.1234777,
    lng: 31.6397073,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setLocation((prevLocation) => ({
        lat: prevLocation.lat + 0.0001,
        lng: prevLocation.lng + 0.0001,
      }));
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        zoom={15}
        center={location}
        onLoad={onLoadMap}
        mapContainerStyle={containerStyle}
      >
        <Marker position={location} />
        {!polygon && (
          <DrawingManager
            onLoad={(drawingManager) =>
              (drawingManagerRef.current = drawingManager)
            }
            // Change to overlaycomplete event directly
            onOverlayComplete={onOverlayComplete}
            options={drawingManagerOptions}
          />
        )}
        {polygon && (
          <Polygon
            onLoad={onLoadPolygon}
            options={polygonOptions}
            paths={polygon}
            draggable
            editable
            onMouseUp={onEditPolygon}
          />
        )}
      </GoogleMap>

      <br />
      {polygon && (
        <>
          <Button onClick={onDeletePolygon} bg="red">
            Delete
          </Button>
          {/* <div>
            <h2>coordinates</h2>
            {polygon.map((cord: any) => {
              return (
                <p key={Math.random()}>
                  <span>lat: {cord.lat}</span> <span>lng: {cord.lng}</span>
                </p>
              );
            })}
            <p></p>
          </div> */}
        </>
      )}
    </div>
  ) : (
    <Flex justify="center" align="center">
      <Loader />
    </Flex>
  );
};

export default Drawing;
