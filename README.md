# Weather App

This is a full-stack weather application that allows users to view weather information for different cities. The application consists of a backend server and a frontend client.

## Backend

The backend of the application is built using the MERN stack, which includes MongoDB as the database, Express as the server framework, React for building the user interface, and Node.js as the runtime environment.

### Database

The application uses a MongoDB database with two collections: "city" and "forecast". The "city" collection stores information about cities, including their name, time zone, latitude, and longitude. The "forecast" collection stores weather forecast data for each city, including temperature, minimum temperature, maximum temperature, humidity, and the date and time of the forecast.

### Server

The server is responsible for handling API requests and interacting with the database. It uses Express to define routes and controllers for handling different API endpoints. The server also includes a cron job that runs every five hours to update the forecast data in the database.

## Frontend

The frontend of the application is built using React.js. It provides a user-friendly interface for viewing weather information for different cities.

### Components

The frontend consists of several components:

- **CityList**: Displays a list of cities, allowing users to select a city to view more details.
- **CityItem**: Represents a single city in the list, displaying the city name, current temperature, and time.
- **CurrentWeather**: Displays detailed weather information for the selected city, including humidity, wind speed, and the temperature forecast for the next five days.
- **SearchInput**: Allows users to search for cities and filter the list based on their input.

### Context

The application uses the Context API to manage global state. The CityContext provides the selected city and allows components to access and update the selected city information.

## API Integration

The frontend communicates with the backend server through API requests to fetch weather data for different cities. It uses Axios or Fetch API to make HTTP requests to the server and retrieve the necessary data.

## Instructions for Running the Application

1. Clone the repository from GitHub.
2. Install the dependencies for both the backend and frontend by running `npm install` in the respective directories (backend and frontend).
3. Start the backend server by running `npm start` in the backend directory.
4. Start the frontend development server by running `npm start` in the frontend directory.
5. Access the application in your browser at http://localhost:3000.

Feel free to reach out if you need any further details or assistance with the project.

A screenshot showcasing the website:

![image](https://github.com/EliyaUYosef/WeatherApp/assets/49410686/300011c4-bd3a-42d5-bd76-5742fab78a92)

A screenshot showcasing the search engine:

![image](https://github.com/EliyaUYosef/WeatherApp/assets/49410686/f7bc18cc-3216-41f9-9c81-463970dc3370)
