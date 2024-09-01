// Fetch route data from the backend
async function fetchRouteData(routeId) {
    try {
        const response = await fetch(`/get_route_data/${routeId}`);
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching route data:', error);
    }
}

// Update UI with the sorted data
function updateUI(data) {
    const { pending, skipped, completed } = sortDataByStatus(data);

    // Update lists
    displayList('pending-list', pending);
    displayList('skipped-list', skipped);
    displayList('completed-list', completed);
}

// Sort data by status
function sortDataByStatus(data) {
    const pending = data.filter(item => item.read_status === 'p');
    const skipped = data.filter(item => item.read_status === 's');
    const completed = data.filter(item => item.read_status === 'c');
    return { pending, skipped, completed };
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

// Example usage (replace with actual data and logic)
const exampleReadings = [
    { meter_id: 1, read_value: 12345, read_status: 'c' },
    { meter_id: 2, read_value: 67890, read_status: 'c' },
    // Add more readings as needed
];

syncData(exampleReadings);

// Example usage (replace with actual data and logic)
fetchRouteData(123); // Fetch data for route ID 123

// Call syncData when you need to sync readings
// syncData(updatedReadings);
