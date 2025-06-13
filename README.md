# Node.js Clustering Example

This repository demonstrates how to scale a Node.js app across all CPU cores using the built-in [`cluster`](https://nodejs.org/api/cluster.html) module.

👉 Blog post: [Scaling Your Node.js App: An Introduction to Clustering](https://dev.to/erickengelhardt/scaling-your-nodejs-app-an-introduction-to-clustering-ff7)  

---

## What’s Inside

✅ Simple clustered HTTP server  
✅ Clustered Express app  
✅ Automatic worker restart on crash  
✅ Minimal production-friendly example  
✅ Graceful shutdown pattern (coming soon)  

---

## Motivation

Node.js runs in a **single thread**, but modern CPUs have multiple cores.

By using clustering:
- You can handle more concurrent requests
- You utilize all CPU cores
- You increase app resiliency (one worker can crash without bringing the whole app down)

---

## How to Run

### 1️⃣ Clone the repo

```bash
git clone https://github.com/erickne/node-cluster.git
cd node-cluster
````

### 2️⃣ Install dependencies

```bash
yarn install
# or
npm install
```

### 3️⃣ Run the clustered app

```bash
yarn start
yarn start-express
```

👉 Now visit: [http://localhost:3000](http://localhost:3000)

You’ll see responses from different worker processes (watch the `process.pid`).

---

## How It Works

* The **primary process** forks workers (1 per CPU core)
* Workers each run their own Node.js process + HTTP server
* OS distributes connections across workers
* Primary process watches for worker exits and restarts them if needed

---

## Limitations / Notes

⚠️ No shared in-memory state between workers
⚠️ Each worker is a full Node process → more memory used
⚠️ Graceful shutdown is important (especially for deploys / rolling updates)

---

## License

MIT — use it, fork it, scale it. 🚀
