# 🗞️ Tongue API  
A complete, secure, and scalable **RESTful backend** built with **Node.js**, **Express**, and **MySQL**.  
Developed as the main project for the **Node.js course** of the “Full Stack Development and AI” Master by start2impact.

This API manages **users**, **posts**, and **social interactions** (likes and comments), and includes analytical endpoints, secure SQL queries, filters, and automated testing.

---

## 🔗 Try It Locally!

Follow the instructions below to set up and run the API on your machine.

---

## 🎯 Project Goal

The objective of this project was to build a fully functional **RESTful JSON API**, capable of:

- Managing users and their demographic information  
- Creating and organizing posts  
- Tracking interactions such as likes and comments  
- Filtering posts by date  
- Aggregating interactions per post  
- Filtering interactions by **city** and **date**  
- Ensuring **database security** through prepared SQL statements  
- Running **automated tests** (unit tests + end‑to‑end Bash script)

The project uses a clean **MVC architecture**, ensuring maintainability and scalability.

---

## ✨ Implemented Features

### 👥 Users  
- Create, update, delete users  
- Fields: **nickname**, **age**, **city**

### 📝 Posts  
- Create, update, delete posts  
- Filter posts by date  
- Retrieve simple or aggregated lists  
- Fields: **title**, **created_at**

### ❤️ Interactions  
- Create, update, delete interactions  
- Filter by city + interaction date  
- Fields: **type**, **interaction_time**, **user_id**, **post_id**

### 📊 Analytics  
- `/api/posts/aggregated` → interaction count per post (likes/comments)  
- `/api/interactions/filter` → aggregated interactions by city & date  

### 🔒 Security  
- All MySQL queries use **prepared statements**  
- Resistant to SQL Injection  
- Sanitized and validated parameters  

---

## 🧪 Automated Testing

The project provides **two types of tests**:

---

### 1) ✅ End-to-End Testing (Bash Script)

A full automated workflow test using `curl`:

```
./test_api.sh
```

This script performs:

1. **User creation** → checks 201  
2. **Post creation** → checks 201  
3. **Interaction creation** → checks 201  
4. **Post aggregation check**  
5. **Post filtering by date**  
6. **Interaction filtering by city/date**  
7. Automatic success/failure reporting  

Requirements:

- API running locally  
- bash + curl installed (Git Bash on Windows works)

---

### 2) 🧪 Unit Testing (Mocha + Sinon)

Located in:

```
test/
 ├── post.test.js
 ├── user.test.js
 └── interaction.test.js
```

These tests:

- Stub MySQL using **Sinon**
- Validate model logic without hitting the real database  
- Test CRUD behavior in isolation  
- Check error handling and edge cases  

Run with:

```
npm test
```

---

## 🛠️ Technologies Used

- **Node.js**  
- **Express.js**  
- **MySQL + mysql2**  
- **dotenv**  
- **Mocha & Sinon** (unit tests)  
- **cURL + Bash** (end‑to‑end tests)  
- **Nodemon**

---

## 🚀 How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/sadsotti/tongue-api.git
```

### 2. Enter the project

```bash
cd tongue-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the database

Make sure MySQL is running (e.g., XAMPP), then import:

```sql
CREATE DATABASE tongue;
USE tongue;
SOURCE migrations.sql;
```

### 5. Create your `.env` file

Use `.env.example` as reference:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=tongue
```

### 6. Start the server

```bash
npm run dev
```

Expected:

```
Server running on port 3000
```

### 7. Run automated E2E tests

```bash
./test_api.sh
```

### 8. Run unit tests

```bash
npm test
```

---

## 📂 Project Structure

```
tongue-api/
 ├── src/
 │   ├── config/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   └── app.js
 ├── test/
 │   ├── post.test.js
 │   ├── user.test.js
 │   └── interaction.test.js
 ├── migrations.sql
 ├── test_api.sh
 ├── server.js
 ├── package.json
 └── .env.example
```

---

## 🔌 Available Endpoints

### 👥 Users  
| Method | Endpoint           | Description |
|--------|--------------------|-------------|
| POST   | `/api/users`       | Create user |
| PUT    | `/api/users/:id`   | Update user |
| DELETE | `/api/users/:id`   | Delete user |

---

### 📝 Posts  
| Method | Endpoint                     | Description |
|--------|------------------------------|-------------|
| POST   | `/api/posts`                 | Create post |
| GET    | `/api/posts`                 | Simple list |
| GET    | `/api/posts/filter?date=`    | Filter by date |
| GET    | `/api/posts/aggregated`      | Aggregated analytics |
| PUT    | `/api/posts/:id`             | Update post |
| DELETE | `/api/posts/:id`             | Delete post |

---

### ❤️ Interactions  
| Method | Endpoint                                | Description |
|--------|-----------------------------------------|-------------|
| POST   | `/api/interactions`                     | Create interaction |
| PUT    | `/api/interactions/:id`                 | Update interaction |
| DELETE | `/api/interactions/:id`                 | Delete interaction |
| GET    | `/api/interactions/filter?city=&date=`  | Filter by city/date |

---

## 🔗 Useful Links

- https://www.start2impact.it/  
- https://linkedin.com/in/lorenzo-sottile  

---

Ready for further extensions such as authentication, dashboards, or integration with mobile/web apps.
