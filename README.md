# my-node-app

A static web page server with Jenkins CI/CD pipeline.

## Project Structure

```
my-node-app/
├── server.js          ← Node.js HTTP server
├── public/
│   └── index.html     ← Your web page (edit this to see changes!)
├── test/
│   └── server.test.js ← Smoke test
├── Jenkinsfile        ← CI/CD pipeline
├── package.json
└── .gitignore
```

## Run Locally

```bash
npm start
# Open http://localhost:3000
```

## Jenkins Setup (one-time)

1. Make sure Node.js is installed on your Jenkins agent.
2. Push this project to a Git repo (GitHub, GitLab, Bitbucket, etc.).
3. In Jenkins → **New Item** → **Pipeline**.
4. Under **Pipeline**, set **Definition** to `Pipeline script from SCM`.
5. Set your repo URL and branch.
6. Set **Script Path** to `Jenkinsfile`.
7. Click **Save**, then **Build Now**.

## How to See Your Changes

1. Edit `public/index.html`
2. Commit and push to your repo
3. Jenkins will automatically (or manually) trigger a build
4. Watch the **Console Output** in Jenkins for logs
5. Open **http://localhost:3000** in your browser to see the live result

## Pipeline Stages

| Stage | What it does |
|---|---|
| Checkout | Pulls your latest code |
| Install | Runs `npm install` |
| Test | Runs smoke test |
| Deploy | Starts the server (kills old instance first) |
| Verify | Curls localhost to confirm HTTP 200 |