# Cards React TypeScript Project

A modern web application for managing and displaying cards with user authentication and admin controls. Built with React, TypeScript, and Vite.

## Features

### User Management
- User registration and login system
- JWT-based authentication
- Protected routes for authenticated users
- User profile management
- Admin control panel for user management

### Card Management
- Create new cards with rich content
- Edit existing cards
- Delete cards with confirmation modal
- View all cards
- Personal card collection (MyCards)
- Favorite cards functionality

### UI/UX Features
- Responsive design using Bootstrap and React Bootstrap
- Dark/Light theme toggle
- Animated transitions using Framer Motion
- Form validation using Formik and Yup
- Toast notifications for user feedback
- Loading states and animations

### Admin Features
- User CRM system
- User role management
- Card management controls
- System monitoring

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** 
  - Bootstrap 5
  - React Bootstrap
  - CSS Modules
- **Form Management:** Formik with Yup validation
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **State Management:** React Context
- **Authentication:** JWT

## Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── components/     # React components
│   ├── cards/     # Card-related components
│   └── loader/    # Loading components
├── context/       # React context providers
├── interfaces/    # TypeScript interfaces
├── services/      # API services
├── style/         # Global styles
└── utilities/     # Helper functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
VITE_API_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
