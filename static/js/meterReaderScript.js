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

    advanceToNextMeter(meterID, readStatus);
}

// Advance to the next meter
function advanceToNextMeter(meterID, readStatus) {
    // Retrieve lists from localStorage
    const pendingMeters = JSON.parse(localStorage.getItem('pendingList')) || [];
    const temporaryList = JSON.parse(localStorage.getItem('temporaryList')) || [];
    console.log("Pending meters list:", pendingMeters)
    console.log("Read status check:" + readStatus)

    if (pendingMeters.length === 0) {
        alert('Pending meters list empty.');
        return; // Exit early if no pending meters exist
    }

    let nextMeter;

    if (readStatus === 'c') { 
        // Completed read: Advance normally in the pending list
        nextMeter = pendingMeters[0]; // Peek at the next meter in the list

        // If the current meter matches and there's another pending meter, shift to advance
        if (pendingMeters[0].meter_id === meterID && pendingMeters.length > 1) {
            pendingMeters.shift(); // Remove current meter
            nextMeter = pendingMeters[0]; // Get the new first meter
        }

        localStorage.setItem('pendingList', JSON.stringify(pendingMeters)); // Update pending list in localStorage
        if (nextMeter) {
            redirectToMeter(nextMeter);
        } else {
            alert('No more meters to process.');
        }

    } else if (readStatus === 's') {
        // Skipped read: Handle skipping logic
        const skippedMeterIndex = temporaryList.findIndex(obj => obj.meter_id === meterID);
        if (skippedMeterIndex !== -1) {
            // If the skipped meter exists in the temporary list, update its status
            temporaryList[skippedMeterIndex].skipStatus = true;
            localStorage.setItem('temporaryList', JSON.stringify(temporaryList));
        }
    
        // Remove the skipped meter from the pending list if it's there
        const meterToRemoveIndex = pendingMeters.findIndex(meter => meter.meter_id === meterID);
        if (meterToRemoveIndex !== -1) {
            pendingMeters.splice(meterToRemoveIndex, 1); // Remove the skipped meter from the pending list
            localStorage.setItem('pendingList', JSON.stringify(pendingMeters));
        }
    
        // Ensure skipping doesn't accidentally skip over pending meters
        let nextMeter = pendingMeters[0]; // Peek at the first pending meter
        if (nextMeter) {
            redirectToMeter(nextMeter); // Redirect to the next pending meter
        } else {
            // Handle case where no pending meters are left
            alert('No more pending meters to process.');
        }
    
    } else {
        // Unexpected read status or empty list
        alert('Unexpected read status or empty pending meters.');
    }
}

// Helper function to redirect to the next meter
function redirectToMeter(meter) {
    window.location.href = `meterReader.html?meterIDValue=${meter.meter_id}&address=${encodeURIComponent(meter.address)}`;
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
    return new Promise((resolve, reject) => {
        const currentTime = new Date().toISOString();

        // Update sync status and timestamp for each entry in temporaryList
        temporaryList.forEach(entry => {
            entry.sync_status = true;
            entry.last_sync = currentTime;
        });

        console.log('Syncing data with syncReadings():', temporaryList);

        // Retrieve the route_id from localStorage
        const route_id = localStorage.getItem('routeID');
        if (!route_id) {
            console.error('Route ID not found in localStorage');
            return reject(new Error('Route ID not found in localStorage'));
        }

        // Create the payload for the POST request
        const payload = {
            route_id: route_id, // Include route_id here
            readings: temporaryList
        };

        // Make the API call to sync data
        fetch(`https://water-meter-readings.onrender.com/sync_data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                return response.json(); // Parse the response if successful
            })
            .then(data => {
                console.log('Readings synced successfully:', data);

                // Clear the temporary list only on successful sync
                temporaryList.length = 0;
                localStorage.setItem('temporaryList', JSON.stringify([]));

                // Optionally, update localStorage with new lists from the server
                if (data.pendingList) localStorage.setItem('pendingList', JSON.stringify(data.pendingList));
                if (data.skippedList) localStorage.setItem('skippedList', JSON.stringify(data.skippedList));
                if (data.completedList) localStorage.setItem('completedList', JSON.stringify(data.completedList));

                updateTemporaryListTable(); // Refresh the UI table if applicable
                resolve();
            })
            .catch(error => {
                console.error('Error syncing readings:', error);
                reject(error);
            });
    });
}