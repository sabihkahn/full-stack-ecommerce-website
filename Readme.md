
---

## 🖼️ Application Screenshots

### 🏠 Informational Pages
![About Us](img/aboutus.png)
![Contact Us](img/contactus.png)
![Footer](img/footer.png)

---

### 🛍️ Product & Shopping Flow
![Products Panel](img/productspannel.png)
![Product Info](img/productinfo.png)
![Add to Cart](img/addtocart.png)
![Checkout Page](img/checkoutpage.png)

---

### 🛠️ Admin Dashboard & Analytics
![Admin Dashboard](img/adminpanneldash.png)
![Admin Charts](img/admincharts.png)

---

### 📦 Product Management (Admin)
![Create Product](img/createproducts.png)
![Edit Products](img/editproducts.png)
![Edit Single Product](img/editsingleproduct.png)

---

### 🗂️ Category & Order Management
![Manage Categories](img/managecatogries.png)
![Order Panel](img/orderpannel.png)

---

## ⚙️ Environment Variables (Backend)

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_api_key_if_used
▶️ Run Locally (Development)
Backend
cd backend
npm install
node server.js


Backend runs on: http://localhost:3000

Frontend
cd frontend
npm install
npm run dev


Frontend runs on: http://localhost:5173

🏗️ Build for Production
Frontend
npm run build

Backend

Deploy using Vercel, VPS, PM2, or Docker.