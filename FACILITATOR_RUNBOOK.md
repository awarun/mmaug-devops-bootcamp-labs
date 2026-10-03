# Facilitator Runbook: Fundamentals of DevOps CI/CD Pipelines

This runbook is for the **5 October 2026** session. It explains how the two CI/CD labs fit together and gives you a safe, beginner-friendly way to demonstrate them.

## The two labs have different jobs

| Lab | Purpose | Who performs it during the session? | Time |
| --- | --- | --- | --- |
| [Live browser lab](LIVE_LAB.md) | Give every learner a first successful CI experience | You demonstrate each small step, then learners repeat it | 35 minutes |
| [Full follow-on lab](labs/01-cicd-pipelines/README.md) | Add local tools, branches, pull requests, failure diagnosis, artifacts and deployment | You demonstrate two highlights; learners complete the full lab later | About 80 minutes independently |

Do **not** try to complete the full follow-on lab with everyone during the two-hour session. The live lab is the promised hands-on experience. The full lab is the next challenge for learners who want to continue.

## The story you are teaching

Use this sentence throughout the session:

> A developer changes something, automation checks it, creates a usable result, and only a verified result is allowed to reach users.

The repository demonstrates that story:

```text
Change code -> Commit -> GitHub Actions -> Lint -> Test -> Build -> Artifact -> Deploy
                                      stop here if a check fails -----^
```

### Beginner-friendly definitions

| Term | Plain-language explanation |
| --- | --- |
| Repository | The project's shared folder, including its history |
| Commit | A named checkpoint or saved version of the project |
| Workflow | Written instructions telling automation what to do |
| Runner | A temporary computer that GitHub provides to run the instructions |
| Job | A related group of automated steps |
| Lint | A check for suspicious or inconsistent code |
| Test | A check that asks, “Does this still behave as expected?” |
| Build | Turning source files into a result ready to distribute |
| Artifact | The saved output produced by a run |
| Deploy | Making a verified result available to users |

## Prepare before the session

Complete this checklist before learners join:

