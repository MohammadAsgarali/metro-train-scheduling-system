/* =====================================================
   DELHI METRO ROUTE DATA
   Now loaded LIVE from backend: GET /api/routes
===================================================== */

let routeData = {};

/* Fallback data used only if the backend API is unreachable. */
const fallbackRouteData = {

    Blue: {
        name: "Blue Line",
        stations: 13,
        distance: "22.8 km",
        start: "Dwarka Sector 21",
        end: "Noida City Centre",
        status: "Operational",

        stationList: [
            "Dwarka Sector 21",
            "Dwarka Sector 10",
            "Dwarka",
            "Janakpuri West",
            "Rajouri Garden",
            "Karol Bagh",
            "Rajiv Chowk",
            "Yamuna Bank",
            "Akshardham",
            "Mayur Vihar",
            "New Ashok Nagar",
            "Noida Sector 15",
            "Noida City Centre"
        ]
    },

    Red: {
        name: "Red Line",
        stations: 8,
        distance: "21.6 km",
        start: "Rithala",
        end: "Shaheed Sthal",
        status: "Operational",

        stationList: [
            "Rithala",
            "Rohini West",
            "Pitampura",
            "Shalimar Bagh",
            "Kashmere Gate",
            "Welcome",
            "Dilshad Garden",
            "Shaheed Sthal"
        ]
    },

    Yellow: {
        name: "Yellow Line",
        stations: 8,
        distance: "21.2 km",
        start: "Samaypur Badli",
        end: "Huda City Centre",
        status: "Operational",

        stationList: [
            "Samaypur Badli",
            "Rohini Sector 18",
            "Azadpur",
            "Vishwavidyalaya",
            "Kashmere Gate",
            "Chandni Chowk",
            "Rajiv Chowk",
            "Huda City Centre"
        ]
    },

    Green: {
        name: "Green Line",
        stations: 6,
        distance: "16.5 km",
        start: "Inderlok",
        end: "Brigadier Hoshiar Singh",
        status: "Operational",

        stationList: [
            "Inderlok",
            "Ashok Park Main",
            "Punjabi Bagh",
            "Paschim Vihar",
            "Mundka",
            "Brigadier Hoshiar Singh"
        ]
    },

    Violet: {
        name: "Violet Line",
        stations: 5,
        distance: "13.4 km",
        start: "Kashmere Gate",
        end: "Raja Nahar Singh",
        status: "Operational",

        stationList: [
            "Kashmere Gate",
            "Lal Quila",
            "Jama Masjid",
            "Central Secretariat",
            "Raja Nahar Singh"
        ]
    }
};
function logoutUser(event) {

    event.preventDefault();

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (confirmLogout) {

        alert(
            "You have been successfully logged out.\n\nThank you for using Delhi Metro Control Center."
        );

        localStorage.clear();

        window.location.href = "login.html";
    }
}

/* =====================================================
   ELEMENTS
===================================================== */

const lineFilter = document.getElementById("lineFilter");
const startStation = document.getElementById("startStation");
const destinationStation = document.getElementById("destinationStation");


/* =====================================================
   GET ALL STATIONS
===================================================== */

function getAllStations() {

    let stations = [];

    Object.values(routeData).forEach(route => {

        route.stationList.forEach(station => {

            if (!stations.includes(station)) {
                stations.push(station);
            }

        });

    });

    return stations.sort();
}


/* =====================================================
   LOAD STATIONS
===================================================== */

function loadStations() {

    startStation.innerHTML =
        '<option value="">SELECT STATION</option>';

    destinationStation.innerHTML =
        '<option value="">SELECT STATION</option>';

    const selectedLine = lineFilter.value;

    let stations = [];

    /* If a particular line is selected */
    if (selectedLine !== "all") {

        stations = routeData[selectedLine].stationList;

    }

    /* If all lines are selected */
    else {

        stations = getAllStations();

    }


    stations.forEach(station => {

        const startOption =
            document.createElement("option");

        startOption.value = station;
        startOption.textContent = station;

        startStation.appendChild(startOption);


        const destinationOption =
            document.createElement("option");

        destinationOption.value = station;
        destinationOption.textContent = station;

        destinationStation.appendChild(destinationOption);

    });

}


/* =====================================================
   LINE FILTER
===================================================== */

lineFilter.addEventListener("change", function () {

    const selectedLine = this.value;

    const routeCards =
        document.querySelectorAll(".route-card");

    const tableRows =
        document.querySelectorAll("#routeTable tr");


    /* Filter route cards */

    routeCards.forEach(card => {

        const line = card.dataset.line;

        if (
            selectedLine === "all" ||
            line === selectedLine
        ) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";

        }

    });


    /* Filter table */

    tableRows.forEach(row => {

        const line = row.dataset.line;

        if (
            selectedLine === "all" ||
            line === selectedLine
        ) {

            row.style.display = "table-row";

        } else {

            row.style.display = "none";

        }

    });


    /* Reload stations */

    loadStations();

});


