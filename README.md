# School Trip Project

This repository contains a full-stack school trip application with three main parts:

- `backend/` — Node.js + Express API server
- `front/` — public-facing React + Vite website
- `admin panel/` — admin dashboard React + Vite app

## Contents

### backend

The backend is built with:

- Node.js
- Express
- Mongoose
- dotenv
- cors

Run the backend:

```sh
cd backend
npm install
npm run dev
```

### front

The public site is a Vite React app with Tailwind CSS and shadcn/ui components.

Run the public site:

```sh
cd front
npm install
npm run dev
```

### admin panel

The admin dashboard is also a Vite React app with Tailwind CSS and shadcn/ui.

Run the admin panel:

```sh
cd "admin panel"
npm install
npm run dev
```

## Notes

- The `backend` server may require a `.env` file for MongoDB configuration.
- The frontend apps are configured with Vite and use React Router, React Query, and Tailwind CSS.
- Each subproject has its own `README.md` file for additional details.

## GitHub upload

To upload this repository to GitHub:

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

Replace `<YOUR_GITHUB_REPO_URL>` with your repository URL.

## License

Add your preferred license here, if desired.
