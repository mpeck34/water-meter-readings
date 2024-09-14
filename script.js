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
    // Check the structure of the data object
    console.log('Update UI func with data:', data);
    const meters = data.meters; // Adjust according to the actual data structure
    sortDataByStatus(meters);
}

// Sort data by status
function sortDataByStatus(meters) {
    // Check if meters is an array
    if (!Array.isArray(meters)) {
        console.error('Expected an array of meters, but got:', meters);
        return;
    }
    const pending = meters.filter(m => m.read_status === 'pending');
    const skipped = meters.filter(m => m.read_status === 'skipped');
    const completed = meters.filter(m => m.read_status === 'completed');

    // Update your UI with the sorted data
    console.log('Pending:', pending);
    console.log('Skipped:', skipped);
    console.log('Completed:', completed);

    // Further processing to update the UI
}


// Display list of meters in the UI
function displayList(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = ''; // Clear the existing list

    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'meter-entry';
        listItem.innerHTML = `
            <div class="meter-address">${item.address} <strong>${item.meter_id}</strong></div>
            <div class="status-box" style="background-color: ${getStatusColor(item.read_status)};"></div>
        `;
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
            return 'grey';  // Default
    }
}

function getStatusLabel(status) {
    switch (status) {
        case 'p': return 'Pending';
        case 's': return 'Skipped';
        case 'c': return 'Completed';
        default: return 'Unknown';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const routeId = 123; // Example route ID, replace as needed
    fetchRouteData(routeId);
});

// Sync data back to the server
async function syncData(readings) {
    try {
        // Construct the payload for the POST request
        const payload = {
            // Example data structure, assuming readings is an array of objects
            readings: readings.map(reading => ({
                meter_id: reading.meter_id,
                read_value: reading.read_value,
                read_status: reading.read_status
            }))
        };

        // Send the payload to the server
        const response = await fetch('/sync_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Send the data as JSON
        });

        // Handle the server response
        const result = await response.json();
        console.log('Sync successful:', result);
    } catch (error) {
        console.error('Error syncing data:', error);
    }
}

// Display list of meters in the UI
function displayList(listId, items) {
    const list = document.getElementById(listId);
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


// Example usage (replace with actual data and logic)
fetchRouteData(123); // Fetch data for route ID 123

// Call syncData when you need to sync readings
// syncData(updatedReadings);
