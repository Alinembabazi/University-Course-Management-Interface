# University Course Management Interface

A React and Vite web application for managing university courses through a supervisor dashboard. The app supports authentication, course listing, course creation, editing, deletion, and course detail pages. It also includes local storage fallback behavior when backend access is unavailable or protected by an API token.

## Features

- Supervisor login with protected routes
- Dashboard with course metrics and quick actions
- View all courses in table and card layouts
- Create, edit, view, and delete courses
- Search and refresh course data
- Local storage fallback for course data when remote access is limited
- Optional API token support for protected backend requests
- Toast notifications for key actions and errors

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Axios
- Tailwind CSS 4
- React Hot Toast

## Project Structure

```text
src/
  components/      Reusable UI components such as layout, forms, table, modal
  context/         Authentication context
  hooks/           Custom hooks for auth and course fetching
  pages/           Login, dashboard, courses, create, edit, and detail pages
  routes/          Application routing
  services/        API and local storage service logic
  utils/           Constants and helper utilities
```

## Routes

- `/login` - Supervisor login page
- `/dashboard` - Main dashboard with summary metrics and course cards
- `/courses` - Course list and search page
- `/courses/create` - Create a new course
- `/courses/:id` - View course details
- `/courses/:id/edit` - Edit an existing course

## Authentication

This project uses a local supervisor login flow for demo and development purposes.

Test credentials:

- Email: `admin@example.com`
- Password: `adminpassword123`

If your backend requires authorization, you can provide an API token on the login page or through the `VITE_API_TOKEN` environment variable.

## API Behavior

The app is configured to connect to:

- `https://student-management-system-backend.up.railway.app`

Course requests try these endpoints:

- `/api/courses`
- `/courses`

If the backend is unavailable or rejects unauthorized course writes, the app can still keep locally created or updated courses in browser storage.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

### 5. Run linting

```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the project root if you want to preload the backend token:

```env
VITE_API_TOKEN=your_api_token_here
```

## Main User Flow

1. Log in using the supervisor account.
2. Open the dashboard to view course statistics.
3. Refresh course data from the backend.
4. Create a new course with name and description.
5. Open a course to view its details.
6. Edit or delete a course as needed.

## Notes

- Authentication state is stored in `localStorage`.
- Local courses are stored in browser storage and merged with fetched backend data.
- If a backend request returns `401`, the interface guides the user to add an API token.
- If one course endpoint returns `404`, the app retries using a fallback endpoint.

## Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Future Improvements

- Add role-based access control
- Connect to a live authentication service
- Add pagination and filtering
- Add automated tests
- Improve course validation and richer course fields

## Author

Developed as a University Course Management Interface project using React, Vite, and Tailwind CSS.
