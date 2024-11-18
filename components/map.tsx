"use client";
import { useEffect, useRef } from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import apartment from "@/geojson/apartment.json";
import buildings from "@/geojson/buildings.json";
import columbary from "@/geojson/columbary.json";
import lawn from "@/geojson/lawn.json";
import routes from "@/geojson/residential_routes.json";

interface Props {
  onDragEnd?: (coordinate: { latitude: number; longitude: number }) => void;
  coords?: { latitude: number; longitude: number };
}

const Map = ({
  onDragEnd,
  coords = { longitude: 121.14666422082337, latitude: 14.733034006356064 },
}: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = new maplibregl.Map({
        container: mapRef.current, // container id
        style:
          "https://api.maptiler.com/maps/608de5e8-9e8f-4899-b8ed-b319ac0ce0a4/style.json?key=AWxYqeit04pvjyks83vM", // style URL
        center: [121.14666422082337, 14.733034006356064], // starting position [lng, lat]
        zoom: 18, // starting zoom
        maxZoom: 20,
        minZoom: 16,
        attributionControl: false,
      });

      map.on("load", () => {
        map.addSource("buildings", {
          type: "geojson",
          data: buildings as GeoJSON.FeatureCollection,
        });

        map.addSource("routes", {
          type: "geojson",
          data: routes as GeoJSON.FeatureCollection,
        });
        map.addSource("lawn", {
          type: "geojson",
          data: lawn as GeoJSON.FeatureCollection,
        });
        map.addSource("apartment", {
          type: "geojson",
          data: apartment as GeoJSON.FeatureCollection,
        });
        map.addSource("columbary", {
          type: "geojson",
          data: columbary as GeoJSON.FeatureCollection,
        });

        map.addLayer({
          id: "buildingFillLayers",
          source: "buildings",
          type: "fill",
          paint: {
            "fill-color": "#f1f1f1",
          },
        });
        map.addLayer({
          type: "line",
          id: "buildingLineLayers",
          source: "buildings",
          paint: {
            "line-width": 1,
            "line-color": "lightgray",
          },
        });

        map.addLayer({
          type: "line",
          id: "routeStrokeLayer",
          source: "routes",
          paint: {
            "line-width": 6,
            "line-color": "#c3c3c3",
          },
        });
        map.addLayer({
          type: "line",
          id: "routeLayer",
          source: "routes",
          paint: {
            "line-width": 4,
            "line-color": "#fff",
          },
        });

        map.addLayer({
          type: "fill",
          id: "lawnLayer",
          source: "lawn",
          paint: {
            "fill-color": "lightgreen",
          },
        });
        map.addLayer({
          type: "line",
          id: "lawnLineLayer",
          source: "lawn",
          paint: {
            "line-width": 1,
            "line-color": "#c3c3c3",
          },
        });
        map.addLayer({
          type: "fill",
          id: "apartmentLayer",
          source: "apartment",
          paint: {
            "fill-color": "#f1c1f1",
          },
        });
        map.addLayer({
          type: "line",
          id: "apartmentLineLayer",
          source: "apartment",
          paint: {
            "line-width": 1,
            "line-color": "#c3c3c3",
          },
        });
        map.addLayer({
          type: "fill",
          id: "columbaryLayer",
          source: "columbary",
          paint: {
            "fill-color": "#f1f1f1",
          },
        });
        map.addLayer({
          type: "line",
          id: "columbaryLineLayer",
          source: "columbary",
          paint: {
            "line-width": 1,
            "line-color": "#c3c3c3",
          },
        });
        map.addLayer({
          id: "buildingSymbolLayers",
          source: "buildings",
          type: "symbol",
          layout: {
            "text-field": ["get", "label"],
            "text-size": 10,
          },
          paint: {
            "text-color": "white",
            "text-halo-color": "black",
            "text-halo-width": 1,
          },
        });
        map.addLayer({
          id: "columbarySymbolLayers",
          source: "columbary",
          type: "symbol",
          layout: {
            "text-field": ["get", "label"],
            "text-size": 10,
          },
          paint: {
            "text-color": "white",
            "text-halo-color": "black",
            "text-halo-width": 1,
          },
        });
        map.addLayer({
          id: "lawnSymbolLayers",
          source: "lawn",
          type: "symbol",
          layout: {
            "text-field": ["get", "label"],
            "text-size": 10,
          },
          paint: {
            "text-color": "white",
            "text-halo-color": "black",
            "text-halo-width": 1,
          },
        });
        map.addLayer({
          id: "apartmentSymbolLayers",
          source: "apartment",
          type: "symbol",
          layout: {
            "text-field": ["get", "label"],
            "text-size": 10,
          },
          paint: {
            "text-color": "white",
            "text-halo-color": "black",
            "text-halo-width": 1,
          },
        });
      });

      const marker = new maplibregl.Marker({ draggable: true })
        .setLngLat([coords.longitude, coords.latitude])
        .addTo(map);
      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        if (onDragEnd)
          onDragEnd({ longitude: lngLat.lng, latitude: lngLat.lat });
      });
    }
  }, [mapRef]);

  return (
    <div ref={mapRef} id="map" style={{ width: "100%", height: "100%" }} />
  );
};

export default Map;
