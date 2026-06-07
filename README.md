# YOUSUN Amicus

## Financial Twin Agent for Fair Lending and Rescue Before Default

**YOUSUN Amicus** is a two-sided AI agent platform for responsible SME lending. It helps customers submit loan applications with guided support, while bank officers can run financial twin analysis, simulate repayment risk, generate Gemini-powered reports, and create rescue-before-default plans before a borrower reaches default.

**Tagline:**  
**Simulate before lending. Report with fairness. Rescue before default.**

---

## Live Demo

Hosted project URL:

https://yousun-amicus.vercel.app

---

## Demo Accounts

### Bank Officer

```txt
Email: bappy@amicus.ai
Password: demo123
```

### Customer

```txt
Email: rafi@amicus.ai
Password: demo123
```

---

## Problem

Small and medium businesses often have seasonal income, unstable cashflow, limited documentation, and changing repayment capacity. Traditional loan review systems usually make a static approval or rejection decision, but real business risk changes over time.

Banks may approve a loan amount that is too high and push the borrower into repayment stress. They may also reject a borrower without giving a clear and fair explanation.

Most lending systems react after default happens.

YOUSUN Amicus is designed to act earlier.

---

## Solution

YOUSUN Amicus creates a responsible lending journey for both the customer and the bank.

Customers can submit loan applications and receive guidance about required documents. Bank officers can review applications, run agent analysis, generate reports, and create rescue-before-default plans.

The system helps banks make safer decisions while giving borrowers clearer, fairer explanations.

---

## Why This Is Not Just a Chatbot

YOUSUN Amicus does not only answer questions. It performs actions across the lending workflow.

The agent can:

- Read loan application data
- Build a borrower Financial Twin
- Simulate future repayment scenarios
- Recommend a safer loan amount
- Identify risky loan zones
- Generate dynamic EMI guidance
- Create Gemini-powered reports
- Save reports and analyses to MongoDB
- Create rescue-before-default plans

Agent workflow:

```txt
Observe → Understand → Simulate → Recommend → Report → Rescue
```

---

## Core Agent Modules

### 1. Financial Twin Agent

Builds a borrower profile using:

- Requested loan amount
- Existing EMI
- Average monthly sales
- Seasonality
- Business health
- Repayment capacity

### 2. Future Mirror Agent

Simulates possible future scenarios:

- Growth scenario
- Steady scenario
- Stress scenario

This helps the bank understand what may happen after the loan is approved.

### 3. Debt-Trap Shield

Compares the requested loan amount with a safer recommended loan amount and identifies the risky zone.

The goal is to protect both the bank and the borrower from unsafe debt pressure.

### 4. Dynamic EMI Planner

Suggests repayment guidance based on business seasonality and cashflow rhythm.

### 5. Gemini Report Generator

Uses Gemini to generate:

- Bank Officer Credit Memo
- Customer-Friendly Loan Summary
- Rescue Before Default Report

### 6. Rescue Before Default Agent

Creates early support plans before default occurs.

It recommends responsible actions such as:

- Monitoring
- Temporary EMI support
- Customer support action
- Avoiding aggressive first-step recovery

---

## User Roles

### Customer Portal

Customer users can:

- Log in to the customer portal
- Submit new loan applications
- Enter business and loan information
- Select available documents
- Understand why documents are required
- Track application status

Demo customer:

```txt
Rafi Khan
rafi@amicus.ai
```

### Bank Officer Portal

Bank officers can:

- Log in to the bank dashboard
- View loan applications
- Open application details
- Run Amicus Analysis
- View Financial Twin results
- View Future Mirror scenarios
- Generate Gemini reports
- Download PDF reports
- Create rescue-before-default plans

Demo bank officer:

```txt
Bappy
bappy@amicus.ai
```

---

## Demo Scenario

Example loan application:

```txt
Application ID: APP-001
Business: Rahim Fashion House
Requested Loan: BDT 1,500,000
Recommended Loan: BDT 900,000
Risk Level: Medium
Product Type: Working Capital Bridge
Status: AI Review Pending
```

Customer-submitted demo application:

```txt
Customer: Rafi Khan
Business: Rafi Khan Trading
Status: AI Review Pending
```

