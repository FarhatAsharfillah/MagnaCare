# 🌿 Magna Care - Skincare E-Commerce

Magna Care is a full-stack e-commerce web application dedicated to providing high-quality skincare products. Built with a modern tech stack, this project features a seamless user interface, a robust backend API, and a secure cloud database integration.

🌐 **Live Demo:** [https://magna-care.vercel.app/](https://magna-care.vercel.app/)

## 🚀 Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS (Deployed on Vercel)
* **Backend:** Node.js, Express.js (Deployed on Render)
* **Database:** MySQL (Hosted on Aiven Cloud)
* **Version Control:** Git & GitHub

## ✨ Key Features

* **Product Catalog:** Browse a variety of skincare products fetched dynamically from the database.
* **Shopping Cart & Checkout:** Seamless end-to-end checkout flow storing order data securely.
* **Contact & Consultation:** Integrated contact form and Calendly booking system for dermatological consultations.
* **Responsive Design:** Optimized for both desktop and mobile experiences.

## 🛠️ Local Installation

To run this project locally on your machine, follow these steps:

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/FarhatAsharfillah/MagnaCare.git
cd MagnaCare
\`\`\`

**2. Setup Backend**
\`\`\`bash
cd backend
npm install
# Create a .env file and add your Aiven MySQL password: DB_PASSWORD=your_password
node server.js
\`\`\`

**3. Setup Frontend**
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`