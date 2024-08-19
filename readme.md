# Multi-Level Comment System API

This is a RESTful API for a social media platform that handles multi-level comments on posts. The API allows users to create comments, reply to existing comments, and retrieve comments with pagination. Additionally, user authentication and rate limiting have been implemented to ensure secure and efficient API usage.

## Deployment
 Deployed on Railway.
 
 ```https://web-production-3594.up.railway.app```

 
## Features

- User Registration and Authentication with JWT-based session management
- Create, Reply, and Retrieve comments on posts with multi-level nesting
- Role-based access control for comment management
- Rate limiting for secure and controlled API usage
- Pagination support for scalable comment retrieval
- Integration tests for API endpoints
- Detailed API documentation with Postman

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcrypt for secure password storage
- Rate limiting middleware
- Docker for containerization
- Jest (for testing)
- Postman for API documentation
- Deployment on Railway

## Setup and Installation

### Prerequisites

- Node.js (LTS version recommended)
- Docker (for containerization)
- MongoDB Database

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/talha-ansarii/E-Commerce-backend.git
    cd E-Commerce-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    DB_HOST="YOUR DB HOST"
    DB_USER="YOUR DB USERNAME"
    DB_PASSWORD="YOUR DB PASSWORD"
    DB_NAME="YOUR DB NAME"
    JWT_SECRET="YOUR JWT SECRET"
    NODE_ENV=development/production
    ```

4. Set up the MySQL database using XAAMP:
   - Create a database named comment_system.


5. Run the server:
    ```sh
    npm start
    ```

The API will be available at `http://localhost:4000`.


## Docker Setup

1. Buid the Docker image
```docker build -t multi-level-comment-system```

2. Run the Docker container
```docker run -p 3000:3000 multi-level-comment-system```





## Usage

### Endpoints

#### Auth

- **Register**
  - `POST /user/register`
  - Request Body:
    ```json
    {
      "name": "ajay",
      "email": "ajay@gmail.com",
      "password": "ajay@123",

    }
    ```

- **Login**
  - `POST /auth/login`
  - Request Body:
    ```json
    {
      "email": "ajay@gmail.com",
      "password": "ajay@123"
    }
    ```







#### Comment Management



- **Create comment** 
  - `POST /api/posts/{postId}/comments`
  - Request Body:
    ```json
    {
       "postId": 1,
        "text": "This is a comment."
    }
    ```

- **Reply to Comment** 
  - `POST /api/posts/{postId}/comments/{commentId}/reply`
  - Request Body:
    ```json
    {
  "postId": 1,
  "commentId": 1,
  "text": "This is a reply to the comment."
    }
    ```


- **Get Comments for a Post** 
  - `GET /api/posts/{postId}/comment`
  - Request Parameters:
    - `sortBy (optional): Field to sort comments (e.g., createdAt, repliesCount)
    - `sortOrder (optional): Sorting order (asc, desc)

- **Expand Parent-Level Comments** 
  - `GET /api/posts/{postId}/comments/{commentId}/expand`
  - Request Parameters:
    - `page: Page number for pagination
    - `pageSize: Number of comments per page



## Testing

To run tests, use the following command:
```sh
npm test
```

### Documentation

- API documentation is available via Swagger:
`https://your-deployed-app-url.on.railway.app/api-docs`


