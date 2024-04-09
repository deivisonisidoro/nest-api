# Clean Arch Nest Project


## Description

The Clean Arch Nest Project is a template project built on the Nest.js framework, implementing clean architecture principles. Its primary purpose is to provide developers with a structured and efficient approach to building modern web applications.

## Table of Contents

1. [Installation](#installation)
2. [Database Setup](#database-setup)
3. [Usage](#usage)
4. [Organizational Structure Explained](#organizational-structure-explained)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

To install the project, follow these steps:

1. **Clone the Repository**: 
   Clone the project repository from GitHub using the following command:
   ```bash
   git clone https://github.com/deivisonisidoro/nest-api.git
   ```
2. **Navigate to the Project Directory**: 
   Change your current directory to the root directory of the project:
   ```bash
   cd nest-api
   ```
3. **Install Dependencies**:
   Run the following command to install project dependencies:
   ```bash	
   pnpm install
   ```
## Database Setup

To set up the database for your project, follow these steps:

1. **Create .env File**:

   Before starting the database services, create a new file named .env in the root directory of your project. You can use the .env.example file as a template. This .env file will contain environment variables necessary for configuring your database connection and other settings specific to your project.
2. **Start Docker Compose Services**:

   If you haven't already, ensure that Docker is installed on your system. Then, navigate to the root directory of your project where the `docker-compose.yml` file is located. Run the following command to start the Docker Compose services for the development and testing databases:
   ```bash 
   docker-compose up -d
   ```
   This command will spin up Docker containers for the development and testing databases defined in the `docker-compose.yml` file. The `-d` flag runs the containers in detached mode, allowing you to continue using the terminal while the services run in the background.

3. **Run Prisma Migrations**:

   With the Docker services running, you can now run Prisma migrations to create the necessary tables in the databases. Ensure that Prisma CLI is installed globally on your system. Navigate to the root directory of your project and run the following command:
   ```bash
   pnpm prisma migrate dev
   ```
   This command will apply any pending migrations to the database defined in your Prisma schema, creating the tables and seeding initial data if specified.

By following these steps, you'll have your databases set up and ready for use with your Nest.js project. If you encounter any issues or have questions, feel free to refer to the project documentation or reach out to the project maintainers for assistance.



## Usage

To run your Nest.js application, execute the following commands:

1. **Start the Application**:

   To start your Nest.js application, run the following command:
   ```bash
   pnpm nest:start:dev
   ```
   This command will start your application in development mode with live reload enabled. Any changes you make to your code will trigger the application to restart automatically, allowing for a smoother development experience.
2. **Run Unit Tests**:

   To run unit tests for your application, execute the following command:
   ````bash
   pnpm test
   ````
   This command will run all unit tests defined in your project using Jest. Unit tests help ensure that individual components of your application function correctly in isolation.
3. **Run End-to-End (E2E) Tests**:

   To run end-to-end (E2E) tests for your application, use the following command:
   ```bash
   pnpm test:e2e
   ```
   This command will execute E2E tests defined in your project using Jest. E2E tests simulate real user interactions with your application and help verify its functionality from end to end.

By following these steps, you can effectively develop, test, and maintain your Nest.js application. If you encounter any issues or have questions about specific commands, refer to the project documentation or reach out to the project maintainers for assistance.


## Organizational Structure Explained

### Domain:

In the src/domain directory, the core domain logic of the application resides. This includes entities, data transfer objects (DTOs), enums, and utility functions essential to the business domain. Entities encapsulate the core business objects, while DTOs define data structures exchanged between different layers of the application. Enums provide a convenient way to represent fixed sets of values relevant to the domain. Additionally, utility functions assist in common operations within the domain logic. By organizing these elements within the domain folder, the application maintains a clear separation of concerns, ensuring that business logic remains decoupled from infrastructure-specific details.

### Application:

In the src/application directory, the application-specific logic is meticulously organized in alignment with the principles of clean architecture. Here, distinct layers of the application are thoughtfully structured, comprising abstract classes for controllers, providers, and repositories, alongside implementations of use cases. Controllers handle incoming requests from clients, while providers manage dependencies required by various components. Repositories encapsulate data access logic, abstracting away details of specific data storage mechanisms. Use cases contain the application's business logic, providing a clear separation from infrastructure concerns. This modular structure enhances maintainability, testability, and scalability of the application, allowing for easier development and evolution over time.

### Infrastructure:

Within the src/infra directory, infrastructure-related components are housed, facilitating interactions with external systems and resources. This includes database access modules, providers for external services, and repositories that implement data access logic using specific technologies or APIs. By encapsulating infrastructure concerns within this folder, the application maintains flexibility in integrating with different technologies and platforms. Separating infrastructure-related code from the core domain and application logic promotes modularity and allows for easier maintenance and evolution of the system.

### Presentation:

Under the src/presentation directory, components responsible for presenting the application to the outside world are organized. This includes Nest.js specific modules, controllers, guards, helpers, and managers. Modules encapsulate related components and provide a way to organize the application's features. Controllers handle incoming HTTP requests and delegate processing to other components. Guards enforce access control policies, ensuring that only authorized users can access certain endpoints. Helpers contain utility functions and custom decorators used across the presentation layer. Managers bridge the gap between the application logic and the presentation layer, orchestrating interactions between different components. By organizing presentation-related code within this folder, the application separates concerns related to user interaction from core business and infrastructure logic, promoting maintainability and scalability.


## Contributing

We welcome contributions from the community to improve our project. If you encounter any bugs, have suggestions for improvements, or would like to submit code changes, please follow these guidelines:

- **Reporting Bugs**: If you find a bug in the project, please open an issue on our GitHub repository. Be sure to include a detailed description of the issue, steps to reproduce it, and any relevant screenshots or error messages.

- **Suggesting Improvements**: If you have ideas for improving the project or adding new features, feel free to open an issue to discuss your suggestions. We value feedback from our users and are always looking for ways to enhance our project.

- **Submitting Code Changes**: To contribute code changes, please fork our repository and create a new branch for your changes. Make sure to follow our coding standards and guidelines. Once your changes are ready, submit a pull request for review. Be sure to include a clear description of your changes and any related issues or pull requests.

We appreciate your contributions and thank you for helping to make our project better for everyone.


## Questions or Feedback

If you have any questions, feedback, or encounter issues while using our application, please don't hesitate to reach out. You can [open an issue](link_to_issue_tracker) on our GitHub repository or contact us directly via email [deivisonisidoro@gmail.com]. We appreciate your input and are here to help resolve any issues you may encounter.
