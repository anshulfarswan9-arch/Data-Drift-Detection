# 📊 Data Drift Detection System

A full-stack monitoring tool that detects statistical drift between a reference dataset and live production data — built to simulate how ML teams catch model/data decay in real-world systems.

## 🚀 Features
- Statistical drift detection using the Kolmogorov-Smirnov (KS) test
- Column-by-column drift scores and p-values
- REST API built with FastAPI
- Interactive dashboard built with Next.js to visualize drift results
- Synthetic dataset simulating a real-world market shift (loan/credit data)

## 🛠️ Tech Stack
**Backend:** Python, FastAPI, Pandas, SciPy
**Frontend:** Next.js, React, Tailwind CSS, Recharts, Framer Motion

## 📊 How It Works
1. `setup_data.py` generates two synthetic datasets — a `reference` dataset (normal conditions) and a `production` dataset (simulated after a market shift: lower income, higher loan amounts, higher debt).
2. `monitor.py` compares the distribution of each numeric column between the two datasets using the **Kolmogorov-Smirnov test**, which detects differences in the full distribution shape — not just the average.
3. If a column's p-value is below 0.05, it's flagged as **drifted**.
4. The FastAPI backend (`main.py`) exposes this analysis via a `/api/monitor` endpoint.
5. The Next.js frontend calls this endpoint and displays the results.

## ⚙️ How to Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
python setup_data.py
python main.py
```
Backend runs at `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`

## 🔮 Future Improvements
- Add real-time monitoring with scheduled drift checks
- Add email/Slack alerts when drift is detected
- Support categorical column drift (Chi-square test)
- Deploy backend and frontend live (Render + Vercel)

## 👤 Author
Anshul Farswan
