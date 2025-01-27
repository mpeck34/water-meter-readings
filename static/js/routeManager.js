// routeManager.js
// yet to be implemented

// Route class to manage individual routes
class Route {
    constructor(routeId, meters = []) {
        this.routeId = routeId;
        this.meters = meters;
    }

    // Fetch route data from the backend and store in localStorage
    // From script.js
    async fetchRouteDataClass(routeId) {
        try {
            const response = await fetch(`https://water-meter-readings.onrender.com/get_route_data/${routeId}`);
            const data = await response.json();
            console.log('Fetched data:', data);

            // Store the data in localStorage
            localStorage.setItem('routeData', JSON.stringify(data));

            updateUI(data);
        } catch (error) {
            console.error('Error fetching route data:', error);
        }
    }

    // Save route data to server
    async saveToServer() {
        try {
            const response = await fetch(`/api/routes/${this.routeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.meters),
            });
            if (!response.ok) {
                throw new Error(`Failed to save route data: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Get filtered lists
    getPendingMeters() {
        return this.meters.filter(meter => meter.readStatus === 'p');
    }

    getSkippedMeters() {
        return this.meters.filter(meter => meter.readStatus === 's');
    }

    getCompletedMeters() {
        return this.meters.filter(meter => meter.readStatus === 'c');
    }
}

// Attach Route to global scope
window.Route = Route;

// Function to fetch and display routes on the page
async function loadRoutes() {
    const routeListElement = document.getElementById('route-list');
    routeListElement.innerHTML = '<p>Loading routes...</p>';

    try {
        const response = await fetch('https://water-meter-readings.onrender.com/get_available_routes'); // Fetch list of routes
        if (!response.ok) {
            throw new Error(`Failed to fetch routes: ${response.statusText}`);
        }
        const routes = await response.json();
        console.log('Fetched routes:', routes); // Debugging log

        // Clear loading message
        routeListElement.innerHTML = '';

        // Check if the routes array is empty
        if (routes.length === 0) {
            routeListElement.innerHTML = '<p>No routes available.</p>';
            return;
        }

        // Populate the route list
        routes.forEach(route => {
            // Create a new div for each route
            const routeElement = document.createElement('div');
            routeElement.className = 'route-item'; // Assign a class for styling

            // Optionally, you can add more information here
            routeElement.innerHTML = `
                <div class="route-info">
                    <strong>Route ID:</strong> ${route.route_id}
                    <p>${route.route_message}</p>
                </div>
            `;

            // Add click event listener for route selection
            routeElement.addEventListener('click', () => selectRoute(route.route_id));

            // Append the route element to the container
            routeListElement.appendChild(routeElement);
        });
    } catch (error) {
        console.error(error);
        routeListElement.innerHTML = '<p>Error loading routes.</p>';
    }
}

// Handle route selection
function selectRoute(routeId) {
    localStorage.setItem('selectedRoute', routeId);
    window.location.href = 'meterList.html'; // Navigate to meter list page
}

// Initialize the page
window.addEventListener('DOMContentLoaded', loadRoutes);
