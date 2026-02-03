declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    setLevel(level: number): void;
    getCenter(): LatLng;
    panTo(latlng: LatLng): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, marker: Marker): void;
    close(): void;
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
  }

  interface InfoWindowOptions {
    content: string;
    removable?: boolean;
  }

  interface CustomOverlayOptions {
    position: LatLng;
    content: string;
    yAnchor?: number;
  }

  namespace event {
    function addListener(
      target: Marker | Map,
      type: string,
      handler: () => void
    ): void;
  }

  function load(callback: () => void): void;
}

interface Window {
  kakao: typeof kakao;
}
