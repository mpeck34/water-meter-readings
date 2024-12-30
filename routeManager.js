// routeManager.js
// yet to be implemented

// Route class to manage individual routes
class Route {
    constructor(routeId, meters = []) {
        this.routeId = routeId;
        this.meters = meters;
    }

    // Load route data from server
    async loadFromServer() {
        try {
            const response = await fetch(`/api/routes/${this.routeId}`);
            if (!response.ok) {
                throw new Error(`Failed to load route data: ${response.statusText}`);
            }
            this.meters = await response.json();
        } catch (error) {
            console.error(error);
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

// Function to fetch and display routes on the page
async function loadRoutes() {
    const routeListElement = document.getElementById('route-list');
    routeListElement.innerHTML = '<p>Loading routes...</p>';

    try {
        const response = await fetch('/api/routes'); // Fetch list of routes
        if (!response.ok) {
            throw new Error(`Failed to fetch routes: ${response.statusText}`);
        }
        const routes = await response.json();

        // Clear loading message
        routeListElement.innerHTML = '';

        // Populate the route list
        routes.forEach(route => {
            const routeElement = document.createElement('div');
            routeElement.className = 'route-item';
            routeElement.textContent = `Route ${route.routeId}`;
            routeElement.addEventListener('click', () => selectRoute(route.routeId));
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
    window.location.href = 'meterReader.html'; // Navigate to meter reader page
}

// Initialize the page
window.addEventListener('DOMContentLoaded', loadRoutes);
