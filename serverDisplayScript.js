async function fetchData() {
    try {
        // Fetch data from the server
        const response = await fetch(`http://127.0.0.1:5000/get_route_data/123`);
        const data = await response.json();
        console.log('Fetched data:', data);
        
        // Populate Meter Readings Table
        const meterReadingsTable = document.getElementById('meterReadingsTable').getElementsByTagName('tbody')[0];
        
        // Clear any existing rows (optional if you want to reset the table each time)
        meterReadingsTable.innerHTML = '';

        // Loop through the meters and populate the table
        data.meters.forEach(meter => {
            const row = meterReadingsTable.insertRow();
            row.insertCell(0).textContent = meter.meter_id;
            row.insertCell(1).textContent = meter.read_value;
            row.insertCell(2).textContent = meter.read_status;
            row.insertCell(3).textContent = meter.sync_status;
            row.insertCell(4).textContent = meter.last_sync;
        });

        // Populate Skip Status Table
        const skipStatusTable = document.getElementById('skipStatusTable').getElementsByTagName('tbody')[0];
        skipStatusTable.innerHTML = '';  // Clear existing rows
        
        // Since skip status is embedded within meters, you may want to do it differently
        data.meters.forEach(meter => {
            const row = skipStatusTable.insertRow();
            row.insertCell(0).textContent = meter.meter_id;
            row.insertCell(1).textContent = meter.skip_status;
            row.insertCell(2).textContent = meter.skip_reason;
        });

        // Populate Special Messages Table
        const specialMessagesTable = document.getElementById('specialMessagesTable').getElementsByTagName('tbody')[0];
        specialMessagesTable.innerHTML = '';  // Clear existing rows
        
        // Since special messages are also embedded, handle them within meters
        data.meters.forEach(meter => {
            const row = specialMessagesTable.insertRow();
            row.insertCell(0).textContent = meter.meter_id;
            row.insertCell(1).textContent = meter.special_message;
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call fetchData when the page loads
fetchData();
