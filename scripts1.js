document.addEventListener('DOMContentLoaded', function () {
    const indicatorsSelect = document.getElementById('indicators');
    const studentInfoSelect = document.getElementById('studentInfo');

    const neighbourhoodNames = {};
    const distancesFromVU = {};
    const totalRentals = {};
    

    function updateSelectStates() {
        if (indicatorsSelect.value !== "option1") {
            studentInfoSelect.disabled = true;
        } else {
            studentInfoSelect.disabled = false;
        }

        if (studentInfoSelect.value !== "option1") {
            indicatorsSelect.disabled = true;
        } else {
            indicatorsSelect.disabled = false;
        }

        if (indicatorsSelect.value === "option1") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.lbm;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
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
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Overall Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

        if (indicatorsSelect.value === "option2") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.won;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
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
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

        if (indicatorsSelect.value === "option3") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.fys;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
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
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

        if (indicatorsSelect.value === "option4") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.vrz;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
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
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

        if (indicatorsSelect.value === "option5") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.soc;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
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
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

        if (indicatorsSelect.value === "option6") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.onv;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
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
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

        if (studentInfoSelect.value === "option2") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function(results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.lbmVUDistance;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
                        distancesFromVU[row.bu_code] = row.distance;
                    });
                    updateScoreColors(scores);
        
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const distance = distancesFromVU[key];
                            const score = scores[key];
                            
                            polygon.off('click'); 
                            
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({ closeButton: true, closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}<br><b>Distance from VU:</b> ${distance} km`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }
        

        if (studentInfoSelect.value === "option3") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.lbmRental;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
                        totalRentals[row.bu_code] = row.number_of_rental;
                    });
                    updateScoreColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const rental = totalRentals[key];
                            const score = scores[key];
                            
                            polygon.off('click'); 
                            
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({ closeButton: true, closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}<br><b>Total Rentals:</b> ${rental}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

        if (studentInfoSelect.value === "option4") {
            Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
                download: true,
                header: true,
                complete: function (results) {
                    const scores = {};
                    results.data.forEach(row => {
                        scores[row.bu_code] = row.lbmVUScore;
                        neighbourhoodNames[row.bu_code] = row.bu_naam;
                        distancesFromVU[row.bu_code] = row.distance;
                        totalRentals[row.bu_code] = row.number_of_rental;
                    });
                    updateScoreColors(scores);
                    for (const key in polygons) {
                        if (polygons.hasOwnProperty(key)) {
                            const polygon = polygons[key];
                            const text = neighbourhoodNames[key];
                            const distance = distancesFromVU[key];
                            const rental = totalRentals[key];
                            const score = scores[key];
                            
                            polygon.off('click'); 
                            
                            polygon.on('click', function(event) {
                                const center = polygon.getBounds().getCenter();
                                L.popup({ closeButton: true, closeOnClick: true })
                                    .setLatLng(center)
                                    .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}<br><b>Distance from VU: </b>${distance} km<br><b>Total Rentals:</b> ${rental}`)
                                    .openOn(map);
                            });
                        }
                    }
                }
            });
        }

    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');

    if (
        indicatorsSelect.value === "option1" ||
        studentInfoSelect.value == "option2" ||
        studentInfoSelect.value === "option3" ||
        studentInfoSelect.value === "option4"
    ) {
        image1.style.display = 'block';
        image2.style.display = 'none';
    } else {
        image1.style.display = 'none';
        image2.style.display = 'block';
    }
        
    }

    indicatorsSelect.addEventListener('change', updateSelectStates);
    studentInfoSelect.addEventListener('change', updateSelectStates);

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

    const hoofddorpBounds = L.latLngBounds([
        [52.2572, 4.6212], 
        [52.3441, 4.7378]
    ]);

    map.fitBounds(hoofddorpBounds);

    var polygons = {
        BU03940101: L.polygon([[52.3100,4.6827], [52.3048,4.6847], [52.3042,4.6846], [52.3028,4.6835], [52.3011,4.6836], [52.3011,4.6836], [52.3002,4.6852],[52.3056,4.6927],
            [52.3106,4.6836]]).addTo(map),
        BU03940102: L.polygon([[52.3014,4.6866], [52.2931,4.6966], [52.2938,4.6976], [52.2938,4.6984], [52.2939,4.7000], [52.2954,4.7055], [52.2970,4.7077], [52.2980,4.7069], 
            [52.3056,4.6927]]).addTo(map),
        BU03940103: L.polygon([[52.2971,4.6805], [52.2911,4.6926], [52.2912,4.6937], [52.2931,4.6965], [52.3013,4.6866]]).addTo(map),
        BU03940104: L.polygon([[52.3056,4.6927], [52.2980,4.7069], [52.2970,4.7076], [52.2973,4.7094], [52.2983,4.7094], [52.3036,4.7141], [52.3053,4.7143],
            [52.3064,4.7133], [52.3123,4.7024]]).addTo(map),
        BU03940105: L.polygon([[52.3164,4.6807], [52.3110,4.6828], [52.3056,4.6927], [52.3123,4.7024], [52.3175,4.6926], [52.3176,4.6891]]).addTo(map),
        BU03940106: L.polygon([[52.3018,4.6719], [52.3032,4.6691], [52.3118,4.6815], [52.3107,4.6835]]).addTo(map),
        BU03940107: L.polygon([[52.3107,4.6835], [52.3100,4.6827], [52.3048,4.6847], [52.3042,4.6846], [52.3028,4.6834], [52.3011,4.6837], [52.3003,4.6851],
            [52.2971,4.6804], [52.3018,4.6719]]).addTo(map),
        BU03940108: L.polygon([[52.3177,4.6703], [52.3096,4.6585], [52.3090,4.6596], [52.3056,4.6653], [52.3059,4.6668], [52.3098,4.6684], 
            [52.3159,4.6755], [52.3161,4.6739]]).addTo(map),
        BU03940109: L.polygon([[[52.3159,4.6755], [52.3164,4.6806], [52.3110,4.6828], [52.3118,4.6815], [52.3032,4.6691], [52.3044,4.6676], [52.3059,4.6668],
            [52.3098,4.6684]]]).addTo(map),
        BU03940111: L.polygon([[52.3236,4.6591], [52.3178,4.6703], [52.3121,4.6622], [52.3146,4.6584], [52.3181,4.6512]]).addTo(map),
        BU03940112: L.polygon([[52.3121,4.6622], [52.3073,4.6551], [52.3077,4.6542], [52.3079,4.6534], [52.3102,4.6492], [52.3085,4.6469],
            [52.3092,4.6458], [52.3085,4.6446], [52.3100,4.6418], [52.3108,4.6429], [52.3114,4.6417], [52.3181,4.6512]]).addTo(map),
        BU03940113: L.polygon([[52.3033,4.6690], [52.2968,4.6599], [52.2993,4.6545], [52.3007,4.6560], [52.3031,4.6493], 
            [52.3096,4.6585], [52.3089,4.6597], [52.3087,4.6593], [52.3057,4.6654], [52.3060,4.6668], [52.3039,4.6682]]).addTo(map),
        BU03940114: L.polygon([[52.2968,4.6599], [52.2940,4.6649], [52.2945,4.6664], [52.2907,4.6713],[52.2970,4.6804], [52.3033,4.6690]]).addTo(map),
        BU03940115: L.polygon([[52.3234,4.6784], [52.3165,4.6812], [52.3159,4.6773], [52.3159,4.6749], [52.3178,4.6703]]).addTo(map),
        BU03940116: L.polygon([[52.3267,4.6537], [52.3237,4.6591], [52.3115,4.6417], [52.3025,4.6277], [52.3036,4.6261], [52.3048,4.6252], [52.3062,4.6228],
            [52.3228,4.6464]]).addTo(map),
        BU03940117: L.polygon([[52.3025,4.6277], [52.2968,4.6381], [52.2980,4.6397], [52.2974,4.6410], [52.3073,4.6552], [52.3078,4.6543], [52.3102,4.6493], 
            [52.3085,4.6470], [52.3093,4.6458], [52.3085,4.6446], [52.3101,4.6419], [52.3108,4.6429], [52.3115,4.6416]]).addTo(map),
        BU03940118: L.polygon([[52.2907,4.6713], [52.2841,4.6617], [52.2949,4.6416], [52.2961,4.6432], [52.2974,4.6411],
            [52.3031,4.6493], [52.3007,4.6560],[52.2993,4.6545], [52.2968,4.6599], [52.2940,4.6649], [52.2945,4.6664]]).addTo(map),
        BU03940119: L.polygon([[52.2802,4.6716], [52.2799,4.6734], [52.2692,4.6931], [52.2674,4.6958],
            [52.2621,4.6883], [52.2628,4.6869], [52.2628,4.6866], [52.2596,4.6821], [52.2593,4.6822], [52.2587,4.6833], [52.2585,4.6833],
        [52.2580,4.6825], [52.2574,4.6836], [52.2578,4.6841], [52.2580,4.6845], [52.2580,4.6845], [52.2580,4.6845], [52.2579,4.6849],
        [52.2576,4.6854], [52.2576,4.6858], [52.2576,4.6858], [52.2581,4.6866], [52.2572,4.6884], [52.2588,4.6907], [52.2587,4.6909],
        [52.2598,4.6924], [52.2609,4.6903],[52.2610,4.6903], [52.2618,4.6889], [52.2801,4.7151], [52.2861,4.7046], [52.2931,4.6967],
        [52.2913,4.6936], [52.2913,4.6926], [52.2874,4.6858], [52.2866,4.6835], [52.2825,4.6770], [52.2817,4.6734], [52.2810,4.6722]]).addTo(map),
        BU03940122: L.polygon([[52.3276,4.6548], [52.3254,4.6579], [52.3253,4.6589], [52.3250,4.6590],
            [52.3243,4.6600], [52.3236,4.6592], [52.3179,4.6702],[52.3235,4.6785], [52.3165,4.6811], [52.3177,4.6902], [52.3176,4.6924], 
        [52.3178,4.6906], [52.3176,4.6923], [52.3063,4.7135], [52.3043,4.7145], [52.2991,4.7100], [52.2960,4.7155], [52.2978,4.7334],
    [52.2983,4.7334], [52.2983,4.7334], [52.2991,4.7318], [52.3188,4.7336], [52.3192,4.7329], [52.3202,4.7330],[52.3260,4.7225],
    [52.3268,4.7239], [52.3269,4.7238], [52.3272,4.7233], [52.3263,4.7216],[52.3294,4.7159], [52.3287,4.7149], [52.3286,4.7149],
    [52.3278,4.7137], [52.3283,4.7129], [52.3277,4.7116], [52.3254,4.7112], [52.3256,4.7100], [52.3256,4.7099], 
    [52.3252,4.7073], [52.3256,4.7072], [52.3257,4.7059], [52.3349,4.7068], [52.3385,4.6999], [52.3384,4.7002],
    [52.3381,4.6995], [52.3441,4.6886], [52.3319,4.6711], [52.3326,4.6698], [52.3309,4.6658], [52.3296,4.6597]]).addTo(map),
        BU03940123: L.polygon([[52.2991,4.7100], [52.2983,4.7094], [52.2970,4.7095], [52.2959,4.7106],
            [52.2876,4.7259], [52.2959,4.7378], [52.2972,4.7353], [52.2974,4.7336], [52.2979,4.7333], [52.2961,4.7155]]).addTo(map),
        BU03940124: L.polygon([[52.2970,4.6805], [52.2915,4.6913], [52.2913,4.6920], [52.2913,4.6926], [52.2907,4.6923],
            [52.2875,4.6862], [52.2934,4.6753]]).addTo(map),
        BU03940125: L.polygon([[52.2931,4.6966], [52.2860,4.7046], [52.2802,4.7153], [52.2876,4.7259],
            [52.2959,4.7104], [52.2972,4.7094], [52.2967,4.7071], [52.2955,4.7055], [52.2941,4.7005], [52.2940,4.6984],
        [52.2940,4.6983], [52.2940,4.6983]]).addTo(map),
        BU03940126: L.polygon([[52.2934,4.6752], [52.2875,4.6861], [52.2853,4.6813],
            [52.2824,4.6769], [52.2817,4.6734], [52.2813,4.6726], [52.2810,4.6722], [52.2803,4.6716], [52.2840,4.6617]]).addTo(map)
    };


    const scores1 = {};
    image1.style.display = 'block';

    Papa.parse("UpdatedBuurten - Hoofddorp.csv", {
        download: true,
        header: true,
        complete: function (results) {
            results.data.forEach(row => {
                scores1[row.bu_code] = row.lbm;
                neighbourhoodNames[row.bu_code] = row.bu_naam;
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
                            .setContent(`<b>Neighbourhood:</b> ${text}<br><b>Score:</b> ${score}`)
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
