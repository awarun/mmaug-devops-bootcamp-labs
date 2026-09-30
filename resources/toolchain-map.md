# DevOps Toolchain Map

A toolchain passes changes, artifacts, evidence, and operational signals between people and automated systems.

| Lifecycle concern | Tool in this lab | Input | Output or evidence |
| --- | --- | --- | --- |
| Source control | Git | Working files | Versioned commits and branches |
| Collaboration | GitHub | Git commits | Pull requests, reviews, issues |
| Dependencies and scripts | npm | `package.json`, lock file | Installed tools and repeatable commands |
| Code quality | ESLint | JavaScript source | Lint findings and exit status |
| Automated testing | Node test runner | Source and test cases | Pass/fail results |
| Build | `scripts/build.mjs` | Validated source | `dist/` artifact |
| CI/CD orchestration | GitHub Actions | Events and workflow YAML | Logs, status checks, artifacts, deployments |
| Static hosting | GitHub Pages | Pages artifact | Public website and deployment record |
| Packaging/runtime | Docker | `Dockerfile` and repository context | Immutable container image |
| Local orchestration | Docker Compose | `compose.yaml` | Configured running service |
| Dependency maintenance | Dependabot | Manifests and workflow references | Update pull requests and alerts |
| Operations signal | `/health`, JSON logs | Runtime requests and process state | Health status and diagnostic events |

## Tools discussed but not required

| Concern | Common examples | Why teams use it |
| --- | --- | --- |
| Planning | GitHub Issues, Azure Boards, Jira | Make work, ownership, and progress visible |
| Artifact registry | GitHub Container Registry, Azure Container Registry | Store and control access to versioned packages and images |
| Infrastructure as code | Bicep, Terraform, OpenTofu | Review and reproduce infrastructure changes |
| Configuration | Ansible, cloud-init | Apply consistent host and service configuration |
| Secrets | Azure Key Vault, GitHub environments | Keep credentials out of code and limit access |
| Security | CodeQL, Trivy, Microsoft Defender for Cloud | Find code, dependency, image, and cloud risks |
| Observability | OpenTelemetry, Azure Monitor, Prometheus, Grafana | Correlate logs, metrics, and traces |

Tool names change. The lifecycle needs—traceability, repeatability, fast feedback, safe delivery, and observable operation—remain.
