# Blogging Application

Welcome to the **Blogging Application**! This repository contains a fully functional blogging platform where users can sign up, sign in, read blogs, and publish their own blog posts. 

## Features

- **User Authentication**
  - Sign up with Username, email and password
  - Secure signin with emain and password

- **Blog Management**
  - View all blogs
  - Publish new blogs

- **User Experience**
  - Clean and intuitive UI/UX
  - Responsive design for both desktop and mobile users

## Pages

### 1. **Sign-Up Page**
- Allows new users to create an account.
- Input fields for:
  - Username
  - Email
  - Password
- Validation for unique email addresses.
- **Preview:**

  ![image](https://github.com/user-attachments/assets/db229c7d-e88e-4775-b05f-a4ad3dd4e30c)

### 2. **Sign-In Page**
- Enables existing users to log in.
- Input fields for:
  - Email
  - Password
- Error handling for incorrect credentials.
- **Preview:**

  ![image](https://github.com/user-attachments/assets/78e4a9c0-d5b5-41cd-9c70-5ed4f5c1a7ea)

### 3. **Blogs Page**
- Displays a list of all published blogs.
- Each blog includes:
  - Title
  - Author
  - Publication date
- Search and filter options (To be added)
- **Preview:**

  ![image](https://github.com/user-attachments/assets/89246b58-c238-4b5e-8c12-b03fbf737618)

### 4. **Publish Blog Page**
- Accessible only to authenticated users.
- Input fields for:
  - Blog Title
  - Blog Content
- Publish immediately.

- **Preview:**

  ![image](https://github.com/user-attachments/assets/28556771-88ee-457a-b2fa-20d6b53ffacd)


## Technologies Used

- **Frontend**: Vite, React, TypeScript
- **Backend**: Hono.js, deployed on Cloudflare Workers
- **Database**: PostgreSQL (via Avian)
- **ORM**: Prisma (used for schema management and connection pooling with Prisma Accelerate)

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ghagevaibhav/narrate.git
   ```
2. Navigate to the project directory:
   ```bash
   cd narrate
   ```
3. Navigate to the specific folder to install dependencies:
   - For the backend:
     ```bash
     cd narrate/backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```
   - For the common utilities:
     ```bash
     cd ../common
     npm install
     ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` folder.
   - Add the following:
     ```env
     DATABASE_URL=your-database-url
     JWT_SECRET=your-jwt-secret
     ```
   - Update the `wrangler.toml` file in the `backend` folder to include the secrets:
     ```toml
     [vars]
     DATABASE_URL="your-database-url"
     JWT_SECRET="your-jwt-secret"
     ```
5. Push the Prisma schema to the database:
   ```bash
   npx prisma db push
   ```
6. Start the development servers:
   - For the backend:
     ```bash
     npm run dev
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```

### Deployment

This application is deployed on Cloudflare Workers. To deploy:
1. Install the Cloudflare Workers CLI (`wrangler`):
   ```bash
   npm install -g wrangler
   ```
2. Configure the `wrangler.toml` file with your Cloudflare account details and ensure all necessary environment variables are included.
3. Deploy the backend:
   ```bash
   cd narrate/backend
   wrangler login
   npx wrangler deploy 
   ```
4. Deploy the frontend to your preferred hosting platform.

### Running the App

- Visit the deployed URL or `http://localhost:<your-port>` during development to access the application.

## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any questions or issues, feel free to reach out:
- **Email**: ghagevaibhav@gmail.com
- **GitHub**: [Vaibhav Ghage](https://github.com/ghagevaibhav)

---

Happy Blogging!

