# config.py

import os

class Config:
    # Set default base URL to localhost or your staging environment
    BASE_URL = os.getenv('RENDER_URL', 'http://localhost:5000')

    # Add other common configuration values here
    DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///default.db')  # Example for DB URI
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')  # For Flask sessions and cookies

# You can also create more specific configurations for production, testing, etc.
class ProductionConfig(Config):
    BASE_URL = 'https://water-meter-readings.onrender.com'
