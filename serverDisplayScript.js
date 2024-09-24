async function fetchData() {
    try {
        // Fetch data from the server
        const response = await fetch(`http://127.0.0.1:5000/get_data`);
        const data = await response.json();
        console.log('Fetched data:', data);
        
        // Populate Meter Readings Table
        const meterReadingsTable = document.getElementById('meterReadingsTable').getElementsByTagName('tbody')[0];
        
        // Clear any existing rows (optional if you want to reset the table each time)
        meterReadingsTable.innerHTML = '';

        // Loop through the meter readings and populate the table
        data.meter_readings.forEach(reading => {
            const row = meterReadingsTable.insertRow();
            row.insertCell(0).textContent = reading.meter_id;
            row.insertCell(1).textContent = reading.read_value;
            row.insertCell(2).textContent = reading.read_status;
            row.insertCell(3).textContent = reading.sync_status;
            row.insertCell(4).textContent = reading.last_sync;
        });

        // Populate Skip Status Table
        const skipStatusTable = document.getElementById('skipStatusTable').getElementsByTagName('tbody')[0];
        skipStatusTable.innerHTML = '';  // Clear existing rows
        data.skip_status.forEach(skip => {
            const row = skipStatusTable.insertRow();
            row.insertCell(0).textContent = skip.meter_id;
            row.insertCell(1).textContent = skip.skip_status;
            row.insertCell(2).textContent = skip.skip_reason;
        });

        // Populate Special Messages Table
        const specialMessagesTable = document.getElementById('specialMessagesTable').getElementsByTagName('tbody')[0];
        specialMessagesTable.innerHTML = '';  // Clear existing rows
        data.special_messages.forEach(message => {
            const row = specialMessagesTable.insertRow();
            row.insertCell(0).textContent = message.meter_id;
            row.insertCell(1).textContent = message.message;
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call fetchData when the page loads
fetchData();