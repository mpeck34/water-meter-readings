// Load lists from localStorage when the page loads
const pendingList = JSON.parse(localStorage.getItem('pendingList')) || [];
const skippedList = JSON.parse(localStorage.getItem('skippedList')) || [];
const completedList = JSON.parse(localStorage.getItem('completedList')) || [];

// Save the lists to localStorage
function saveListsToLocalStorage() {
    localStorage.setItem('pendingList', JSON.stringify(pendingList));
    localStorage.setItem('skippedList', JSON.stringify(skippedList));
    localStorage.setItem('completedList', JSON.stringify(completedList));
}

// Fetch route data from the backend and store in localStorage
async function fetchRouteData(routeId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/get_route_data/${routeId}`);
        const data = await response.json();
        console.log('Fetched data:', data);

        // Store the data in localStorage
        localStorage.setItem('routeData', JSON.stringify(data));

        updateUI(data);
    } catch (error) {
        console.error('Error fetching route data:', error);
    }
}

// Update UI with the sorted data
function updateUI(data) {
    console.log('Update UI with data:', data);

    if (!data || !Array.isArray(data.meters)) {
        console.error('Invalid data structure:', data);
        return;
    }

    const meters = data.meters;
    sortDataByStatus(meters);
}

// Sort data by status and update UI
function sortDataByStatus(meters) {
    if (!Array.isArray(meters)) {
        console.error('Expected an array of meters, but got:', meters);
        return;
    }

    // Clear existing lists before updating them
    pendingList.length = 0;
    skippedList.length = 0;
    completedList.length = 0;

    meters.forEach(meter => {
        if (meter.read_status === 'p' || meter.read_status === 'N/A') {
            pendingList.push(meter);
        } else if (meter.read_status === 's') {
            skippedList.push(meter);
        } else if (meter.read_status === 'c') {
            completedList.push(meter);
        }
    });

    // Save updated lists to localStorage
    saveListsToLocalStorage();

    // Update the UI with the sorted lists
    displayList('pendingList', pendingList);
    displayList('skippedList', skippedList);
    displayList('completedList', completedList);
}

// Display list of meters in the UI
function displayList(listId, items) {
    const list = document.getElementById(listId);
    if (!list) {
        console.error(`Element with ID ${listId} not found`);
        return;
    }

    list.innerHTML = '';

    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'meter-entry';
        listItem.innerHTML = `
            <div class="meter-address">${item.address} <strong>${item.meter_id}</strong></div>
            <div class="status-box" style="background-color: ${getStatusColor(item.read_status)};"></div>
        `;
        listItem.addEventListener('click', () => {
            window.location.href = `meterReader.html?meterID=${item.meter_id}&address=${encodeURIComponent(item.address)}`;
        });
        list.appendChild(listItem);
    });
}

// Get color based on status
function getStatusColor(status) {
    switch (status) {
        case 'p': return 'black';
        case 's': return 'red';
        case 'c': return 'green';
        default: return 'black';
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