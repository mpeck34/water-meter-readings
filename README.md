# Water Meter Reading App Mockup

The purpose of this app is to create a working imitation of a real world app designed for field workers to obtain readings from water meters.
The functionality is intentionally limited compared to what a real app would require. This is done to focus on specific issues encountered when using the that app.
The real world app has been produced using Oracle, known ubitiquosly as Field Service, and has a few minor errors and issues that this project aims to fix in an imitation app using a Python backend utilizing SQLite.

Author: Mark Peck

Users can enter meter readings, view pending and completed readings, and manage skipped readings using the HTML file that emulates the handheld device running Field Service. After a set number of reads the data is synced to the backend using an API call to the local Flask server, imitating an API call over a mobile network.
The backend data can also be viewed dynamically to confirm that the server has received the data.

Some of the chief concerns with the Field Service app involve the syncing of data between the handheld device and the server. For example, reads which are logged into the handheld device that have not successfully synced back by the end of the day are lost.
This results in the potential for either wasted labor or customer dissatisfaction, as either a field worker must travel back to the site and retread ground, or the reads must be skipped resulting in the customer obtaining a bill based on an estimate.

## Technologies Used

- HTML
- CSS
- JavaScript
- SQLite (for backend)
- Flask
- CORS
