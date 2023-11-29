# Actian Careers Open Positions API

This is a simple Node.js application built with Express.js to retrieve open positions in a specified department at Actian. Swagger documentation is included to help understand and interact with the API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)


### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>

2. Naivgate to the project directory

    ```
    cd <project-directory>

3. Install dependencies:

    ```
    npm install

### Usage

- Start the server

    ```
    npm start

The server will be running on http://localhost:4000 (or a different port if specified).

- Call the API endpoint e.g. in your browser

    ```
    http://localhost:4000/open-positions?department=<department-name>

- Access Swagger Documentation

Open your browser and visit http://localhost:4000/api-docs to access the Swagger documentation for the API.
