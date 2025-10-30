# Recipe sharing web application
An application where users can explore and share fun food recipes 

## Getting Started
To set up the project locally, follow these steps:
### Prerequisites
- Node.js (v14 or higher).
- PostgreSQL database (local or cloud).
- Google Developer Console account (for generating OAuth credentials).
### Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/nimaazmdv/dishly.git
    cd dishly
    ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Copy `.env.example` to `.env` in the server directory.
   - Fill the variables with your own secrets and credentials (See below).
4. Generate Google OAuth Credentials:
   - Go to the Google Developer Console.
   - Create a new project, Under Credentials, create OAuth 2.0 Client IDs for both development and production environments.
   - Add `http://localhost:3000/api/auth/google/callback` as an authorized redirect URI for local development (replace localhost:3000 with your actual production URL when deploying).
   - Copy the Client ID and Client Secret into the `.env` file.
5. Migrate and seed the database:
    ```bash
    npm run db:push
    npm run db:seed 
    ```
6. Run the app:
   ```bash
   npm run dev
   ```
The application should now be running at http://localhost:3000.
