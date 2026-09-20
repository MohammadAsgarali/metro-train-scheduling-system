/* =====================================================
   TRAIN DATA - now loaded LIVE from backend API
   GET  /api/trains
   POST /api/trains   (used by Add Train)
===================================================== */

let trains = {};          // keyed by trainNumber, for viewTrain()
let trainsList = [];      // raw list from API, for rendering the table

const trainTableBody = document.getElementById("trainTable");

/* ================= FETCH + RENDER ================= */

const fallbackTrains = [
    { trainNumber: "DMRC101", line: "Blue Line", type: "6 Coach", capacity: 2280, currentStation: "Dwarka Sector 21", status: "Running" },
    { trainNumber: "DMRC102", line: "Blue Line", type: "6 Coach", capacity: 2280, currentStation: "Rajouri Garden", status: "Running" },
    { trainNumber: "DMRC103", line: "Red Line", type: "6 Coach", capacity: 2280, currentStation: "Rithala", status: "Running" },
    { trainNumber: "DMRC104", line: "Yellow Line", type: "6 Coach", capacity: 2280, currentStation: "Chandni Chowk", status: "Running" },
    { trainNumber: "DMRC105", line: "Yellow Line", type: "6 Coach", capacity: 2280, currentStation: "Depot", status: "Maintenance" },
    { trainNumber: "DMRC106", line: "Green Line", type: "4 Coach", capacity: 1520, currentStation: "Inderlok Depot", status: "Standby" },
    { trainNumber: "DMRC107", line: "Violet Line", type: "6 Coach", capacity: 2280, currentStation: "Kashmere Gate", status: "Running" },
    { trainNumber: "DMRC108", line: "Blue Line", type: "6 Coach", capacity: 2280, currentStation: "Yamuna Bank Depot", status: "Standby" }
];

async function fetchTrainsFromApi() {
    try {
        trainsList = await apiGet("/trains");
    } catch (err) {
        console.error("Could not load trains from API, using fallback data.", err);
        trainsList = fallbackTrains;
    }

    trains = {};
    trainsList.forEach(t => {
        trains[t.trainNumber] = {
            line: t.line,
            type: t.type,
            capacity: t.capacity ? Number(t.capacity).toLocaleString("en-IN") : "-",
            station: t.currentStation,
            status: t.status
        };
    });

    renderTrainTable();
}

function lineShortName(line) {
    // "Blue Line" -> "Blue" (used for data-line + badge classes already in the CSS)
    return line ? line.replace(" Line", "") : line;
}

function renderTrainTable() {
    if (!trainTableBody) return;

    trainTableBody.innerHTML = "";

    trainsList.forEach(t => {
        const shortLine = lineShortName(t.line);
        const statusClass = (t.status || "").toLowerCase();
        const lineClass = shortLine ? shortLine.toLowerCase() + "-line" : "";

        const row = document.createElement("tr");
        row.dataset.line = shortLine;
        row.dataset.status = t.status;
        row.dataset.name = t.trainNumber;

        row.innerHTML = `
            <td><strong>${t.trainNumber}</strong></td>
            <td><span class="line ${lineClass}">${shortLine}</span></td>
            <td>${t.type || "-"}</td>
            <td>${t.capacity ? Number(t.capacity).toLocaleString("en-IN") : "-"}</td>
            <td>${t.currentStation || "-"}</td>
            <td><span class="status ${statusClass}">${t.status}</span></td>
            <td>
                <button class="view-btn" onclick="viewTrain('${t.trainNumber}')">View</button>
            </td>
        `;

        trainTableBody.appendChild(row);
    });

    document.getElementById("totalTrains").textContent = trainsList.length;
}

/* ================= LOGOUT ================= */

function logoutUser(event) {
    event.preventDefault();
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        alert("You have been successfully logged out.\n\nThank you for using Delhi Metro Control Center.");
        localStorage.clear();
        window.location.href = "login.html";
    }
}

/* ================= SEARCH ================= */

function searchTrains() {
    const search = document.getElementById("trainSearch").value.toLowerCase().trim();
    const selectedLine = document.getElementById("trainLine").value;
    const selectedStatus = document.getElementById("trainStatus").value;
    const rows = document.querySelectorAll("#trainTable tr");

    let visibleCount = 0;

    rows.forEach(row => {
        const trainName = row.dataset.name.toLowerCase();
        const line = row.dataset.line;
        const status = row.dataset.status;

        const nameMatch = trainName.includes(search);
        const lineMatch = selectedLine === "all" || line === selectedLine;
        const statusMatch = selectedStatus === "all" || status === selectedStatus;

        if (nameMatch && lineMatch && statusMatch) {
            row.style.display = "table-row";
            visibleCount++;
        } else {
            row.style.display = "none";
        }
    });

    document.getElementById("totalTrains").textContent = visibleCount;
}

document.getElementById("trainSearch").addEventListener("input", searchTrains);
document.getElementById("trainLine").addEventListener("change", searchTrains);
document.getElementById("trainStatus").addEventListener("change", searchTrains);

/* ================= VIEW TRAIN ================= */

function viewTrain(id) {
    const train = trains[id];
    if (!train) return;

    alert(
        "Train Details\n\n" +
        "Train ID: " + id + "\n" +
        "Line: " + train.line + "\n" +
        "Type: " + train.type + "\n" +
        "Capacity: " + train.capacity + "\n" +
        "Current Station: " + train.station + "\n" +
        "Status: " + train.status
    );
}

/* ================= ADD TRAIN (now saves to backend) ================= */

async function addTrain() {
    const trainNumber = prompt("Enter Train ID (e.g. DMRC113):");
    if (!trainNumber) return;

    const line = prompt("Enter Metro Line:\nBlue Line / Red Line / Yellow Line / Green Line / Violet Line");
    if (!line) return;

    const type = prompt("Enter Train Type (e.g. 6 Coach):", "6 Coach") || "6 Coach";
    const capacity = Number(prompt("Enter Capacity:", "2280")) || 2280;
    const currentStation = prompt("Enter Current Station:", "Depot") || "Depot";

    try {
        await apiPost("/trains", {
            trainNumber,
            line,
            type,
            capacity,
            currentStation,
            status: "Standby"
        });

        alert("Train Added Successfully!\n\nTrain ID: " + trainNumber + "\nLine: " + line);
        await fetchTrainsFromApi();
    } catch (err) {
        console.error(err);
        alert("Could not save the train to the server. Please check that the backend is running.");
    }
}

/* ================= NOTIFICATION ================= */

document.querySelector(".notification").addEventListener("click", function () {
    alert(
        "Train Fleet Notifications\n\n" +
        "• 8 trains currently running\n" +
        "• 2 trains on standby\n" +
        "• 2 trains under maintenance"
    );
});

/* ================= INITIALIZE ================= */

fetchTrainsFromApi();
