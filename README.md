# [Fullstack open course](https://fullstackopen.com/en/#course-contents)

This repository contains the solutions for the exercises from the Fullstack Open course, focusing on modern web development with React, Node.js, and REST APIs. The course covers building full-stack applications using React for the frontend and Node.js for the backend.

## Course Contents

### Part 0: Fundamentals of Web Apps
- Overview of web app fundamentals and interaction between browser and server.

### Part 1: Introduction to React
- Basics of React, components, JSX, and props.

### Part 2: Communicating with Server
- Working with forms, event handlers, and communicating with a server via HTTP.

### Part 3: Programming a Server with Node.js and Express
- Setting up a Node.js server using Express and connecting to MongoDB.

### Part 4: Testing Express Servers and User Management
- Writing tests for backend services and handling user authentication.

### Part 5: Testing React Apps
- Testing React components using **Jest** and the React Testing Library.
- **End-to-end (E2E) testing** using **Cypress** to simulate user interactions.

### Part 6: Advanced State Management
- State management with Redux, reducers, and Redux Toolkit.


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/karen-pcsta/fullstack-open.git
   ```

   Navigate to the project directory:

```bash
cd fullstack-open
```

2. **Install the dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Running Cypress Tests:** 

4.1.**Install Cypress:**

```bash
npm install cypress --save-dev
```
Add an npm-script to run it:
```bash
{
  // ...
  "scripts": {
    "cypress:open": "cypress open"
  },
  // ...
}
```

4.2. **Run the Cypress test runner:**

```bash
npm run cypress:open
```

Run the tests from the Cypress dashboard.