---

## Key Features

- Two-sided customer and bank officer portal
- Demo login system
- Customer loan application submission
- Application status tracking
- Amicus document guidance
- Bank officer dashboard
- Application review page
- Financial Twin scoring
- Future Mirror stress scenarios
- Debt-Trap Shield safe loan recommendation
- Dynamic EMI planning
- Gemini-powered report generation
- PDF report download
- Rescue Before Default workflow
- Agent Activity Timeline
- MongoDB-backed workflow data
- MongoDB MCP Server proof configuration
- OpenAPI-defined agent tools
- Agent Builder-ready system prompt and workflow documentation

---

## Production API Proof

The deployed production APIs are available at:

```txt
POST https://yousun-amicus.vercel.app/api/agent/loan-review
POST https://yousun-amicus.vercel.app/api/agent/gemini-report
POST https://yousun-amicus.vercel.app/api/agent/rescue-plan
```

The loan-review endpoint returns:

```json
{
  "tool": "runLoanReviewAgent",
  "success": true,
  "databaseSaved": true
}
```

The production APIs have been tested successfully for:

- Loan review agent workflow
- Gemini-powered report generation
- Rescue-before-default plan generation

---

## Technology Stack

- Next.js
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- MongoDB Node.js Driver
- MongoDB MCP Server proof configuration
- Gemini API
- OpenAPI agent tool specification
- Google Cloud Agent Builder-ready workflow
- jsPDF / PDF report download
- Vercel deployment

---

## Architecture

```txt
Customer Portal
   ↓
New Loan Application
   ↓
MongoDB Atlas
   ↓
Bank Officer Dashboard
   ↓
YOUSUN Amicus Agent APIs
   ↓
Financial Twin + Future Mirror + Debt-Trap Shield
   ↓
Gemini Report Generator
   ↓
Reports + PDF Download
   ↓
Rescue Before Default Plan
```

---

## Agent Tool Architecture

YOUSUN Amicus exposes public API tools that can be used for agent orchestration.

### runLoanReviewAgent

```txt
POST /api/agent/loan-review
```

Runs the full Amicus loan review workflow:

- Financial Twin
- Future Mirror
- Debt-Trap Shield
- Dynamic EMI
- Report preparation
- MongoDB analysis storage

### generateGeminiReport

```txt
POST /api/agent/gemini-report
```

Generates Gemini-powered reports:

- Bank Officer Memo
- Customer Summary
- Rescue Report

### createRescuePlan

```txt
POST /api/agent/rescue-plan
```

Creates a rescue-before-default plan using distress signals and responsible recovery rules.

---

## Google Cloud Agent Builder Readiness

YOUSUN Amicus is designed for Google Cloud Agent Builder orchestration.

The project includes:

- Agent Builder system prompt
- OpenAPI tool specification
- Public tool endpoints
- MongoDB-backed workflow
- Gemini-powered report generation

Agent Builder assets:

```txt
docs/agent-builder-system-prompt.md
docs/agent-builder-workflow.md
docs/agent-builder-proof.md
docs/openapi-agent-tools.yaml
```

Public tool server:

```txt
https://yousun-amicus.vercel.app
```

Available tools:

```txt
runLoanReviewAgent
createRescuePlan
generateGeminiReport
```

Due to Google Cloud billing limitations during deployment, the working demo is hosted on Vercel. The repository includes Agent Builder-ready OpenAPI tools, system prompt, and proof documentation for judging and testing.

---

## MongoDB Partner Track / MCP Integration

YOUSUN Amicus is submitted under the MongoDB partner track.

The live application uses MongoDB Atlas as the system of record for:

- Loan applications
- Agent analyses
- Generated reports
- Rescue-before-default plans

MongoDB MCP Server proof files:

```txt
docs/mongodb-mcp-config.example.json
docs/mongodb-mcp-proof.md
docs/mongodb-mcp-tool-map.md
agent/mongodb_mcp_agent.md
```

The MongoDB MCP Server connects to the same Atlas-backed data layer using:

```txt
MDB_MCP_CONNECTION_STRING
```

For safety, the proof configuration uses read-only mode.

