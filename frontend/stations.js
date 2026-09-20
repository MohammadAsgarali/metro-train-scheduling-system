/* =====================================================
   DELHI METRO STATIONS
   Data now comes LIVE from the backend: GET /api/stations
===================================================== */

let stations = [];

/* Fallback data used only if the backend API is unreachable,
   so the page still shows something during development. */
const fallbackStations = [

    {
        code: "DM-001",
        name: "Dwarka Sector 21",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-002",
        name: "Dwarka",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-003",
        name: "Dwarka Mor",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-004",
        name: "Uttam Nagar West",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-005",
        name: "Uttam Nagar East",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-006",
        name: "Janakpuri West",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-007",
        name: "Tilak Nagar",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Maintenance"
    },

    {
        code: "DM-008",
        name: "Subhash Nagar",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-009",
        name: "Rajouri Garden",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 4,
        status: "Operational"
    },

    {
        code: "DM-010",
        name: "Kirti Nagar",
        line: "Blue Line",
        zone: "West Delhi",
        platforms: 4,
        status: "Operational"
    },


    /* RED LINE */

    {
        code: "DM-011",
        name: "Rithala",
        line: "Red Line",
        zone: "North West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-012",
        name: "Rohini West",
        line: "Red Line",
        zone: "North West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-013",
        name: "Rohini East",
        line: "Red Line",
        zone: "North West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-014",
        name: "Pitampura",
        line: "Red Line",
        zone: "North West Delhi",
        platforms: 2,
        status: "Maintenance"
    },

    {
        code: "DM-015",
        name: "Kohat Enclave",
        line: "Red Line",
        zone: "North West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-016",
        name: "Netaji Subhash Place",
        line: "Red Line",
        zone: "North West Delhi",
        platforms: 4,
        status: "Operational"
    },

    {
        code: "DM-017",
        name: "Keshav Puram",
        line: "Red Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-018",
        name: "Shalimar Bagh",
        line: "Red Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },


    /* YELLOW LINE */

    {
        code: "DM-019",
        name: "Samaypur Badli",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-020",
        name: "Haiderpur Badli Mor",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-021",
        name: "Jahangirpuri",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-022",
        name: "Adarsh Nagar",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-023",
        name: "Azadpur",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 4,
        status: "Maintenance"
    },

    {
        code: "DM-024",
        name: "Model Town",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-025",
        name: "Vishwavidyalaya",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-026",
        name: "Vidhan Sabha",
        line: "Yellow Line",
        zone: "North Delhi",
        platforms: 2,
        status: "Operational"
    },


    /* GREEN LINE */

    {
        code: "DM-027",
        name: "Inderlok",
        line: "Green Line",
        zone: "Central Delhi",
        platforms: 4,
        status: "Operational"
    },

    {
        code: "DM-028",
        name: "Ashok Park Main",
        line: "Green Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-029",
        name: "Punjabi Bagh",
        line: "Green Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-030",
        name: "Shivaji Park",
        line: "Green Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-031",
        name: "Madipur",
        line: "Green Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Closed"
    },

    {
        code: "DM-032",
        name: "Paschim Vihar East",
        line: "Green Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-033",
        name: "Paschim Vihar West",
        line: "Green Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-034",
        name: "Peeragarhi",
        line: "Green Line",
        zone: "West Delhi",
        platforms: 2,
        status: "Operational"
    },


    /* VIOLET LINE */

    {
        code: "DM-035",
        name: "Kashmere Gate",
        line: "Violet Line",
        zone: "Central Delhi",
        platforms: 6,
        status: "Operational"
    },

    {
        code: "DM-036",
        name: "Lal Quila",
        line: "Violet Line",
        zone: "Central Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-037",
        name: "Jama Masjid",
        line: "Violet Line",
        zone: "Central Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-038",
        name: "Delhi Gate",
        line: "Violet Line",
        zone: "Central Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-039",
        name: "ITO",
        line: "Violet Line",
        zone: "Central Delhi",
        platforms: 2,
        status: "Operational"
    },

    {
        code: "DM-040",
        name: "Central Secretariat",
        line: "Violet Line",
        zone: "Central Delhi",
        platforms: 4,
        status: "Closed"
    }

];


/* =====================================================
   HTML ELEMENTS
===================================================== */

const stationSlider =
    document.getElementById("stationSlider");

const stationTable =
    document.getElementById("stationTable");

const stationSelect =
    document.getElementById("stationSelect");

const stationLine =
    document.getElementById("stationLine");

const stationStatus =
    document.getElementById("stationStatus");


/* =====================================================
   GET LINE COLOR
===================================================== */

function getLineColor(line) {

    if (line === "Blue Line") {
        return "blue";
    }

    if (line === "Red Line") {
        return "red";
    }

    if (line === "Yellow Line") {
        return "yellow";
    }

    if (line === "Green Line") {
        return "green";
    }

    if (line === "Violet Line") {
        return "violet";
    }

    return "blue";

}


/* =====================================================
   LOAD SELECT STATION
===================================================== */

function loadStationSelect() {

    stationSelect.innerHTML =
        '<option value="all">Select Station</option>';


    stations.forEach(function(station) {

        const option =
            document.createElement("option");

        option.value =
            station.code;

        option.textContent =
            station.name;

        stationSelect.appendChild(option);

    });

}


/* =====================================================
   LOAD STATION SLIDER
===================================================== */

function loadStationSlider() {

    stationSlider.innerHTML = "";


    stations.forEach(function(station) {

        const color =
            getLineColor(station.line);


        const card =
            document.createElement("div");


        card.className =
            "station-item " + color;


        card.innerHTML = `

            <div class="station-slider-icon">

                <i class="fa-solid fa-location-dot"></i>

            </div>


            <div class="station-slider-info">

                <h3>
                    ${station.name}
                </h3>

                <span>
                    ${station.line}
                </span>

            </div>

        `;


        card.addEventListener(
            "click",
            function() {

                stationSelect.value =
                    station.code;

                stationLine.value =
                    "all";

                stationStatus.value =
                    "all";

                searchStations();

            }
        );


        stationSlider.appendChild(card);

    });

}


/* =====================================================
   LOAD TABLE
===================================================== */

function loadTable() {

    stationTable.innerHTML = "";


    stations.forEach(function(station) {

        createTableRow(station);

    });

}


/* =====================================================
   CREATE TABLE ROW
===================================================== */

function createTableRow(station) {

    const row =
        document.createElement("tr");


    row.dataset.code =
        station.code;

    row.dataset.line =
        station.line;

    row.dataset.status =
        station.status;


    const statusClass =
        station.status.toLowerCase();


    row.innerHTML = `

        <td>

            <span class="station-code">
                ${station.code}
            </span>

        </td>


        <td>

            <strong>
                ${station.name}
            </strong>

        </td>


        <td>
            ${station.line}
        </td>


        <td>
            ${station.zone}
        </td>


        <td>
            ${station.platforms}
        </td>


        <td>

            <span class="status ${statusClass}">
                ${station.status}
            </span>

        </td>


        <td>

            <button
                class="view-btn"
                onclick="viewStation('${station.code}')"
            >

                <i class="fa-solid fa-eye"></i>

                View

            </button>

        </td>

    `;


    stationTable.appendChild(row);

}


/* =====================================================
   FILTER
===================================================== */

function searchStations() {

    const selectedStation =
        stationSelect.value;


    const selectedLine =
        stationLine.value;


    const selectedStatus =
        stationStatus.value;


    const rows =
        document.querySelectorAll(
            "#stationTable tr"
        );


    let total = 0;

    let operational = 0;

    let maintenance = 0;

    let closed = 0;


    rows.forEach(function(row) {

        const code =
            row.dataset.code;

        const line =
            row.dataset.line;

        const status =
            row.dataset.status;


        const stationMatch =
            selectedStation === "all" ||
            code === selectedStation;


        const lineMatch =
            selectedLine === "all" ||
            line === selectedLine;


        const statusMatch =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            stationMatch &&
            lineMatch &&
            statusMatch
        ) {

            row.style.display =
                "table-row";


            total++;


            if (status === "Operational") {

                operational++;

            }


            if (status === "Maintenance") {

                maintenance++;

            }


            if (status === "Closed") {

                closed++;

            }

        }

        else {

            row.style.display =
                "none";

        }

    });


    /* UPDATE CARDS */

    document.getElementById(
        "totalStations"
    ).textContent = total;


    document.getElementById(
        "operationalStations"
    ).textContent = operational;


    document.getElementById(
        "maintenanceStations"
    ).textContent = maintenance;


    document.getElementById(
        "closedStations"
    ).textContent = closed;

}


