Deployment Link

- https://antigravity-ide-testing-vathanaksol8782-ed9uzpq3.apn.leapcell.dev/ [Leapcell]

- https://antigravity-ide-testing.vercel.app/ [Vercel]

## 🚀 Getting Started

Follow these steps to set up the project locally with Neon Database.

### 1. Clone & Install
```bash
git clone <repository-url>
cd antigravity-ide-testing
npm install
```

### 2. Set up Neon Database
1. Go to [Neon Console](https://console.neon.tech) and create a new project.
2. Copy the **Connection String** (PostgreSQL).

### 3. Configure Environment
1. Create a `.env` file in the root directory (copy from `.env.example`).
   ```bash
   cp .env.example .env
   ```
2. Paste your connection string into `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xyz.region.neon.tech/neondb?sslmode=require"
   ```

### 4. Initialize Database
Generate the Prisma client and push the schema to your Neon database:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to DB
npx prisma db push
```

### 5. Seed Data (Optional)
To populate the database with initial data:

```bash
# Run the seed script
npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/addNewData.ts
```

### 6. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app.