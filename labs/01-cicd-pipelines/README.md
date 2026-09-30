# Lab 1 — Fundamentals of DevOps CI/CD Pipelines

- **Session:** 5 October 2026, 18:00–20:00 Malta time
- **Speaker:** Balogun James
- **Level:** Beginner
- **Hands-on time:** About 80 minutes

## What you will build

You will take a small web application through a delivery pipeline:

```text
code change → pull request → lint and test → build artifact → deployment
```

You will deliberately break a test, use the pipeline log to locate the failure, repair it, and deploy the verified application to GitHub Pages.

## Learning objectives

By the end of the lab, you can:

- distinguish CI, continuous delivery, and continuous deployment;
- identify triggers, jobs, runners, steps, artifacts, gates, and environments;
- run the same checks locally and in GitHub Actions;
- use a pull request and automated checks as a quality gate;
- diagnose a failed test from a workflow log; and
- enable a controlled deployment to GitHub Pages.

## Prerequisites and setup

### Accounts and software

- A free GitHub account with a verified email address
- Git 2.40 or later
- Node.js 24 LTS (npm is included)
- A code editor and modern browser

Check your terminal before the session:

```bash
git --version
node --version
npm --version
```

Expected: Git 2.40+, Node `v24.x`, and npm 11+. If your exact npm minor version differs, continue.

### Create your lab copy

1. Open the [source repository](https://github.com/balop3e/mmaug-devops-bootcamp-labs).
2. Select **Fork**, keep the default repository name, and create the fork.
3. In your fork, open **Actions** and select **I understand my workflows, go ahead and enable them** if GitHub displays that prompt.
4. Select **Code**, copy the HTTPS URL, then run:

```bash
git clone https://github.com/YOUR-USERNAME/mmaug-devops-bootcamp-labs.git
cd mmaug-devops-bootcamp-labs
npm ci
npm run check
```

Replace `YOUR-USERNAME` with your GitHub username. Do not clone the instructor's copy if you want to push changes.

## Before you type: the three terms

- **Continuous integration (CI)** frequently combines changes and runs automated feedback such as linting, tests, and builds.
- **Continuous delivery** keeps a verified release ready, while a person or approval gate decides when production changes.
- **Continuous deployment** automatically releases every change that passes all required gates.

This repository starts in continuous delivery mode: CI always runs, but deployment stays off until you explicitly enable the repository variable `ENABLE_PAGES`.

## Exercise 1 — Establish the local quality gate (10 minutes)

1. Install the exact versions recorded in `package-lock.json`:

   ```bash
   npm ci
   ```

2. Run the complete quality gate:

   ```bash
   npm run check
   ```

3. Start the built application:

   ```bash
   npm start
   ```

4. Open <http://localhost:3000>, use **Run next stage**, and verify all four stages can complete.
5. Stop the server with `Ctrl+C`.

**Checkpoint:** linting passes, four tests pass, `dist/` exists, and the application loads.

## Exercise 2 — Trace the pipeline as code (10 minutes)

Open `.github/workflows/ci-cd.yml` and find:

| Pipeline idea | Where it appears |
| --- | --- |
| Trigger | `on` |
| Independent work unit | `jobs` |
| Hosted build machine | `runs-on` |
| Ordered command or reusable action | `steps` |
| Quality checks | `npm run lint` and `npm test` |
| Deployable output | `dist/` uploaded as an artifact |
| Quality gate | `deploy` needs `validate-and-build` |
| Deployment switch | `vars.ENABLE_PAGES == 'true'` |

Answer before continuing: if the test step fails, will the build artifact be uploaded? Why?

## Exercise 3 — Deliver a change through a pull request (20 minutes)

1. Create a branch:

   ```bash
   git switch -c feature/update-message
   ```

2. In `public/index.html`, change the sentence `Learn by shipping.` to a short message of your own.
3. Validate the change:

   ```bash
   npm run check
   git status
   ```

4. Commit and push:

   ```bash
   git add public/index.html
   git commit -m "Update pipeline lab message"
   git push -u origin feature/update-message
   ```

5. Open the URL shown by Git or visit your fork on GitHub. Create a pull request from `feature/update-message` into `main`.
6. Open the pull request's **Checks** section, select the workflow, and identify each completed step.

**Checkpoint:** the `Test and build` check is green and the run contains an artifact named `website-<commit-sha>`.

## Exercise 4 — Observe and repair a controlled failure (15 minutes)

The failure in this exercise is intentional.

1. Open `test/pipeline.test.mjs`.
2. In the first test, change the expected progress for two stages from `50` to `51`.
3. Commit and push the broken expectation:

   ```bash
   git add test/pipeline.test.mjs
   git commit -m "Lab: demonstrate a failing quality gate"
   git push
   ```

4. Open the new workflow run. Expand **Run unit tests** and locate the expected and actual values.
5. Restore `51` to `50`, then validate and push the repair:

   ```bash
   npm test
   git add test/pipeline.test.mjs
   git commit -m "Fix pipeline progress expectation"
   git push
   ```

**Checkpoint:** the earlier run remains red as evidence; the latest run is green. A failed run is useful feedback, not a failed learner.

## Exercise 5 — Inspect the immutable build output (10 minutes)

1. Open the latest successful workflow run.
2. At the bottom of the run summary, download the `website-<commit-sha>` artifact.
3. Extract it and locate `index.html` and `build-info.json`.
4. Open `build-info.json` and compare `commit` with the workflow run's commit.

The artifact links a build to its source revision. In a larger system, the same verified package should be promoted through environments instead of rebuilt differently for each one.

## Exercise 6 — Enable the CD stage (15 minutes)

Do this in **your fork**, not the instructor repository.

1. Merge your green pull request into `main`.
2. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **Settings → Secrets and variables → Actions → Variables**.
4. Create a repository variable named `ENABLE_PAGES` with value `true`. This is a non-secret feature switch; do not create it under Secrets.
5. Open **Actions → CI/CD Pipeline**, select **Run workflow**, keep `main`, and run it.
6. Watch `Test and build` complete before `Deploy to GitHub Pages` starts.
7. Open the deployment URL shown in the run or repository **Environments** panel.

**Checkpoint:** your public page displays your updated footer message.

## Evidence of completion

Save these in your personal bootcamp notes:

- the URL of your pull request;
- the URL of one failed run and the later successful run;
- the deployed GitHub Pages URL; and
- one sentence explaining the gate between validation and deployment.

## Stretch exercises

Choose one if time remains:

1. Add a fifth unit test for `pipelineState` and watch CI validate it.
2. Add a required reviewer to the `github-pages` environment, if your repository plan exposes that setting, and explain how it changes continuous deployment into continuous delivery.
3. Add a workflow summary step that writes test/build information to `$GITHUB_STEP_SUMMARY`.

## Cleanup

This lab creates no paid cloud resources.

- Stop `npm start` with `Ctrl+C`.
- Remove generated files with `npm run build` only when you need them again; `dist/` is ignored by Git.
- To disable the website, set `ENABLE_PAGES` to `false` or delete the variable, then disable Pages in **Settings → Pages**.
- To remove your entire practice copy, open the fork's **Settings → General → Danger Zone → Delete this repository**. This is optional and permanent.
- Workflow artifacts expire after seven days by repository configuration; you can also delete them from the workflow run summary.

Continue with [Lab 2 — DevOps Tooling](../02-devops-tooling/README.md) on 13 October.
