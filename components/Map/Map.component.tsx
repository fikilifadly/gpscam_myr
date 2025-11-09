// components/Map/WebViewMap.component.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './Map.component.styles';

interface WebViewMapProps {
  latitude: number;
  longitude: number;
  altitude?: number | null;
}

const WebViewMap: React.FC<WebViewMapProps> = ({ latitude, longitude, altitude }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100%; width: 100%; }
            .container { height: 100vh; width: 100%; position: relative; }
        </style>
    </head>
    <body>
        <div class="container">
            <div id="map"></div>
        </div>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script>
            var map = L.map('map').setView([${latitude}, ${longitude}], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(map);
            
            var marker = L.marker([${latitude}, ${longitude}]).addTo(map);
            marker.bindPopup('Photo Location<br>Lat: ${latitude.toFixed(6)}<br>Lng: ${longitude.toFixed(6)}').openPopup();
            
            // Disable zoom on scroll
            map.scrollWheelZoom.disable();
            map.doubleClickZoom.disable();
        </script>
    </body>
    </html>
  `;

  const openInBrowser = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.mapContainer}>
      <Text style={styles.mapTitle}>📍 Location Map</Text>
      
      <TouchableOpacity onPress={openInBrowser} style={styles.mapTouchable}>
        <View style={styles.staticMapContainer}>
          <WebView
            source={{ html }}
            style={styles.staticMap}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={false}
          />
        </View>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Tap to open in Google Maps</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>
          📍 {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Text>
        {altitude && (
          <Text style={styles.altitudeText}>
            🏔 Altitude: {altitude}m
          </Text>
        )}
      </View>
    </View>
  );
};

export default WebViewMap;