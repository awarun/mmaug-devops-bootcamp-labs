# MMAUG DevOps Bootcamp Labs

[![CI/CD Pipeline](https://github.com/balop3e/mmaug-devops-bootcamp-labs/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/balop3e/mmaug-devops-bootcamp-labs/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-2ea44f.svg)](LICENSE)

Public, beginner-friendly labs for Balogun James's sessions in the **MMAUG 30-Day AI and DevOps Fundamentals Bootcamp**.

**[View the live sample application](https://balop3e.github.io/mmaug-devops-bootcamp-labs/)**

| Date and time (Malta) | Session | Lab |
| --- | --- | --- |
| 5 October 2026, 18:00–20:00 | Fundamentals of DevOps CI/CD Pipelines | [Live browser lab](LIVE_LAB.md) · [Full follow-on lab](labs/01-cicd-pipelines/README.md) · [Facilitator runbook](FACILITATOR_RUNBOOK.md) |
| 13 October 2026, 18:00–20:00 | DevOps Tooling | [Open the follow-on lab](labs/02-devops-tooling/README.md) |

The labs use a small interactive pipeline dashboard as the workload. Learners validate it locally, watch GitHub Actions build it, deploy it to GitHub Pages, and then package and observe it as a container.

## Learning objectives

By completing the CI/CD session, you will be able to:

1. Explain continuous integration, continuous delivery, and continuous deployment.
2. Trace a change through source, test, build, artifact, and deployment stages.
3. Read a GitHub Actions workflow and diagnose a failed automated check.
4. Use a pull request as a quality gate.
5. Deploy a verified static artifact to GitHub Pages.

By completing the tooling session, you will be able to:

1. Map common tools to the DevOps lifecycle.
2. Use Git, npm, GitHub Actions, and Docker as one connected toolchain.
3. Build and run the same workload reproducibly in a container.
4. inspect a health endpoint and structured application logs.
5. Explain where dependency automation, security scanning, infrastructure as code, and observability fit.

## Prerequisites

Required for the first lab:

- A free [GitHub account](https://github.com/signup)
- Git 2.40 or later
- Node.js 24 LTS and npm
- A modern browser and a code editor such as Visual Studio Code

Additional requirement for the second lab:

- Docker Desktop or Docker Engine with Compose

You do **not** need an Azure subscription, payment card, or paid GitHub plan. See each lab's prerequisites and verification commands before the live session.

## Quick start

```bash
git clone https://github.com/balop3e/mmaug-devops-bootcamp-labs.git
cd mmaug-devops-bootcamp-labs
npm ci
npm run check
npm start
```

Open <http://localhost:3000>. Press `Ctrl+C` in the terminal to stop the server.

## Repository map

```text
.
├── .github/workflows/ci-cd.yml   # Automated validation and gated Pages deployment
├── LIVE_LAB.md                    # 35-minute browser-only session exercise
├── FACILITATOR_RUNBOOK.md         # Presenter script, timings and recovery guidance
├── labs/
│   ├── 01-cicd-pipelines/        # Day 5 guided lab
│   └── 02-devops-tooling/        # Day 13 guided lab
├── public/                        # Sample application source
├── scripts/build.mjs              # Repeatable build step
├── test/                          # Automated unit tests
├── Dockerfile                     # Multi-stage container build
├── compose.yaml                   # Local container configuration
└── resources/                     # Reference and troubleshooting material
```

## Validation

Run the same quality gate used in continuous integration:

```bash
npm run check
```

A successful run lints the code, runs four unit tests, and produces `dist/`. The workflow stores that directory as a short-lived build artifact.

## Cost and cleanup

These labs use local tools, GitHub Actions on a public repository, and GitHub Pages. They do not create billable cloud resources. GitHub usage remains subject to your account's current limits.

Cleanup instructions are included at the end of each lab. They cover the local Node.js process, generated files, Docker containers and images, GitHub Pages, and optional learner forks.

## Help and conduct

- Start with the [troubleshooting guide](resources/troubleshooting.md).
- Ask questions during the session; copy the exact error message when possible.
- Never paste tokens, passwords, cloud keys, or `.env` contents into an issue or screenshot.
- Participation is governed by the [MMAUG Code of Conduct](https://mmaug.com/code-of-conduct).

## License

Code and written lab material are provided under the [MIT License](LICENSE).