- Sign in to GitHub in the browser you will share.
- Create a disposable public repository from this template. A clear name is `cicd-live-demo-2026`.
- Open these tabs in advance:
  - this runbook;
  - the [live lab](LIVE_LAB.md);
  - the disposable repository's **Code** tab;
  - the disposable repository's **Actions** tab;
  - the [working sample site](https://balop3e.github.io/mmaug-devops-bootcamp-labs/).
- Increase browser zoom so text is readable on the call.
- Turn off pop-ups and unrelated notifications.
- Keep the original repository unchanged as your fallback.
- Put the live lab URL in the meeting chat before the hands-on starts.
- Rehearse the live lab once using the disposable repository.

For the deployment demonstration, either use the original repository, where Pages is already working, or prepare a second disposable repository with Pages and the `ENABLE_PAGES` variable configured. Do not configure these settings for the first time while learners are waiting.

## Recommended two-hour flow

| Time | Activity |
| --- | --- |
| 0–15 min | Welcome, remove fear, explain the outcome and use a simple delivery analogy |
| 15–40 min | DevOps, CI, delivery and deployment fundamentals |
| 40–50 min | Read the pipeline diagram and workflow at a high level |
| 50–85 min | Live browser lab: demonstrate, pause, then let learners repeat |
| 85–100 min | Debrief, questions and a short buffer |
| 100–112 min | Instructor demonstration: deliberately fail a test, then repair it |
| 112–118 min | Instructor demonstration: show the verified site being deployed |
| 118–120 min | Recap and explain the follow-on assignment |

If earlier discussion runs long, protect the **35-minute live lab**. Shorten the failure or deployment demonstration instead of rushing the learners.

## Demo 1: live browser lab — everyone follows

Use an “I do, we do, you do” rhythm:

1. Tell learners what the next action achieves.
2. Demonstrate it on your screen.
3. Stop sharing or leave the instruction visible while they repeat it.
4. Ask for a reaction or chat message when they see the expected result.
5. Help anyone who is blocked, then continue.

### 0–5 minutes: introduce the mission

**Say:**

> We will make one visible change. Saving it will automatically start a set of checks. Nobody needs to install software or understand the code today. Our goal is to experience the pipeline and understand what it is doing for us.

Share the [live lab](LIVE_LAB.md). Ask learners without a GitHub account to pair with someone rather than miss the exercise.

### 5–10 minutes: create a personal copy

On the template repository:

1. Select **Use this template**.
2. Select **Create a new repository**.
3. Choose the learner's account as owner.
4. Give the repository a simple name such as `my-first-cicd-pipeline`.
5. Select **Public**.
6. Select **Create repository**.

**Explain:** Their repository is an independent copy. They can experiment without changing your original project.

**Pause:** Wait until most learners can see the new repository's files.

### 10–13 minutes: confirm automation is available

Open **Actions**. If GitHub displays an enablement prompt, select the button that enables or acknowledges workflows.

**Explain:** Workflow files are already in `.github/workflows/`. GitHub reads those instructions whenever a matching event occurs.

### 13–20 minutes: make and commit one change

1. Return to **Code**.
2. Open `public`, then `index.html`.
3. Select the pencil icon to edit the file.
4. Find `Learn by shipping.`.
5. Replace it with `I completed my first CI pipeline.`.
6. Select **Commit changes**.
7. Use the message `Update my pipeline message`.
8. Commit directly to `main` for this first exercise.

**Say before committing:**

> A commit is a checkpoint. This particular checkpoint is also the event that wakes up our pipeline.

**Expected result:** GitHub returns to the repository and a yellow dot may appear briefly while checks run.

### 20–28 minutes: watch the pipeline

1. Open **Actions**.
2. Open the newest **CI/CD Pipeline** run.
3. Open the **Test and build** job.
4. Expand the steps as they run.

Translate the steps into this story:

- **Checkout**: bring the project onto the runner.
- **Setup Node**: prepare the required tool.
- **Install dependencies**: fetch the project's declared packages.
- **Lint**: check code quality.
- **Test**: verify expected behavior; four tests should pass.
- **Build**: create the distributable website in `dist/`.
- **Upload artifact**: save that output after the runner disappears.

**Expected result:** **Test and build** becomes green.

The **Deploy** job will normally show as **skipped** in each learner's new repository. This is expected because `ENABLE_PAGES` has not been set to `true`. A skipped deployment is not a failed pipeline; it is a safety gate.

### 28–33 minutes: find the result

Return to the workflow run summary and find the **Artifacts** section. The artifact name starts with `website-`.

**Explain:** The artifact is evidence that the source passed the checks and produced an output. It is what a later deployment stage can use.

Downloading the artifact is optional during the live exercise. If the interface or network is slow, point it out and continue.

### 33–35 minutes: debrief

Ask these three questions:

1. What event started the pipeline?
2. What would happen if one test failed?
3. Why should deployment wait for validation?

Close with:

> You have just practised continuous integration: a small shared change triggered repeatable automated checks and produced a verified result.

## Demo 2: selected highlights from the full lab

Learners should watch this part. They do not need to repeat it during the call. It gives them a reason to attempt the [full follow-on lab](labs/01-cicd-pipelines/README.md) later.

### Highlight A: make the pipeline fail safely, then repair it

Use the browser in your disposable repository so no terminal knowledge is required for the demonstration:

1. Open `test/pipeline.test.mjs`.
2. Select the pencil icon.
3. Find the expectation containing `50` and change it to `51`.
4. Commit with `Demonstrate a failing test`.
5. Open the new workflow run and show the red **Test** step.
6. Expand the failed step and point to the expected and actual values.
7. Edit the file again, restore `51` to `50`, and commit with `Fix the failing test`.
8. Open the next run and show it becoming green.

**Say:**

> Red is useful information, not a disaster. The pipeline stopped an incorrect change before deployment and told us where to investigate.

Do not debug an unexpected problem live for more than two minutes. Move to the known successful run in the original repository and explain the same pattern there.

### Highlight B: show continuous delivery/deployment

Use your prepared repository with GitHub Pages enabled:

1. Open **Settings** > **Pages**.
2. Under **Build and deployment**, show that **Source** is **GitHub Actions**.
3. Open **Settings** > **Secrets and variables** > **Actions** > **Variables**.
4. Show the repository variable `ENABLE_PAGES` with value `true`. Do not use a secret for this non-sensitive switch.
5. Open **Actions** > **CI/CD Pipeline**.
6. Select **Run workflow**, choose `main`, and run it.
7. Show that **Deploy** waits for **Test and build** because the workflow uses `needs`.
8. After both jobs become green, open the deployment URL.

The **Run workflow** button exists because the workflow contains `workflow_dispatch`, and manual runs use the workflow from the default branch. The Pages source must be configured as **GitHub Actions** for this deployment job.

**Explain the distinction:**

- With the deployment gate disabled, the pipeline performs CI and prepares an artifact.
- With the gate enabled but a person choosing when to release, the process behaves like continuous delivery.
- With every verified `main` change automatically released, it behaves like continuous deployment.

The code can support either release policy; the team's decision determines which one is used.

## What learners do in the follow-on assignment

The full lab deliberately adds one new layer at a time:

1. Run the same lint, test and build checks locally.
2. Use a feature branch and pull request rather than committing to `main`.
3. Cause a controlled test failure and read the diagnostic output.
4. Repair the failure and see the pull-request gate recover.
5. Download and inspect the build artifact.
6. Optionally enable GitHub Pages and deploy the verified output.

This is the same story as the live lab, with professional working habits added around it.

## Common problems and calm recovery

| What the learner sees | Likely cause | What to do |
| --- | --- | --- |
| No workflow run | Actions have not been enabled, or the learner has not committed the edit | Open **Actions** and enable workflows if prompted; then check the commit history |
| Yellow dot for several minutes | The free hosted runner is queued or still working | Pair with a learner whose run has started and return to the delayed run later |
| **Deploy** says skipped | `ENABLE_PAGES` is absent or not `true` | Reassure them: this is the expected result in the live lab |
| **Test and build** is red | The file was edited in an unintended place or a temporary service problem occurred | Open the failed step, read the first useful error, compare the edit with the lab, and retry after correcting it |
| Cannot find the sentence | The learner is in the wrong file | Return to **Code** > `public` > `index.html`, then use the browser's find command |
| Cannot see **Settings** | The learner is viewing your repository rather than their copy, or lacks admin access | Confirm the owner shown at the top of the repository |
| Pages deployment fails | The publishing source is not configured for GitHub Actions | Open **Settings** > **Pages** and select **GitHub Actions** as the source |
| No **Run workflow** button | The workflow is not on the default branch or the wrong workflow page is open | Open **CI/CD Pipeline** on the `main` branch and confirm it contains `workflow_dispatch` |
| No GitHub account | Account creation or verification is incomplete | Let the learner pair with a neighbour and finish independently later |

## Presenter safety net

If GitHub is slow or unavailable:

1. Continue explaining from the workflow file and prepared screenshots or a previously successful run.
2. Show the [working sample site](https://balop3e.github.io/mmaug-devops-bootcamp-labs/).
3. Let learners keep their edit and retry after the session.
4. Do not turn an external service delay into a lesson about command-line troubleshooting.

If time is short, omit the artifact download and the manual deployment run. Keep the commit, green CI result and failure-gate explanation; those are the essential learning outcomes.

## Reset after rehearsal or delivery

- Delete the disposable demo repository only when you no longer need its run history.
- Keep the original public lab repository and sample deployment available for learners.
- Remind learners that deleting their practice repository is optional because the live lab creates no paid cloud resources.
- Point learners to the cleanup section in the full lab before they enable Pages or create additional resources.

## Your final one-minute recap

> CI/CD is not a mysterious product. It is a repeatable path from a change to a trusted result. CI checks every change and gives fast feedback. Delivery keeps a verified result ready for release. Deployment places that result where users can reach it. Today you created a change, triggered checks, read the result and saw how a failed check protects users.

