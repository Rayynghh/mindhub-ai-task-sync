# 🧠 MindHub AI Scheduler

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Calendar API](https://img.shields.io/badge/Google_Calendar-4285F4?style=for-the-badge&logo=google-calendar&logoColor=white)

MindHub is an AI-powered study planner featuring interactive Gantt charts and seamless Google Calendar sync. It leverages AI to optimize task management, providing students and lifelong learners with a smart, secure, and visually intuitive roadmap to boost productivity.

## ✨ Core Features

- **🤖 AI-Driven Task Optimization:** Smart suggestions for study schedules and task prioritization based on user workload (Upcoming).
- **📊 Interactive Gantt Chart:** Visualize your study roadmap with a dynamic and interactive timeline interface using `gantt-task-react`.
- **📅 Google Calendar Integration:** Bi-directional synchronization (or direct push) of MindHub tasks to your personal Google Calendar.
- **🔒 Secure by Design:** Robust authentication and Row Level Security (RLS) powered by Supabase to ensure your private study data remains yours.
- **⚡ Modern UI/UX:** Built with Tailwind CSS v4 and Shadcn/UI for a clean, accessible, and highly responsive web-first experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router & Server Actions)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Integrations:** Google Calendar API, Google OAuth
- **Visualization:** [gantt-task-react](https://github.com/MaTeMaTuK/gantt-task-react)

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- A Supabase project
- A Google Cloud Console project (for Google Calendar API and OAuth credentials)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/mindhub-ai-scheduler.git
    cd mindhub-ai-scheduler
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install / pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    # Supabase configuration
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

    # Google OAuth & Calendar API
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗺️ Roadmap

- [x] Project Initialization & Tech Stack Setup
- [ ] Task Management (CRUD operations)
- [ ] Timeline/Gantt Chart visualization implementation
- [ ] Google Calendar sync integration (Push from MindHub)
- [ ] Secure authentication with Supabase and Google OAuth
- [ ] AI integration for schedule optimization
- [ ] _Out of Scope for v1: Mobile app, Outlook/Apple Calendar integration, Real-time collaborative editing._

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/mindhub-ai-scheduler/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
