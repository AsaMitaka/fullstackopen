# Phonebook Server

This is a simple server application for a phonebook. It provides RESTful APIs for managing contacts in a phonebook.

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

- git clone https://github.com/your-username/phonebook-server.git

2. Navigate to the project directory:

- cd phonebook-server

3. Install the dependencies:

- npm install

## Configuration

The server is configured to run on port 3000 by default. If you want to change the port, you can modify the app.listen() function in the server.js file.

## Usage

To start the server, run the following command:

- npm start

This will start the server and it will be accessible at http://localhost:3000.

## API Endpoints

The server provides the following API endpoints:

- GET /api/persons: Retrieve all contacts from the phonebook.
- POST /api/persons: Create a new contact in the phonebook.
- GET /api/persons/:id: Retrieve a specific contact by ID.
- DELETE /api/persons/:id: Delete a contact by ID.

## Error Handling

The server handles common error cases and returns appropriate HTTP status codes along with error messages in the response.

[test online](https://test-q7tm.onrender.com/)
