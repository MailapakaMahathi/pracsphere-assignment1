```markdown
# 🧠 PracSphere – AI-Powered ERP Task Management System

PracSphere is a modern **ERP-style task management application** built with **Next.js 15**, **TypeScript**, **NextAuth.js**, and **MongoDB**.  
It allows users to register, log in securely, and manage their personal or work-related tasks efficiently — all within a clean, responsive UI.

---

## 🚀 Features

✅ **User Authentication**  
- Secure login using **NextAuth.js (Credentials Provider)**  
- Passwords hashed with **bcryptjs**  
- Session management using JWT  

✅ **Task Management**  
- Create, read, update, and delete tasks  
- Toggle between **Pending** and **Completed** states  
- Automatic filtering and sorting  

✅ **Dashboard**  
- Personalized greeting using session data  
- Task summary cards for quick analytics  
- Fully responsive dashboard UI  

✅ **Tech Stack**  
- ⚡ **Next.js 15** (App Router + Turbopack)  
- 🧩 **TypeScript**  
- 🎨 **Tailwind CSS**  
- 🧠 **NextAuth.js v5**  
- 🍃 **MongoDB + MongoClient**  
- 🧱 **Lucide-react** for icons  
- 📦 **pnpm** for workspace-based monorepo setup  

---

## 🧩 Project Structure

```

pracsphere-assignment1/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── api/
│       │   │   └── tasks/
│       │   │       ├── route.ts        # Task CRUD APIs
│       │   │       └── [id]/route.ts   # Single task operations
│       │   ├── dashboard/              # Dashboard UI + logic
│       │   ├── login/                  # Auth pages
│       │   ├── globals.css             # Tailwind global styles
│       │   └── layout.tsx              # Root layout with SessionProvider
│       ├── lib/
│       │   ├── auth.ts                 # NextAuth configuration
│       │   └── mongodb.ts              # MongoDB connection helper
│       └── components/                 # UI components (TaskCard, TaskForm, etc.)
└── packages/
└── ui/                             # Shared UI components

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/pracsphere-assignment1.git
cd pracsphere-assignment1/apps/web
````

---

### 2️⃣ Install dependencies

We recommend using **pnpm**:

```bash
pnpm install
```

If you prefer npm:

```bash
npm install
```

---

### 3️⃣ Create environment variables

Create a `.env.local` file in the `/apps/web` folder:

```bash
# MongoDB connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Mahathidb

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_generated_secret
```

👉 You can use `openssl rand -base64 32` to generate a strong secret.

---

### 4️⃣ Run the development server

```bash
pnpm run dev
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧱 Common Scripts

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm run dev`   | Starts the Next.js app in development |
| `pnpm run build` | Builds for production                 |
| `pnpm start`     | Runs the production build             |
| `pnpm lint`      | Runs ESLint checks                    |

---

## 🔒 Security Notes

🚫 **Never commit your `.env` file**
Instead, commit an `.env.example` with placeholders:

```env
MONGODB_URI=your_mongodb_uri_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
```

✅ Actual secrets should go into `.env.local` (kept private).

---

## 📸 Preview (Optional)

*Add screenshots or GIFs of your UI here:*

```
📸 Dashboard | 🔐 Login Page | ✅ Task Management
```

---

## 💡 Future Enhancements

* AI-based task prioritization
* Team-level dashboards and roles
* Push notifications for due tasks
* Integration with Google Calendar
  <img width="1358" height="657" alt="Screenshot 2025-10-22 034443" src="https://github.com/user-attachments/assets/95315fe5-f2ba-49ca-8c1f-a149371f53e5" />

  


