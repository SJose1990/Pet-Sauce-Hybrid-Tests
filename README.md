# Hybrid Pet-Sauce Automation Framework

## Purpose

The purpose of this project is to provide an automated testing solution for both API and Web UI layers. It ensures that the Pet Store API and the SauceDemo web application function correctly across different environments, specifically targeting the Live environment

### Key Features

- **API Testing:** Automated validation of backend endpoints using **Axios** and **Jest**
- **UI Testing:** End-to-end browser automation using **Playwright** and **Jest**
- **Automated Reporting:** Detailed HTML reports with embedded failure screenshots
- **CI/CD Integration:** Automated workflows for **GitHub Actions**

---

## Setup in Development Environment

To set up the project locally, use the automated setup script. This ensures all browsers and dependencies are correctly installed.

### Steps

1. Clone the Repository "https://github.com/SJose1990/Hybrid-Test-Repo.git"
   
2. Open a terminal and run the following commands one by one:
   - Change directory into the just cloned repository
     
   ```bash
   cd local-folder-name
   ```
   - Ensure the set up script has execute permissions
     
   ```bash
   chmod +x ./setup.sh
   ```
   - Run the set up script
     
   ```bash
   ./setup.sh


This script will install pnpm and download all dependencies

## How to Test


### 1. Run UI Tests
Executes the web automation suite using Chrome.

```bash
pnpm test:ui:live
```
### 2. Run API Tests
Executes the web automation suite using Chrome.
```bash
pnpm test:api:live
```

### 3. Run API && UI Tests
Executes the API tests.
```bash
      pnpm test:all:live
```

### 4. Viewing Results
- HTML Report: After tests finish, open ./test-output/report.html in your browser. 
- Screenshots: Any UI failures will save screenshots to ./test-output/attachments/failures/.
- Open Report
```bash
  pnpm open:report
```
## CI/CD Integration (GitHub Actions)

This project is configured to run automated tests on push for the branch.

  
**Node.js Setup**

Installs the required Node.js version.

**Playwright Browsers**

Installed automatically in CI using: npx playwright install --with-deps
   
**Environment Selection**

The test environment (**LIVE** or **QA**) can be provided through environment variables in the workflow YAML.

**Test Execution**

UI and API tests run using **Jest** and **Playwright**. Screenshots and videos are captured automatically for failures.

**Artifacts**

Test reports and attachments are uploaded to **GitHub Actions artifacts**, allowing results to be reviewed even if tests fail.

