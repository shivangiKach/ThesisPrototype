/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 52.379189, lng: 4.899431 },
      zoom: 10,
    });
  
    // Initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
  
    // Define the origin and destination as addresses
    const origin = "Parkwijk, Haarlem, Netherlands"; // Origin
    const destination = "Vrije Universiteit Amsterdam, Netherlands"; // Destination
  
    // Build the request
    const request = {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
  
    // Display the request on the page
    document.getElementById("request").innerText = JSON.stringify(request, null, 2);
  
    // Get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // Display the response on the page
      document.getElementById("response").innerText = JSON.stringify(response, null, 2);
  
      // Extract and display the distance and duration from the response
      const distance = response.rows[0].elements[0].distance.text;
      const duration = response.rows[0].elements[0].duration.text;
  
      document.getElementById("distance").innerText = `Distance: ${distance}`;
      document.getElementById("duration").innerText = `Duration: ${duration}`;
  
      // Display origin and destination on the map
      const originAddress = response.originAddresses[0];
      const destinationAddress = response.destinationAddresses[0];
  
      geocoder.geocode({ address: originAddress }).then(({ results }) => {
        new google.maps.Marker({
          map,
          position: results[0].geometry.location,
          label: "O",
        });
      });
  
      geocoder.geocode({ address: destinationAddress }).then(({ results }) => {
        new google.maps.Marker({
          map,
          position: results[0].geometry.location,
          label: "D",
        });
      });
    });
  }
  
  window.initMap = initMap;
  