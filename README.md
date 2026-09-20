# Delhi Metro Fleet System — Full Stack Setup Guide

Ye project 2 parts mein hai:

```
metro-fleet-system/
├── backend/     -> Spring Boot + MySQL REST API
├── frontend/    -> Static HTML/CSS/JS dashboard (already connected to backend)
└── Metro-Fleet-System.postman_collection.json
```

Target achieve ho gaya hai: **Frontend → API → Backend → Database**

---

## STEP 1: MySQL me schema run karo

```bash
mysql -u root -p < backend/database/schema.sql
```

Ye `metro_fleet_db` database banayega, saari tables ke saath.

## STEP 2: Sample data run karo

```bash
mysql -u root -p < backend/database/sample_data.sql
```

## STEP 3: application.properties me apna MySQL password daalo

File: `backend/src/main/resources/application.properties`

```
spring.datasource.username=root
spring.datasource.password=your_mysql_password   <-- ISE CHANGE KARO
```

## STEP 4: Backend run karo

```bash
cd backend
mvn spring-boot:run
```

Backend `http://localhost:8080` par chalega.

## STEP 5: Frontend open karo

`frontend/login.html` ko seedha browser mein double-click karke kholo
(ya kisi bhi local server se serve karo, jaise VS Code "Live Server").

**Login credentials** (sample_data.sql se):
- Username: `admin`
- Password: `admin123`

Login karne ke baad Dashboard → Stations → Routes → Trains → Schedule →
Planning → Reports — sab pages backend se live data lete hain.

---

## API Endpoints (sab `/api` prefix ke saath, base: `http://localhost:8080`)

| Resource  | GET (all)         | GET (one)             | POST            | PUT                 | DELETE              |
|-----------|--------------------|------------------------|------------------|----------------------|----------------------|
| Stations  | `/api/stations`    | `/api/stations/{id}`   | `/api/stations`  | `/api/stations/{id}` | `/api/stations/{id}` |
| Routes    | `/api/routes`      | `/api/routes/{id}`     | `/api/routes`    | `/api/routes/{id}`   | `/api/routes/{id}`   |
| Trains    | `/api/trains`      | `/api/trains/{id}`     | `/api/trains`    | `/api/trains/{id}`   | `/api/trains/{id}`   |
| Schedules | `/api/schedules`   | `/api/schedules/{id}`  | `/api/schedules` | `/api/schedules/{id}`| `/api/schedules/{id}`|
| Planning  | `/api/planning`    | `/api/planning/{id}`   | `/api/planning`  | `/api/planning/{id}` | `/api/planning/{id}` |
| Reports   | `/api/reports`     | `/api/reports/{id}`    | `/api/reports`   | -                     | `/api/reports/{id}`  |
| Auth      | -                   | -                       | `/api/auth/login`| -                     | -                     |

Extra: `GET /api/routes/find?start=X&destination=Y` — do stations ke beech
route dhoondhta hai (routes.js ki "Find Route" feature yahi call karta hai).

## STEP 6: Postman mein test karo

`Metro-Fleet-System.postman_collection.json` file ko Postman mein
**Import** karo (File → Import). Isme saare endpoints already ready hain,
bas backend running hona chahiye.

---

## IMPORTANT NOTE — Database Team ki asli schema

Maine `backend/database/schema.sql` tumhare **frontend ke actual fields**
ke hisaab se banaya hai (kyunki tumhare Database Team ki asli
`schema.sql` abhi tak nahi mili thi). Jab wo file mil jaye:

1. Uska `database/schema.sql` yahan is folder mein replace kar do.
2. Column names compare karo humare schema se.
3. Agar names/types different hain, to sirf `backend/src/main/java/com/metro/fleet/entity/`
   wale files mein `@Column(name = "...")` update karna hoga — baaki
   sab (Repository, Service, Controller, Frontend) automatically kaam
   karega, kyunki wo sab Entity ke Java field names use karte hain,
   column names nahi.

## Troubleshooting

- **Frontend data nahi dikh raha / "Could not load..." console error**:
  Backend chal raha hai ya nahi check karo (`http://localhost:8080/api/stations`
  browser mein khol ke dekho — JSON aana chahiye).
- **CORS error**: Backend ka `CorsConfig.java` already `/api/**` ke liye
  sab origins allow karta hai, phir bhi issue aaye to backend restart karo.
- **Login fail ho raha hai**: `sample_data.sql` run kiya ya nahi confirm
  karo — usme `admin` / `admin123` user hai.
