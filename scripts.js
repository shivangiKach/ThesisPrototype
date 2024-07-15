document.addEventListener('DOMContentLoaded', function () {
    const indicatorsSelect = document.getElementById('indicators');
    const studentInfoCheckboxes = document.querySelectorAll('input[name="studentInfo"]');

    const neighbourhoodNames = {};
    const distancesFromVU = {};
    const travelTimes = {};
    const rooms = {};
    const apartments = {};
    

    function updateSelectStates() {
        const selectedOption = indicatorsSelect.value;

        
        if (selectedOption !== 'option1') {
            disableCheckboxes(studentInfoCheckboxes); 
        } else {
            disableCheckboxes(studentInfoCheckboxes, false); 
        }

        if (indicatorsSelect.value === "option1") {
            Papa.parse("UpdatedAmstelveen.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.wk_code] = row.lbm;
                        neighbourhoodNames[row.wk_code] = row.wk_naam;
                    });
                    updateScoreColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const score = scores[key]
                            polygon.off('click'); 
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>District:</b> ${text}<br><b>Overall Score: </b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }
    
        if (indicatorsSelect.value === "option2") {
            Papa.parse("UpdatedAmstelveen.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.wk_code] = row.won;
                        neighbourhoodNames[row.wk_code] = row.wk_naam;
                    });
                    updateIndicatorColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const score = scores[key];
                            polygon.off('click'); 
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>District:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }
    
        if (indicatorsSelect.value === "option3") {
            Papa.parse("UpdatedAmstelveen.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.wk_code] = row.fys;
                        neighbourhoodNames[row.wk_code] = row.wk_naam;
                    });
                    updateIndicatorColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const score = scores[key];
                            polygon.off('click'); 
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>District:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }
    
        if (indicatorsSelect.value === "option4") {
            Papa.parse("UpdatedAmstelveen.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.wk_code] = row.vrz;
                        neighbourhoodNames[row.wk_code] = row.wk_naam;
                    });
                    updateIndicatorColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const score = scores[key];
                            polygon.off('click'); 
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>District:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }
    
        if (indicatorsSelect.value === "option5") {
            Papa.parse("UpdatedAmstelveen.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.wk_code] = row.soc;
                        neighbourhoodNames[row.wk_code] = row.wk_naam;
                    });
                    updateIndicatorColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const score = scores[key];
                            const distance = distancesFromVU[key];
                            polygon.off('click'); 
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>District:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }
    
        if (indicatorsSelect.value === "option6") {
            Papa.parse("UpdatedAmstelveen.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.wk_code] = row.onv;
                        neighbourhoodNames[row.wk_code] = row.wk_naam;
                    });
                    updateIndicatorColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const score = scores[key];
                            polygon.off('click'); 
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>District:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }
        

    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');

    if (indicatorsSelect.value === "option1" ) {
        image1.style.display = 'block';
        image2.style.display = 'none';
    } else {
        image1.style.display = 'none';
        image2.style.display = 'block';
    }
        
    }

    

    indicatorsSelect.addEventListener('change', updateSelectStates);
    studentInfoCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            document.getElementById('image1').style.display = 'none';
            let checkedValues = [];
            studentInfoCheckboxes.forEach(function(cb) {
                if (cb.checked) {
                    checkedValues.push(cb.value);
                }
            });
            if (checkedValues.length === 1) {
                document.getElementById('image3').style.display = 'block';
                document.getElementById('image4').style.display = 'block';
                if (checkbox.value === "distance") {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmVUDistance;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                distancesFromVU[row.wk_code] = row.distance;
                                color[row.wk_code] = row.VUDistance;
                            });
                            updateDistanceColors(distancesFromVU);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const distance = distancesFromVU[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if (checkbox.value === "travelTime") {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmVUTravelTime;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                travelTimes[row.wk_code] = row.travel_time;
                                color[row.wk_code] = row.VUTravelTime;
                            });
                            updateTravelColors(travelTimes);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const travelTime = travelTimes[key]
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Travel time to VU:</b> ${travelTime} mins`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if (checkbox.value === "rooms") {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmRoomsStudios;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                rooms[row.wk_code] = row.number_rooms;
                                color[row.wk_code] = row.number_rooms;
                            });
                            updateRentalColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const room = rooms[key]
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Share of Rooms and Studios:</b> ${room}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if (checkbox.value === "apartments") {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmApartments;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                apartments[row.wk_code] = row.number_apartments;
                            });
                            updateRentalColors(apartments);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const apartment = apartments[key]
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if (checkbox.value === "all") {
                    document.getElementById('image1').style.display = 'block';
                    document.getElementById('image3').style.display = 'none';
                    document.getElementById('image4').style.display = 'none';
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmVUScore;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                distancesFromVU[row.wk_code] = row.distance;
                                travelTimes[row.wk_code] = row.travel_time;
                                rooms[row.wk_code] = row.number_rooms;
                                apartments[row.wk_code] = row.number_apartments;
                            });
                            updateScoreColors(scores);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const distance = distancesFromVU[key];
                                    const travelTime = travelTimes[key];
                                    const room = rooms[key];
                                    const apartment = apartments[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Total Livability Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Travel time to VU:</b> ${travelTime} mins<br><b>Share of Rooms and Studios:</b> ${room}<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                
                
            }
            if(checkedValues.length === 2) {
                document.getElementById('image3').style.display = 'block';
                document.getElementById('image4').style.display = 'block';
                if((checkedValues[0] === "distance" && checkedValues[1] === "rooms") || (checkedValues[0] === "rooms" && checkedValues[1] === "distance")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmDistanceRoomsStudios;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                distancesFromVU[row.wk_code] = row.distance;
                                rooms[row.wk_code] = row.number_rooms;
                                color[row.wk_code] = row.DistanceRoomsStudios;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const distance = distancesFromVU[key];
                                    const room = rooms[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Share of Rooms and Studios:</b> ${room}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if((checkedValues[0] === "distance" && checkedValues[1] === "apartments") || (checkedValues[0] === "apartments" && checkedValues[1] === "distance")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmDistanceApartments;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                distancesFromVU[row.wk_code] = row.distance;
                                apartments[row.wk_code] = row.number_apartments;
                                color[row.wk_code] = row.DistanceApartments;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const distance = distancesFromVU[key];
                                    const apartment = apartments[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if((checkedValues[0] === "distance" && checkedValues[1] === "travelTime") || (checkedValues[0] === "travelTime" && checkedValues[1] === "distance")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmDistanceTravel;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                distancesFromVU[row.wk_code] = row.distance;
                                travelTimes[row.wk_code] = row.travel_time;
                                color[row.wk_code] = row.DistanceTravel;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const distance = distancesFromVU[key];
                                    const travelTime = travelTimes[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Travel time to VU:</b> ${travelTime} mins`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    }); 
                }
                if((checkedValues[0] === "travelTime" && checkedValues[1] === "rooms") || (checkedValues[0] === "rooms" && checkedValues[1] === "travelTime")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmTravelRoomsStudios;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                rooms[row.wk_code] = row.number_rooms;
                                travelTimes[row.wk_code] = row.travel_time;
                                color[row.wk_code] = row.TravelRoomsStudios;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const room = rooms[key];
                                    const travelTime = travelTimes[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Travel time to VU:</b> ${travelTime} mins<br><b>Share of Rooms and Studios:</b> ${room}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    }); 
                }
                if((checkedValues[0] === "travelTime" && checkedValues[1] === "apartments") || (checkedValues[0] === "apartments" && checkedValues[1] === "travelTime")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmTravelApartments;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                apartments[row.wk_code] = row.number_apartments;
                                travelTimes[row.wk_code] = row.travel_time;
                                color[row.wk_code] = row.TravelApartments;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const apartment = apartments[key];
                                    const travelTime = travelTimes[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Travel time to VU:</b> ${travelTime} mins<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    }); 
                }
            if((checkedValues[0] === "rooms" && checkedValues[1] === "apartments") || (checkedValues[0] === "apartments" && checkedValues[1] === "rooms")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            const rentals = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmRental;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                apartments[row.wk_code] = row.number_apartments;
                                rooms[row.wk_code] = row.number_rooms;
                                color[row.wk_code] = row.Rental;
                                rentals[row.wk_code] = row.number_of_rental;
                            });
                            updateRentalColors(rentals);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const apartment = apartments[key];
                                    const room = rooms[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Share of Rooms and Studios:</b> ${room}<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }

                
            }
            if(checkedValues.length === 3) {
                document.getElementById('image3').style.display = 'block';
                document.getElementById('image4').style.display = 'block';
                if((checkedValues[0] === "distance" && checkedValues[1] === "rooms" && checkedValues[2] === "apartments") ||
                (checkedValues[0] === "distance" && checkedValues[1] === "apartments" && checkedValues[2] === "rooms") ||
                (checkedValues[0] === "rooms" && checkedValues[1] === "distance" && checkedValues[2] === "apartments" )||
                (checkedValues[0] === "rooms" && checkedValues[1] === "apartments" && checkedValues[2] === "distance" )||
                (checkedValues[0] === "apartments" && checkedValues[1] === "rooms" && checkedValues[2] === "distance") ||
                (checkedValues[0] === "apartments" && checkedValues[1] === "distance" && checkedValues[2] === "rooms")){
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmDistanceRental;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                distancesFromVU[row.wk_code] = row.distance;
                                apartments[row.wk_code] = row.number_apartments;
                                rooms[row.wk_code] = row.number_rooms;
                                color[row.wk_code] = row.DistanceRental;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const distance = distancesFromVU[key];
                                    const apartment = apartments[key];
                                    const room = rooms[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Share of Rooms and Studios:</b> ${room}<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if((checkedValues[0] === "travelTime" && checkedValues[1] === "rooms" && checkedValues[2] === "apartments") ||
                (checkedValues[0] === "travelTime" && checkedValues[1] === "apartments" && checkedValues[2] === "rooms")||
                (checkedValues[0] === "rooms" && checkedValues[1] === "travelTime" && checkedValues[2] === "apartments" )||
                (checkedValues[0] === "rooms" && checkedValues[1] === "apartments" && checkedValues[2] === "travelTime" )||
                (checkedValues[0] === "apartments" && checkedValues[1] === "rooms" && checkedValues[2] === "travelTime") ||
                (checkedValues[0] === "apartments" && checkedValues[1] === "travelTime" && checkedValues[2] === "rooms")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmTravelRental;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                travelTimes[row.wk_code] = row.travel_time;
                                apartments[row.wk_code] = row.number_apartments;
                                rooms[row.wk_code] = row.number_rooms;
                                color[row.wk_code] = row.TravelRental;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const travelTime = travelTimes[key];
                                    const apartment = apartments[key];
                                    const room = rooms[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Travel time to VU:</b> ${travelTime} mins<br><b>Share of Rooms and Studios:</b> ${room}<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }
                if((checkedValues[0] === "distance" && checkedValues[1] === "travelTime" && checkedValues[2] === "rooms") || 
                (checkedValues[0] === "distance" && checkedValues[1] === "rooms" && checkedValues[2] === "travelTime") ||
                (checkedValues[0] === "travelTime" && checkedValues[1] === "distance" && checkedValues[2] === "rooms") ||
                (checkedValues[0] === "travelTime" && checkedValues[1] === "rooms" && checkedValues[2] === "distance") ||
                (checkedValues[0] === "rooms" && checkedValues[1] === "travelTime" && checkedValues[2] === "distance") ||
                (checkedValues[0] === "rooms" && checkedValues[1] === "distance" && checkedValues[2] === "travelTime")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmDistanceTravelRooms;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                travelTimes[row.wk_code] = row.travel_time;
                                distancesFromVU[row.wk_code] = row.distance;
                                rooms[row.wk_code] = row.number_rooms;
                                color[row.wk_code] = row.DistanceTravelRooms;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const travelTime = travelTimes[key];
                                    const distance = distancesFromVU[key];
                                    const room = rooms[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Travel time to VU:</b> ${travelTime} mins<br><b>Share of Rooms and Studios:</b> ${room}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }

                if((checkedValues[0] === "distance" && checkedValues[1] === "travelTime" && checkedValues[2] === "apartments") || 
                (checkedValues[0] === "distance" && checkedValues[1] === "apartments" && checkedValues[2] === "travelTime") ||
                (checkedValues[0] === "travelTime" && checkedValues[1] === "distance" && checkedValues[2] === "apartments") ||
                (checkedValues[0] === "travelTime" && checkedValues[1] === "apartments" && checkedValues[2] === "distance") ||
                (checkedValues[0] === "apartments" && checkedValues[1] === "travelTime" && checkedValues[2] === "distance") ||
                (checkedValues[0] === "apartments" && checkedValues[1] === "distance" && checkedValues[2] === "travelTime")) {
                    Papa.parse("UpdatedAmstelveen.csv", {
                        download: true,
                        header: true,
                        complete: function (results) {
                            const scores = {};
                            const color = {};
                            results.data.forEach(row => {
                                scores[row.wk_code] = row.lbmDistanceTravelApartments;
                                neighbourhoodNames[row.wk_code] = row.wk_naam;
                                travelTimes[row.wk_code] = row.travel_time;
                                distancesFromVU[row.wk_code] = row.distance;
                                apartments[row.wk_code] = row.number_apartments;
                                color[row.wk_code] = row.DistanceTravelApartments;
                            });
                            updateIndicatorColors(color);
                            for (const key in polygons) {
                                if (polygons.hasOwnProperty(key)) {
                                    const polygon = polygons[key];
                                    const text = neighbourhoodNames[key];
                                    const score = scores[key];
                                    const travelTime = travelTimes[key];
                                    const distance = distancesFromVU[key];
                                    const apartment = apartments[key];
                                    polygon.off('click'); 
                                    polygon.on('click', function(event) {
                                        const center = polygon.getBounds().getCenter();
                                        L.popup({closeOnClick: true })
                                            .setLatLng(center)
                                            .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Travel time to VU:</b> ${travelTime} mins<br><b>Share of Apartments:</b> ${apartment}`)
                                            .openOn(map);
                                    });
                                }
                            }
                        }
                    });
                }

            }
            if(checkedValues.length === 4) {
                document.getElementById('image3').style.display = 'block';
                Papa.parse("UpdatedAmstelveen.csv", {
                    download: true,
                    header: true,
                    complete: function (results) {
                        const scores = {};
                        const color = {}
                        results.data.forEach(row => {
                            scores[row.wk_code] = row.lbmVUScore;
                            neighbourhoodNames[row.wk_code] = row.wk_naam;
                            distancesFromVU[row.wk_code] = row.distance;
                            travelTimes[row.wk_code] = row.travel_time;
                            rooms[row.wk_code] = row.number_rooms;
                            apartments[row.wk_code] = row.number_apartments;
                            color[row.wk_code] = row.VUScore;
                        });
                        updateIndicatorColors(color);
                        for (const key in polygons) {
                            if (polygons.hasOwnProperty(key)) {
                                const polygon = polygons[key];
                                const text = neighbourhoodNames[key];
                                const score = scores[key];
                                const distance = distancesFromVU[key];
                                const travelTime = travelTimes[key];
                                const room = rooms[key];
                                const apartment = apartments[key];
                                polygon.off('click'); 
                                polygon.on('click', function(event) {
                                    const center = polygon.getBounds().getCenter();
                                    L.popup({closeOnClick: true })
                                        .setLatLng(center)
                                        .setContent(`<b>District:</b> ${text}<br><b>Overall Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km<br><b>Travel time to VU:</b> ${travelTime} mins<br><b>Share of Rooms and Studios:</b> ${room}<br><b>Share of Apartments:</b> ${apartment}`)
                                        .openOn(map);
                                });
                            }
                        }
                    }
                });
            }
            
        });
    });


    function disableCheckboxes(checkboxes, disable = true) {
        checkboxes.forEach(function (checkbox) {
            checkbox.disabled = disable;
            if (disable) {
                checkbox.checked = false; // Uncheck if disabled
            }
        });
    }

    var map = L.map('map', {
        center: [52.3050, 4.8601], 
        zoom: 11,
        zoomControl: true, 
        dragging: true, 
        scrollWheelZoom: false, 
        doubleClickZoom: true, 
        boxZoom: false, 
        touchZoom: false,
    });

  
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
    }).addTo(map);

    const amstelveenBounds = L.latLngBounds([
        [52.2811, 4.8121], 
        [52.3290, 4.9081]  
    ]);

    map.fitBounds(amstelveenBounds);

    var polygons = {
        WK036201: L.polygon([[52.313490, 4.853524],
            [52.313277, 4.863290],
            [52.314494, 4.863615],
            [52.315899, 4.870619],
            [52.319514, 4.869312],
            [52.321924, 4.869136],
            [52.321785, 4.861794],
            [52.321863, 4.861546],
            [52.321799, 4.858123],
            [52.321638, 4.857699],
            [52.321665, 4.856505],
            [52.318885, 4.856424],
            [52.316604, 4.855738],
            [52.314865, 4.854992]]).addTo(map),
        WK036202: L.polygon([[52.316391, 4.855709],
            [52.316491, 4.852095],
            [52.316925, 4.848685],
            [52.316827, 4.847158],
            [52.316741, 4.840890],
            [52.311497, 4.841111],
            [52.307910, 4.841633],
            [52.304996, 4.840098],
            [52.304285, 4.846230],
            [52.303454, 4.849879],
            [52.304725, 4.850526],
            [52.310827, 4.850742],
            [52.312290, 4.851800],
            [52.314280, 4.854526],
            [52.316378, 4.855703]]).addTo(map),
        WK036203: L.polygon([[52.315894, 4.870611],
            [52.314680, 4.863952],
            [52.314324, 4.863433],
            [52.313267, 4.863306],
            [52.313492, 4.853510],
            [52.312075, 4.851526],
            [52.310792, 4.850744],
            [52.304812, 4.850508],
            [52.303706, 4.850137],
            [52.304619, 4.851835],
            [52.305305, 4.852853],
            [52.306354, 4.857090],
            [52.306354, 4.857090],
            [52.305870, 4.861664],
            [52.303219, 4.871954],
            [52.304856, 4.872402],
            [52.310517, 4.872542],
            [52.312904, 4.872022]]).addTo(map),
        WK036204: L.polygon([[52.303210, 4.871963],
            [52.298454, 4.868998],
            [52.303414, 4.849920],
            [52.305347, 4.852929],
            [52.306292, 4.856511],
            [52.306206, 4.860093]]).addTo(map),
        WK036205: L.polygon([[52.322147, 4.882111],
            [52.321967, 4.869397],
            [52.319196, 4.869519],
            [52.317880, 4.869693],
            [52.315896, 4.870613],
            [52.317526, 4.879946],
            [52.317582, 4.882690]]).addTo(map),
        WK036206: L.polygon([[52.317607, 4.883912],
            [52.317536, 4.880069],
            [52.317175, 4.877739],
            [52.315892, 4.870619],
            [52.312829, 4.872041],
            [52.311232, 4.872484],
            [52.307796, 4.872508],
            [52.304882, 4.872402],
            [52.303832, 4.872230],
            [52.302244, 4.871372],
            [52.298452, 4.869011],
            [52.296681, 4.879311],
            [52.300932, 4.882058],
            [52.300775, 4.882959],
            [52.306994, 4.883302],
            [52.309578, 4.883423],
            [52.309755, 4.883170],
            [52.310686, 4.883069],
            [52.310720, 4.882371],
            [52.311730, 4.882414],
            [52.311887, 4.883337],
            [52.312792, 4.883661]]).addTo(map),
        WK036207: L.polygon([ [52.322561, 4.895259],
            [52.322150, 4.882090],
            [52.320065, 4.882197],
            [52.317569, 4.882423],
            [52.317613, 4.883955],
            [52.312798, 4.883663],
            [52.311884, 4.883299],
            [52.311706, 4.882423],
            [52.310703, 4.882460],
            [52.310658, 4.883116],
            [52.309699, 4.883226],
            [52.309588, 4.883444],
            [52.306979, 4.883335],
            [52.306994, 4.883302],
            [52.300801, 4.882916],
            [52.300932, 4.882058],
            [52.296660, 4.879356],
            [52.294801, 4.891165],
            [52.295519, 4.892899],
            [52.296080, 4.899989],
            [52.297031, 4.900918],
            [52.299619, 4.898070],
            [52.300780, 4.898771],
            [52.307036, 4.907294],
            [52.311480, 4.904523],
            [52.314532, 4.905566],
            [52.316192, 4.904825],
            [52.318539, 4.908473],
            [52.321020, 4.901835],
            [52.321915, 4.895877]]).addTo(map),
        WK036208: L.polygon([[52.298473, 4.868945],
            [52.301793, 4.854817],
            [52.303439, 4.849928],
            [52.302404, 4.848981],
            [52.299723, 4.845680],
            [52.292433, 4.843743],
            [52.286601, 4.842140],
            [52.284855, 4.855975],
            [52.285047, 4.858242],
            [52.286242, 4.860743],
            [52.290999, 4.864222]]).addTo(map),
        WK036209:L.polygon([[52.296693, 4.879280],
            [52.297422, 4.874075],
            [52.298443, 4.868986],
            [52.287930, 4.861937],
            [52.286544, 4.861112],
            [52.285687, 4.860017],
            [52.284817, 4.861227],
            [52.284324, 4.861400],
            [52.283971, 4.861227],
            [52.281715, 4.869984],
            [52.281469, 4.869927],
            [52.281257, 4.871482],
            [52.292403, 4.877694],
            [52.292530, 4.877178],
            [52.294034, 4.877695]]).addTo(map),
        WK036210: L.polygon([[52.281733, 4.869959],
            [52.283956, 4.861243],
            [52.284722, 4.861345],
            [52.285682, 4.860019],
            [52.285020, 4.857989],
            [52.284871, 4.856013],
            [52.286543, 4.842209],
            [52.277469, 4.839259],
            [52.275498, 4.853658],
            [52.273669, 4.867326],
            [52.274437, 4.867651],
            [52.274405, 4.867989],
            [52.274662, 4.868656],
            [52.275263, 4.868866],
            [52.275442, 4.869151],
            [52.278211, 4.869264]]).addTo(map),
        WK036211: L.polygon([[52.291599, 4.843605],
            [52.291666, 4.842914],
            [52.292244, 4.840180],
            [52.292551, 4.840409],
            [52.293841, 4.834822],
            [52.294021, 4.834941],
            [52.294274, 4.833956],
            [52.293889, 4.833332],
            [52.293871, 4.832364],
            [52.293489, 4.831529],
            [52.293617, 4.831387],
            [52.293485, 4.830979],
            [52.293276, 4.830379],
            [52.293155, 4.830484],
            [52.293058, 4.830246],
            [52.293011, 4.830295],
            [52.291951, 4.827103],
            [52.292082, 4.826963],
            [52.291997, 4.826733],
            [52.291814, 4.826885],
            [52.291678, 4.826562],
            [52.291546, 4.826645],
            [52.291392, 4.826139],
            [52.291579, 4.825993],
            [52.291341, 4.825244],
            [52.291237, 4.825343],
            [52.290434, 4.823591],
            [52.289855, 4.824329],
            [52.281586, 4.815268],
            [52.279792, 4.821661],
            [52.280456, 4.822423],
            [52.279900, 4.824094],
            [52.278159, 4.822863],
            [52.275737, 4.831337],
            [52.279415, 4.834474],
            [52.278751, 4.839752],
            [52.286572, 4.842128]]).addTo(map),
        WK036212: L.polygon([[52.278686, 4.839685],
            [52.279403, 4.834448],
            [52.275673, 4.831530],
            [52.278144, 4.822828],
            [52.279913, 4.824131],
            [52.280487, 4.822411],
            [52.279897, 4.821968],
            [52.281587, 4.815221],
            [52.276807, 4.810293],
            [52.269471, 4.836249]]).addTo(map),
        WK036213: L.polygon([[52.294505, 4.891414],
            [52.296674, 4.879287],
            [52.292575, 4.877168],
            [52.292383, 4.877719],
            [52.281255, 4.871490],
            [52.281463, 4.869904],
            [52.278894, 4.869450],
            [52.277030, 4.869192],
            [52.277030, 4.869192],
            [52.274666, 4.868720],
            [52.274378, 4.867690],
            [52.273649, 4.867368],
            [52.277450, 4.839247],
            [52.269449, 4.835979],
            [52.277022, 4.811020],
            [52.261496, 4.796787],
            [52.257708, 4.808750],
            [52.258339, 4.814114],
            [52.248995, 4.843817],
            [52.242175, 4.852687],
            [52.246090, 4.854750],
            [52.252026, 4.868570],
            [52.261243, 4.872283],
            [52.264526, 4.881565],
            [52.279168, 4.878059],
            [52.284594, 4.884041]]).addTo(map),
        WK036214:L.polygon([[52.330762, 4.856429],
            [52.330868, 4.846542],
            [52.329384, 4.839691],
            [52.327741, 4.839430],
            [52.326309, 4.818356],
            [52.323977, 4.819136],
            [52.313215, 4.815840],
            [52.306113, 4.809817],
            [52.290155, 4.824355],
            [52.294194, 4.833815],
            [52.291555, 4.843595],
            [52.296955, 4.844917],
            [52.299669, 4.845666],
            [52.303422, 4.849911],
            [52.303416, 4.849894],
            [52.304282, 4.846503],
            [52.304951, 4.840090],
            [52.307375, 4.841587],
            [52.309619, 4.841418],
            [52.316671, 4.840828],
            [52.316877, 4.847534],
            [52.316942, 4.848631],
            [52.316491, 4.852005],
            [52.316491, 4.852005],
            [52.316400, 4.855813],
            [52.323732, 4.856518]
    ]).addTo(map)
    };


    const scores1 = {};
    image1.style.display = 'block';

    Papa.parse("UpdatedAmstelveen.csv", {
        download: true,
        header: true,
        complete: function (results) {
            results.data.forEach(row => {
                scores1[row.wk_code] = row.lbm;
                neighbourhoodNames[row.wk_code] = row.wk_naam;
            });
            updateScoreColors(scores1);
            for (const key in polygons) {
                if (polygons.hasOwnProperty(key)) {
                    const polygon = polygons[key];
                    const text = neighbourhoodNames[key];
                    const score = scores1[key];
                    polygon.off('click'); 
                    polygon.on('click', function(event) {
                        const center = polygon.getBounds().getCenter();
                        L.popup({closeOnClick: false })
                            .setLatLng(center)
                            .setContent(`<b>District:</b> ${text}<br><b>Score:</b> ${score}`)
                            .openOn(map);
                    });
                }
            }
        }
    });






    function updateScoreColors(scores) {
        for (const key in polygons) {
            if (polygons.hasOwnProperty(key)) {
                const polygon = polygons[key];
                const score = scores[key];
                const color = getScoreColor(score);
                polygon.setStyle({ fillColor: color, fillOpacity: 0.7, color: '#666666'});
            }
        }
    }

    function updateIndicatorColors(scores) {
        for (const key in polygons) {
            if (polygons.hasOwnProperty(key)) {
                const polygon = polygons[key];
                const score = scores[key];
                const color = getIndicatorColor(score);
                polygon.setStyle({ fillColor: color, fillOpacity: 0.7, color: '#666666'});
            }
        }
    }

    function updateRentalColors(scores) {
        for (const key in polygons) {
            if (polygons.hasOwnProperty(key)) {
                const polygon = polygons[key];
                const score = scores[key];
                const color = getRentalColors(score);
                polygon.setStyle({ fillColor: color, fillOpacity: 0.7, color: '#666666'});
            }
        }
    }

    function updateTravelColors(scores) {
        for (const key in polygons) {
            if (polygons.hasOwnProperty(key)) {
                const polygon = polygons[key];
                const score = scores[key];
                const color = getTavelTimeColor(score);
                polygon.setStyle({ fillColor: color, fillOpacity: 0.7, color: '#666666'});
            }
        }
    }

    function updateDistanceColors(scores) {
        for (const key in polygons) {
            if (polygons.hasOwnProperty(key)) {
                const polygon = polygons[key];
                const score = scores[key];
                const color = getDistanceColors(score);
                polygon.setStyle({ fillColor: color, fillOpacity: 0.7, color: '#666666'});
            }
        }
    }

    function getIndicatorColor(value) {
        if (value < -0.236) {
            return '#d66982';
        } else if (value >= -0.236 && value < -0.157) {
            return '#dd899b';
        } else if (value >= -0.157 && value < -0.079) {
            return '#e5a9b5';
        } else if(value >= -0.079 && value < -0.039) {
            return '#f3c9d1';
        } else if(value >= -0.039 && value < 0.039) {
            return '#f8fce4';
        } else if(value >= 0.039 && value < 0.079) {
            return '#d6ddaf';
        } else if(value >= 0.079 && value < 0.157) {
            return '#b5be7e';
        } else if(value >= 0.157 && value < 0.236) {
            return '#96a04a';
        }
        return '#798233';  //for values greater than 0.236
    }

    function getTavelTimeColor(value) {
        if (value > 72) {
            return '#d66982';
        } else if (value <= 72 && value > 63) {
            return '#dd899b';
        } else if (value <= 63 && value > 54) {
            return '#e5a9b5';
        } else if(value <= 54 && value > 45) {
            return '#f3c9d1';
        } else if(value <= 45 && value > 36) {
            return '#f8fce4';
        } else if(value <= 36 && value > 27) {
            return '#d6ddaf';
        } else if(value <= 27 && value > 18) {
            return '#b5be7e';
        } else if(value <= 18 && value > 9) {
            return '#96a04a';
        }
        return '#798233';  //for values greater than 0.236
    }

    function getRentalColors(value) {
        if (value == 0) {
            return '#d66982';
        } else if (value == 1) {
            return '#dd899b';
        } else if (value == 2) {
            return '#e5a9b5';
        } else if(value == 3) {
            return '#f3c9d1';
        } else if(value == 4) {
            return '#f8fce4';
        } else if(value == 5) {
            return '#d6ddaf';
        } else if(value == 6) {
            return '#b5be7e';
        } else if(value == 7) {
            return '#96a04a';
        }
        return '#798233';  //for values greater than 0.236
    }

    function getDistanceColors(value) {
        if (value > 24) {
            return '#d66982';
        } else if (value <= 24 && value > 21) {
            return '#dd899b';
        } else if (value <= 21 && value > 18) {
            return '#e5a9b5';
        } else if(value <= 18 && value > 15) {
            return '#f3c9d1';
        } else if(value <= 15 && value > 12) {
            return '#f8fce4';
        } else if(value <= 12 && value > 9) {
            return '#d6ddaf';
        } else if(value <= 9 && value > 6) {
            return '#b5be7e';
        } else if(value <= 6 && value > 3) {
            return '#96a04a';
        }
        return '#798233';  //for values greater than 0.236
    }

    function getScoreColor(value) {
       if(value < 3.67) {
        return '#cf7840';
       } else if(value >= 3.67 && value < 3.74) {
        return '#d8995e';
       } else if(value >= 3.74 && value < 3.81) {
        return '#e0b882';
       } else if(value >= 3.81 && value < 3.93) {
        return '#fbf2c4';
       } else if(value >= 3.93 && value < 3.99) {
        return '#d1d2a6';
       } else if(value >= 3.99 && value < 4.11) {
        return '#a8b38a';
       } else if(value >= 4.11 && value < 4.19) {
        return '#819470';
       } else if(value >= 4.19 && value < 4.27) {
        return '#5e7659';
       }
       return '#3c5941';
    }

});
