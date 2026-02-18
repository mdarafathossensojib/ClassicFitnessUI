# 🏋️‍♂️ ClassicFitness

A modern, high-performance full-stack fitness management application built with **React**, **Vite**, **TailwindCSS**, and **Django REST Framework**. 

ClassicFitness allows users to manage memberships, track daily workouts, book fitness classes, and access a free 7-day trial. It includes a robust admin panel for managing users, subscriptions, and attendance.

---

## 🏗 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, TailwindCSS |
| **Forms & State** | React Hook Form, Custom Hooks |
| **Icons & UI** | Lucide Icons, Responsive Design |
| **Backend** | Django 4.x, Django REST Framework (DRF) |
| **Authentication** | Djoser (JWT/Token Auth), Email Activation |
| **Database** | PostgreSQL / SQLite |
| **API Client** | Axios (with custom interceptors) |

---

## 🚀 Key Features

### 👤 User Features
* **Authentication:** Secure signup, login, password reset, and email activation.
* **7-Day Free Trial:** Automatic starter subscription upon trial activation.
* **Smart Dashboard:** Visual stats for workouts this month, total classes, and upcoming schedules.
* **Class Booking:** Seamless booking system (requires active subscription).
* **Profile Management:** User profile updates with image upload support.

### 🛠 Admin Features
* **Management Panel:** Full CRUD for users, memberships, and subscriptions.
* **Attendance Tracking:** Monitor member attendance and class capacity.
* **Automated Logic:** Automatic expiry handling for subscriptions.

---

## ⚙️ Installation & Setup

### 1. Backend Setup
```bash
# Clone the repository
git clone <repo_url>
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations & Create superuser
python manage.py migrate
python manage.py createsuperuser

# Start the server
python manage.py runserver

 Frontend SetupBashcd frontend

# Install dependencies
npm install

# Setup environment variables
# Create a .env.local file and add:
# VITE_API_BASE_URL=http://localhost:8000/api/v1

# Start development server
npm run dev
📂 Project StructurePlaintextbackend/
├─ accounts/      # User authentication & profile logic
├─ memberships/   # Plans, pricing, and active subscriptions
├─ classes/       # Schedule and booking logic
├─ attendance/    # Member check-ins
└─ api/           # Centralized DRF ViewSets & Serializers

frontend/
├─ src/
│  ├─ components/ # Reusable UI components (Navbar, Sidebar, Cards)
│  ├─ pages/      # Route-level components (Dashboard, FreeTrial)
│  ├─ hooks/      # Custom logic (useAuthContext)
│  └─ services/   # Axios API client configuration
📊 Database Schema
MembershipPlan: Defines plan name, duration, and price.

Subscription: Links users to plans with start_date and is_active status.

FreeTrialRequest: Stores leads and triggers 7-day starter plans.

Attendance: Tracks presence of members in specific fitness classes.

🔑 API Reference (Selected Endpoints)
Method Endpoint Description
POST /api/v1/free-trial/Creates request + 7-day subscription
GET /api/v1/accounts/dashboard/Returns stats and recent activity
GET /api/v1/membership-plans/my_subscription/Current user plan details

Contributing
Fork the repository.

Create a Feature Branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📧 Contact
Developer: MD Arafat Hossen

Email: mdarafathossensojib2020@gmail.com

GitHub: mdarafathossensojib

Developed with ❤️ by MD Arafat Hossen