/* =====================================================
   FILTER EVENTS
===================================================== */

stationSelect.addEventListener(
    "change",
    searchStations
);


stationLine.addEventListener(
    "change",
    searchStations
);


stationStatus.addEventListener(
    "change",
    searchStations
);


/* =====================================================
   VIEW STATION
===================================================== */

function viewStation(code) {

    const station =
        stations.find(function(item) {

            return item.code === code;

        });


    if (!station) {

        return;

    }


    alert(

        "DELHI METRO STATION\n\n" +

        "Station Code: " +
        station.code +

        "\nStation Name: " +
        station.name +

        "\nLine: " +
        station.line +

        "\nZone: " +
        station.zone +

        "\nPlatforms: " +
        station.platforms +

        "\nStatus: " +
        station.status

    );

}


/* =====================================================
   LOAD STATIONS FROM BACKEND API (GET /api/stations)
   Maps backend field names (stationCode, stationName)
   to the shape the rest of this file already uses
   (code, name).
===================================================== */

async function fetchStationsFromApi() {
    try {
        const data = await apiGet("/stations");
        stations = data.map(s => ({
            id: s.id,
            code: s.stationCode,
            name: s.stationName,
            line: s.line,
            zone: s.zone,
            platforms: s.platforms,
            status: s.status
        }));
    } catch (err) {
        console.error("Could not load stations from API, using fallback data.", err);
        stations = fallbackStations;
    }
}

/* =====================================================
   INITIALIZE
===================================================== */

(async function initStationsPage() {
    await fetchStationsFromApi();
    loadStationSelect();
    loadStationSlider();
    loadTable();
    searchStations();
})();