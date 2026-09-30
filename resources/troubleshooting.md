# Troubleshooting

## `npm ci` reports that the lock file is missing or out of date

Confirm you are in the repository root and that `package-lock.json` exists:

```bash
pwd
git status
```

Use `npm install` only when intentionally changing dependencies. Commit both `package.json` and `package-lock.json` together.

## Port 3000 is already in use

Stop the earlier `npm start` or container. To use another local port for the Node server:

```bash
PORT=3001 npm start
```

PowerShell:

```powershell
$env:PORT=3001; npm start
```

For Docker, change the host side of the mapping: `--publish 3001:3000`.

## The deploy job is skipped

This is expected until all of these are true:

- the event is a push to `main`;
- repository variable `ENABLE_PAGES` is exactly `true`;
- the validation job succeeds.

The variable belongs under **Settings → Secrets and variables → Actions → Variables**, not Secrets.

## GitHub Pages deployment fails

Open **Settings → Pages** and set Source to **GitHub Actions**. Then rerun the failed job. Make sure the workflow has `pages: write` and `id-token: write` permissions; the supplied workflow already does.

## Workflows do not run in a fork

Open the fork's **Actions** tab and enable workflows. GitHub disables them by default in some newly created forks.

## Docker cannot connect to the daemon

Start Docker Desktop or the Docker service, wait until it reports ready, then run `docker info`. On a managed device, virtualization or container use may require administrator support.

## The container name is already in use

Remove the old practice container, then repeat the run command:

```bash
docker rm --force mmaug-pipeline-lab
```

## `curl` behaves differently in Windows PowerShell

Use `curl.exe http://localhost:3000/health` to invoke native curl. `Invoke-RestMethod http://localhost:3000/health` is also suitable.

## Ask for help effectively

Share:

- the exercise and command;
- the exact error text;
- your operating system;
- relevant tool versions; and
- what you already tried.

Remove usernames, repository secrets, tokens, and private URLs before sharing a screenshot or log.