The MCP layer can inspect the same workflow data used by the deployed YOUSUN Amicus application:

```txt
loan_applications
agent_analyses
reports
rescue_plans
```

---

## MongoDB Collections

### loan_applications

Stores customer and bank-created loan applications.

### agent_analyses

Stores Financial Twin, Future Mirror, Debt-Trap Shield, Dynamic EMI, and rescue analysis results.

### reports

Stores Gemini-generated bank memos, customer summaries, and rescue reports.

### rescue_plans

Stores rescue-before-default support actions and distress signals.

---

## MongoDB MCP Tool Mapping

| Agent Need | MongoDB Collection | MCP Action Type |
|---|---|---|
| Find borrower application | loan_applications | query/find |
| List applications | loan_applications | query/find |
| Find customer-submitted applications | loan_applications | query/find |
| Save loan review analysis | agent_analyses | insert/update |
| Read previous analysis | agent_analyses | query/find |
| Save generated report | reports | insert/update |
| Read generated reports | reports | query/find |
| Save rescue-before-default plan | rescue_plans | insert/update |
| Read rescue plan history | rescue_plans | query/find |

---

## Example MCP Questions

An MCP-capable client can ask:

```txt
List collections in the yousun_amicus database.
Find application APP-001 in loan_applications.
Show all customer-submitted applications.
Count reports for application APP-001.
Inspect the latest rescue plan.
Show the most recent document from agent_analyses.
```

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/yousunlotif-bappy/yousun-amicus.git
cd yousun-amicus
```

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_atlas_connection_string_here
MONGODB_DB=yousun_amicus
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB MCP Server
MDB_MCP_CONNECTION_STRING=your_mongodb_atlas_connection_string_here
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Build

```bash
npm run build
npm run start
```

---

## API Routes

```txt
GET  /api/applications
GET  /api/applications/[id]
POST /api/applications/create

GET  /api/reports
GET  /api/reports/[id]

POST /api/agent/loan-review
POST /api/agent/gemini-report
POST /api/agent/rescue-plan
```

---

## Demo Flow

Recommended demo flow:

```txt
1. Open the live home page
2. Log in as customer: rafi@amicus.ai / demo123
3. Submit a new loan application
4. View customer application status
5. Log out
6. Log in as bank officer: bappy@amicus.ai / demo123
7. Open the customer-submitted application
8. Run Amicus Analysis
9. View Financial Twin and Future Mirror
10. Generate Gemini Bank Memo
11. Open report and download PDF
12. Create Rescue Before Default plan
13. Show production API proof
14. Show MongoDB MCP and Agent Builder proof files
```

---

## Responsible AI Note

YOUSUN Amicus is a decision-support system.

It does not make final lending decisions.

Final loan approval, restructuring, and recovery decisions must remain with authorized bank officers.

The system is designed to support:

- Fair explanation
- Responsible lending
- Early borrower support
- Human oversight

---

## Real-World Impact

YOUSUN Amicus helps banks and borrowers move from a one-time approval decision to a responsible lending journey.

For banks, it improves:

- Risk visibility
- Report generation
- Workflow speed
- Early distress detection

For customers, it improves:

- Application guidance
- Transparency
- Fair explanation
- Early support before default

---

## Limitations

- This is a hackathon MVP and not a production banking system.
- Final credit decisions must be made by authorized human officers.
- Real deployment would require compliance review, security hardening, audit logging, and integration with official banking systems.
- Google Cloud billing limitations prevented live Cloud Run deployment during the hackathon; the live demo is hosted on Vercel with Agent Builder-ready tool specifications included in the repository.

---

## Future Work

Planned improvements:

- Direct Google Cloud Agent Builder runtime connection
- Full MongoDB MCP runtime screenshot/demo
- Real document upload and verification
- Credit bureau and payment history integration
- Role-based access control
- Audit logging
- Bank compliance dashboard
- Multi-bank tenant support
- Real-time repayment monitoring
- SMS/email borrower support alerts

---

## Project Links

```txt
Live Demo: https://yousun-amicus.vercel.app
GitHub Repository: https://github.com/yousunlotif-bappy/yousun-amicus
```

---

## License

This project is licensed under the MIT License.




