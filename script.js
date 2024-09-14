// Next mission is to develop global variable lists that gets changed for read status temporarily and then sync back and forward to maintain
// sync with server at all times and populate pending, skip, complete lists dynamically

// Fetch route data from the backend
async function fetchRouteData(routeId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/get_route_data/${routeId}`);
        const data = await response.json();
        console.log('Fetched data:', data);
        updateUI(data);
    } catch (error) {
        console.error('Error fetching route data:', error);
    }
}

// Update UI with the sorted data
function updateUI(data) {
    console.log('Update UI with data:', data);

    // Ensure that the data object contains the expected structure
    if (!data || !Array.isArray(data.meters)) {
        console.error('Invalid data structure:', data);
        return;
    }

    const meters = data.meters; // Array of meter objects
    sortDataByStatus(meters);
}

// Sort data by status and update UI
function sortDataByStatus(meters) {
    if (!Array.isArray(meters)) {
        console.error('Expected an array of meters, but got:', meters);
        return;
    }

    // Filter meters based on status
    const pending = meters.filter(m => m.read_status === 'p' || m.read_status === 'N/A');
    const skipped = meters.filter(m => m.read_status === 's');
    const completed = meters.filter(m => m.read_status === 'c');

    // Update the UI with the sorted data
    displayList('pendingList', pending);
    displayList('skippedList', skipped);
    displayList('completedList', completed);
}

// Display list of meters in the UI
function displayList(listId, items) {
    const list = document.getElementById(listId);
    if (!list) {
        console.error(`Element with ID ${listId} not found`);
        return;
    }

    list.innerHTML = ''; // Clear the existing list

    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'meter-entry';
        listItem.innerHTML = `
            <div class="meter-address">${item.address} <strong>${item.meter_id}</strong></div>
            <div class="status-box" style="background-color: ${getStatusColor(item.read_status)};"></div>
        `;
        listItem.addEventListener('click', () => {
            // Redirect to the meter reading page with meter ID and address in the URL
            window.location.href = `meterReader.html?meterID=${item.meter_id}&address=${encodeURIComponent(item.address)}`;
        });
        list.appendChild(listItem);
    });
}

// Get color based on status
function getStatusColor(status) {
    switch (status) {
        case 'p':
            return 'black'; // Pending
        case 's':
            return 'red';   // Skipped
        case 'c':
            return 'green'; // Completed
        default:
            return 'black';  // Default
    }
}

// Show list based on the selected status
function showList(status) {
    const allLists = ['pendingList', 'skippedList', 'completedList'];
    allLists.forEach(listId => {
        const list = document.getElementById(listId);
        if (list) {
            list.style.display = (listId === `${status}List`) ? 'block' : 'none';
        }
    });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const routeId = 123; // Example route ID, replace as needed
    fetchRouteData(routeId);
});

// Receiving data from field app???
// Function to handle the temporary list (e.g., send to server, process)
function handleTempReadings() {
    // Process tempReadings or send to server
    console.log(tempReadings);
    // Optionally clear the temporary list after processing
    localStorage.removeItem('tempReadings');
}

// Initialize a temporary list
const temporaryList = [];

// Function to handle saving meter reading
function saveReading(meterID, readValue, action, specialMessage) {
    // Determine read status and skip status based on the action
    const readStatus = action === 'enter' ? 'c' : (action === 'skip' ? 's' : 'p'); // 'c' for completed, 's' for skipped, 'p' for pending
    const skipStatus = action === 'skip' ? true : false;
    const skipReason = action === 'skip' ? 's' : null; // Dummy value for skip reason

    // Create a new entry for the temporary list
    const entry = {
        meter_id: meterID,
        read_value: readValue,
        read_status: readStatus,
        sync_status: null, // Not needed for now, can set to null or any default value
        last_sync: null, // Not needed for now, can set to null or any default value
        skip_status: skipStatus,
        skip_reason: skipReason,
        special_message: specialMessage
    };

    // Add the entry to the temporary list
    temporaryList.push(entry);
    console.log('Temporary list updated:', temporaryList);

    // Advance to the next meter in the pending list
    advanceToNextMeter();

    // Check if the temporary list has reached 5 entries
    if (temporaryList.length >= 5) {
        syncReadings(); // Call the sync function
    }
}

// Function to advance to the next meter // Update to advance more simply because big update happens later
function advanceToNextMeter() {
    if (pendingMeters.length > 0) {
        const nextMeter = pendingMeters[0]; // Get the next meter in the pending list
        loadMeter(nextMeter); // Load the next meter into the UI
    } else {
        alert('All meters have been completed or skipped.');
        // Optionally redirect to another page or show a message indicating all meters are done
    }
}

// Function to load a meter's data into the UI (replace placeholders with actual implementation)
function loadMeter(meter) {
    document.getElementById('meterID').textContent = meter.meter_id;
    document.getElementById('readValueInput').value = ''; // Clear the input field
    // Update any other necessary fields, such as special messages or meter address
}

// Function to handle the 'Enter' button click
document.querySelector('.enter-button').addEventListener('click', () => {
    const meterID = document.getElementById('meterID').textContent;
    const readValue = document.getElementById('readValueInput').value;
    const specialMessage = ''; // Set or retrieve the actual special message if needed

    saveReading(meterID, readValue, 'enter', specialMessage);
});

// Function to handle the 'Skip' button click
document.querySelector('.skip-button').addEventListener('click', () => {
    const meterID = document.getElementById('meterID').textContent;
    const readValue = 'N/A'; // Skip action means read value is 'N/A'
    const specialMessage = ''; // Set or retrieve the actual special message if needed

    saveReading(meterID, readValue, 'skip', specialMessage);
});


// Function to handle syncing back to the server
function syncReadings() {
    const currentTime = new Date().toISOString(); // Get the current time in ISO format

    // Update sync status and last sync time for all readings in the temporary list
    temporaryList.forEach(entry => {
        entry.sync_status = true;
        entry.last_sync = currentTime;
    });

    // Perform the sync (for demonstration, we just log it)
    console.log('Syncing data:', temporaryList);

    // Send the synced readings to the server
    fetch('/sync_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ readings: syncedReadings })
    })
    .then(response => {
        if (response.ok) {
            console.log('Readings synced successfully:', syncedReadings);
            // Clear the temporary list after successful sync
            temporaryList.length = 0;
        } else {
            console.error('Failed to sync readings');
        }
    })
    .catch(error => {
        console.error('Error syncing readings:', error);
    });
}