/* =====================================================
   FIND ROUTE
===================================================== */

function findRoute() {

    const start = startStation.value;

    const destination = destinationStation.value;

    const selectedLine = lineFilter.value;


    /* Check start station */

    if (start === "") {

        alert("Please select a starting station.");

        return;

    }


    /* Check destination */

    if (destination === "") {

        alert("Please select a destination station.");

        return;

    }


    /* Same station */

    if (start === destination) {

        alert(
            "Starting station and destination cannot be the same."
        );

        return;

    }


    let matchingRoutes = [];


    /* Search selected line */

    if (selectedLine !== "all") {

        const route = routeData[selectedLine];

        const stations = route.stationList;


        const startIndex =
            stations.indexOf(start);

        const destinationIndex =
            stations.indexOf(destination);


        if (
            startIndex !== -1 &&
            destinationIndex !== -1
        ) {

            matchingRoutes.push({
                line: route.name,
                distance: route.distance,
                stations:
                    Math.abs(
                        destinationIndex - startIndex
                    ),
                status: route.status
            });

        }

    }


    /* Search all lines */

    else {

        Object.values(routeData).forEach(route => {

            const stations = route.stationList;

            const startIndex =
                stations.indexOf(start);

            const destinationIndex =
                stations.indexOf(destination);


            if (
                startIndex !== -1 &&
                destinationIndex !== -1
            ) {

                matchingRoutes.push({
                    line: route.name,
                    distance: route.distance,
                    stations:
                        Math.abs(
                            destinationIndex - startIndex
                        ),
                    status: route.status
                });

            }

        });

    }


    /* No route found */

    if (matchingRoutes.length === 0) {

        alert(
            "No direct route found.\n\n" +
            "From: " + start + "\n" +
            "To: " + destination + "\n\n" +
            "Try selecting another metro line."
        );

        return;

    }


    /* Show result */

    let message =
        "🚇 ROUTE FOUND\n\n" +
        "From: " + start + "\n" +
        "To: " + destination + "\n\n";


    matchingRoutes.forEach((route, index) => {

        message +=
            "Route " + (index + 1) + "\n" +
            "Line: " + route.line + "\n" +
            "Stations: " + route.stations + "\n" +
            "Network Distance: " + route.distance + "\n" +
            "Status: " + route.status + "\n\n";

    });


    alert(message);

}


/* =====================================================
   SHOW LINE
===================================================== */

function showLine(line) {

    const route = routeData[line];

    if (!route) {
        return;
    }


    alert(

        route.name + "\n\n" +

        "Start: " +
        route.start + "\n" +

        "Destination: " +
        route.end + "\n" +

        "Stations: " +
        route.stations + "\n" +

        "Distance: " +
        route.distance + "\n" +

        "Status: " +
        route.status

    );

}


/* =====================================================
   EXPORT ROUTES
===================================================== */

function exportRoutes() {

    let csv =
        "Line,Start Station,End Station,Stations,Distance,Status\n";


    Object.values(routeData).forEach(route => {

        csv +=
            `"${route.name}",` +
            `"${route.start}",` +
            `"${route.end}",` +
            `${route.stations},` +
            `"${route.distance}",` +
            `"${route.status}"\n`;

    });


    const blob = new Blob(
        [csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "delhi_metro_routes.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* =====================================================
   NOTIFICATION
===================================================== */

const notification =
    document.querySelector(".notification");


if (notification) {

    notification.addEventListener("click", function () {

        alert(

            "Notifications\n\n" +

            "• All metro lines operational\n" +

            "• Route database updated\n" +

            "• Network monitoring active"

        );

    });

}


/* =====================================================
   FETCH ROUTES FROM BACKEND API
   Maps backend field names (lineKey, lineName, totalStations,
   distanceKm, startStation, endStation) to the shape the rest
   of this file already uses (name, stations, distance, start, end).
===================================================== */

async function fetchRoutesFromApi() {
    try {
        const data = await apiGet("/routes");
        const mapped = {};
        data.forEach(r => {
            mapped[r.lineKey] = {
                id: r.id,
                name: r.lineName,
                stations: r.totalStations,
                distance: r.distanceKm + " km",
                start: r.startStation,
                end: r.endStation,
                status: r.status,
                stationList: (r.stationList || []).map(rs => rs.stationName)
            };
        });
        routeData = Object.keys(mapped).length ? mapped : fallbackRouteData;
    } catch (err) {
        console.error("Could not load routes from API, using fallback data.", err);
        routeData = fallbackRouteData;
    }
}

/* =====================================================
   INITIAL LOAD
===================================================== */

(async function initRoutesPage() {
    await fetchRoutesFromApi();
    loadStations();
})();