// Initialize the temporary list from localStorage
let temporaryList = JSON.parse(localStorage.getItem('temporaryList')) || [];

// Save the temporary list to localStorage
function saveTemporaryListToLocalStorage() {
    localStorage.setItem('temporaryList', JSON.stringify(temporaryList));
}

// Load the meter data from localStorage on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const meterID = urlParams.get('meterIDValue');

    // Retrieve route data from localStorage
    const routeData = JSON.parse(localStorage.getItem('routeData'));

    if (routeData) {
        // Find the meter by meterID
        const meter = routeData.meters.find(m => m.meter_id === meterID);

        if (meter) {
            loadMeter(meter);  // Load the meter's data into the UI
            console.log('Meter found: ' + meter.meter_id);
            console.log('Temporary List before updates:', temporaryList);

        } else {
            console.error('Meter not found');
        }
    } else {
        console.error('No route data found in localStorage');
    }

    // Check if temporaryList has 5 or more items for syncing
    if (temporaryList.length >= 5) {
        console.log('Temporary list has enough entries for syncing:', temporaryList);
        syncReadings();
    }

    updateTemporaryListTable();
});

// Save meter reading and add it to the temporary list
function saveReading(meterID, readValue, action, specialMessage) {
    const readStatus = action === 'enter' ? 'c' : 's';
    const skipStatus = action === 'skip';
    const skipReason = action === 'skip' ? 's' : null;

    const entry = {
        meter_id: meterID,
        read_value: readValue,
        read_status: readStatus,
        sync_status: null,
        last_sync: null,
        skip_status: skipStatus,
        skip_reason: skipReason,
        special_message: specialMessage
    };

    console.log('Meter ' + entry.meter_id + ' status: ' + entry.read_status + ' read: ' + entry.read_value);
    temporaryList.push(entry);
    console.log('Temporary list updated:', temporaryList);

    // Persist the temporary list to localStorage
    saveTemporaryListToLocalStorage();

    advanceToNextMeter();
}

// Advance to the next meter
function advanceToNextMeter() {
    // Retrieve lists from localStorage
    const pendingMeters = JSON.parse(localStorage.getItem('pendingList')) || [];
    
    if (pendingMeters.length > 0) {
        const nextMeter = pendingMeters.shift(); // Get the next meter and remove it from the list
        localStorage.setItem('pendingList', JSON.stringify(pendingMeters)); // Update localStorage

        // Redirect to the next meter
        window.location.href = `meterReader.html?meterIDValue=${nextMeter.meter_id}&address=${encodeURIComponent(nextMeter.address)}`;
    } else {
        alert('All meters have been completed or skipped.');
    }
}

// Load a meter's data into the UI
function loadMeter(meter) {
    document.getElementById('meterIDValue').textContent = meter.meter_id;
    document.getElementById('readValueInput').value = '';
}

// Handle the 'Enter' button click
document.querySelector('.enter-button').addEventListener('click', () => {
    const meterID = document.getElementById('meterIDValue').textContent;
    const readValue = document.getElementById('readValueInput').value;
    const specialMessage = '';

    saveReading(meterID, readValue, 'enter', specialMessage);
});

// Handle the 'Skip' button click
document.querySelector('.skip-button').addEventListener('click', () => {
    const meterID = document.getElementById('meterIDValue').textContent;
    const readValue = 'N/A';
    const specialMessage = '';

    saveReading(meterID, readValue, 'skip', specialMessage);
});

// Update the temporary list table in the UI
function updateTemporaryListTable() {
    console.log('Updating temporary list table...'); // Log the update action
    console.log('Current temporary list:', temporaryList); // Log the current state of the temporary list

    const tableBody = document.getElementById('temporaryListTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    temporaryList.forEach(entry => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = entry.meter_id;
        row.insertCell(1).textContent = entry.read_value;
        row.insertCell(2).textContent = entry.read_status;
        row.insertCell(3).textContent = entry.skip_status ? 'Yes' : 'No';
        row.insertCell(4).textContent = entry.skip_reason || '-';
        row.insertCell(5).textContent = entry.special_message || '-';
    });
}

// Sync readings to the server
function syncReadings() {
    const currentTime = new Date().toISOString();

    temporaryList.forEach(entry => {
        entry.sync_status = true;
        entry.last_sync = currentTime;
    });

    console.log('Syncing data with syncReadings():', temporaryList);

    fetch(`http://127.0.0.1:5000/sync_data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ readings: temporaryList })
    })
    .then(response => {
        if (response.ok) {
            console.log('Readings synced successfully');
            //temporaryList.length = 0; // Clear temporary list
            //localStorage.removeItem('temporaryList'); // Clear localStorage after sync
        } else {
            console.error('Failed to sync readings');
        }
    })
    .catch(error => {
        console.error('Error syncing readings:', error);
    });
}
