# Live Lab — Your First CI Pipeline

- **Time:** 35 minutes
- **Tools:** A web browser and a free GitHub account
- **Goal:** Change one sentence and watch automation check your work

You do not need to install Git, Node.js, Docker, or a code editor for this exercise. If you do not have a GitHub account, work with a partner and take turns explaining what you see.

## What will happen

```text
You change a file → GitHub records the change → the pipeline checks it → you see the result
```

## Part 1 — Create your practice copy

1. Open <https://github.com/balop3e/mmaug-devops-bootcamp-labs>.
2. Select **Use this template**, then **Create a new repository**.
3. Choose your GitHub account as the owner.
4. Keep the suggested repository name or enter `my-first-cicd-pipeline`.
5. Select **Public**, then **Create repository**.

Your copy is safe to change. You cannot damage the instructor's repository.

## Part 2 — Enable the pipeline

1. Open the **Actions** tab in your new repository.
2. If GitHub displays a workflow warning, select **I understand my workflows, go ahead and enable them**.
3. Open **CI/CD Pipeline** in the left-hand list.

The workflow file already describes the repeatable checks. You will trigger it by committing a change.

## Part 3 — Make one visible change

1. Return to the **Code** tab.
2. Open `public`, then open `index.html`.
3. Select the pencil icon, **Edit this file**.
4. Find this sentence near the bottom:

   ```text
   Learn by shipping.
   ```

5. Replace it with:

   ```text
   I [insert-your-name] completed my first CI pipeline.
   ```

6. Select **Commit changes**.
7. Enter `Update my pipeline message` as the commit message, then confirm the commit.

## Part 4 — Watch the automated checks

1. Open the **Actions** tab.
2. Open the newest **CI/CD Pipeline** run.
3. Select the **Test and build** job.
4. Watch the pipeline install dependencies, lint the code, run four tests, build the website, and upload an artifact.
5. Wait for the green check mark.

## Success check

You have completed the live lab when:

- the workflow run has a green check mark;
- the four tests passed; and
- the run summary contains an artifact beginning with `website-`.

Take a screenshot of the green run or save its URL in your bootcamp notes.

## If your run fails

A red cross means the pipeline found something that needs attention. Open the first red step and read the last few lines. Ask your partner or facilitator what the message tells you. You have still completed the most important part of the exercise: you used automated feedback.

## Continue after the session

The [full CI/CD lab](labs/01-cicd-pipelines/README.md) continues from this point. It shows how to create a pull request, investigate an intentional test failure, inspect an artifact, and deploy the website to GitHub Pages.

The [DevOps Tooling lab](labs/02-devops-tooling/README.md) later introduces Docker, health checks, application logs, and dependency automation.

## Cleanup

This activity creates no paid cloud resources. Keep the repository as evidence of your work, or delete it later from **Settings → General → Danger Zone → Delete this repository**.
