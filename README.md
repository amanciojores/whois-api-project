# Whois API Project

## Overview

**Whois API Project** is a full-stack application that allows users to look up domain information and contact information using the Whois API. It consists of a backend, built using **NestJS**, that interacts with the Whois API to retrieve the requested data, and a frontend, built using **Angular**, that provides a user-friendly interface to interact with the backend.

## Features

- Enter a domain name and select the type of information to retrieve (Domain Information or Contact Information).
- Display domain details like registrar, registration date, expiration date, and more.
- Display contact details like registrant, technical contact, administrative contact, and email.
- Handle API errors gracefully and inform the user.
- Responsive and visually appealing interface using **CSS** and/or **Tailwind CSS**.

## Project Structure

The project has two main components:

1. **Backend (NestJS)**: Provides an endpoint to interact with the Whois API, processes the domain data, and returns the requested information.
2. **Frontend (Angular)**: Provides an interface for users to enter domain names and displays the results in a well-formatted table.

## Requirements

- **Node.js** (v20+)
- **Angular CLI** (v18+)
- **NestJS** (v10+)
- **Whois API Key** (You can get a free API key at [Whois API](https://whoisxmlapi.com))

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/whois-api-project.git
cd whois-api-project
```

### 2. Install Dependencies

Backend (NestJS)

```bash
cd backend
npm install
```

Frontend (Angular)

```bash
cd frontend
npm install
```

### 3. Set Up API Key

In the backend, create an .env file to store the Whois API key:

```bash
WHOIS_API_KEY=your_api_key_here
```

### 4. Running the Application

To run both the backend and frontend locally:

Backend (NestJS):

```bash
cd backend
npm run start
```

This will start the backend server at http://localhost:8080.

Frontend (Angular)

```bash
cd frontend
ng serve
```

This will start the frontend server at http://localhost:5000.

### 5. Usage

- Open your browser and navigate to http://localhost:5000.
- Enter a domain name (e.g., amazon.com).
- Choose between "Domain Information" or "Contact Information".
- Click on the Lookup button to see the domain information displayed.

## Endpoint

This README covers the setup, usage, and deployment of your project. Make sure to replace the placeholders like `your-username` and `your_api_key_here` with actual values for your project.
