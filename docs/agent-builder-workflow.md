# YOUSUN Amicus — Agent Builder Workflow

## Overview

YOUSUN Amicus is a loan review and borrower support agent for small and medium-sized businesses. The system helps bank officers review applications, understand repayment risk, recommend safer loan structures, and prepare early support actions before a borrower reaches default.

This project is not only a dashboard. It follows an agentic workflow where borrower data is collected, analyzed, simulated, explained, reported, and stored for future review.

YOUSUN Amicus is designed as a decision-support system. It does not replace a bank officer and does not make final loan approval, rejection, restructuring, or recovery decisions. The final decision must always remain with an authorized bank officer or risk manager.

---

## Agent Name

YOUSUN Amicus Loan Review Agent

---

## Agent Purpose

The purpose of YOUSUN Amicus is to make loan review more explainable, fair, proactive, and borrower-friendly.

The agent supports the lending workflow by helping bank officers:

- Review borrower and business information
- Understand business cashflow and seasonality
- Build a Financial Twin profile
- Simulate repayment risk through future scenarios
- Recommend a safer loan amount
- Prepare a flexible EMI plan
- Generate reports for bank officers and borrowers
- Create early rescue actions before default

---

## Why This Is an Agent, Not Just a Dashboard

A normal dashboard mainly displays stored data. YOUSUN Amicus performs a structured workflow using application data, financial calculations, simulated risk scenarios, report generation, and rescue planning.

The agent can:

1. Read a loan application
2. Understand business cashflow and seasonality
3. Build Financial Twin indicators
4. Run Future Mirror stress-test scenarios
5. Identify risky loan zones
6. Recommend a safer loan amount
7. Prepare a Dynamic EMI Plan
8. Generate bank-facing and borrower-facing reports
9. Save analysis outputs
10. Create rescue actions when distress signals appear

This makes YOUSUN Amicus a workflow-based financial agent instead of a simple data display system.

---

## Core Agent Loop

```txt
Observe → Understand → Simulate → Recommend → Report → Monitor → Rescue
```

### Observe

The agent reads borrower and loan application data from MongoDB.

### Understand

The agent reviews the requested loan amount, business type, average monthly sales, existing EMI, risk level, documents, and seasonality.

### Simulate

The agent tests how the borrower may perform under normal, growth, and stress scenarios.

### Recommend

The agent recommends a safer loan amount, a suitable loan product, and a flexible EMI structure.

### Report

The agent creates reports for different audiences, including bank officers, borrowers, and risk managers.

### Monitor

The agent stores generated analysis and reports so they can be reviewed later.

### Rescue

If repayment pressure or distress signals appear, the agent suggests early support actions before default.

---

## Loan Review Workflow

### Input

```json
{
  "applicationId": "APP-001"
}
```

### Workflow Steps

1. Fetch the loan application from MongoDB.
2. Read borrower and business details.
3. Review requested loan amount, existing EMI, average sales, risk level, and seasonality.
4. Calculate Financial Twin indicators.
5. Run Future Mirror stress-test scenarios.
6. Identify the safer loan amount.
7. Prepare a Dynamic EMI Plan.
8. Generate the Bank Officer Credit Memo.
9. Generate the Customer-Friendly Loan Guidance.
10. Save analysis and generated reports in MongoDB.

### Output

The workflow returns:

- Financial Twin Score
- Business Health Score
- Approval Readiness Score
- Safe Loan Amount
- Risky Zone
- Recommended Product
- Dynamic EMI Plan
- Bank Officer Memo
- Customer-Friendly Summary

---

## Rescue Before Default Workflow

### Input

```json
{
  "applicationId": "APP-001"
}
```

### Workflow Steps

1. Fetch the application from MongoDB.
2. Review the latest analysis.
3. Check possible distress signals.
4. Classify the distress level.
5. Suggest a customer-side action.
6. Suggest a bank-side action.
7. Add an avoid-action warning.
8. Save the rescue plan in MongoDB.

### Output

The workflow returns:

- Distress Level
- Trigger Signals
- Recovery Probability
- Customer Action
- Bank Action
- Avoid Action
- Responsible Lending Note

---

## Agent Builder Role

Vertex AI Agent Builder is planned as the orchestration layer for YOUSUN Amicus. It can coordinate the loan review workflow, route requests to the correct tools, and use Gemini to generate professional explanations.

In this version of the project, the workflow is prepared with clear tool structure and API routes so that the agent behavior can be demonstrated and extended later.

Agent Builder can be used to coordinate actions such as:

- Fetching loan application data
- Running the loan review workflow
- Generating bank officer reports
- Generating borrower-friendly summaries
- Creating rescue-before-default plans
- Saving outputs for future review

---

## Gemini Role

Gemini is planned for generating natural language reports and explanations.

Gemini can support:

- Bank officer memo generation
- Borrower-friendly loan explanation
- Stress-test explanation
- Rescue-before-default explanation
- Responsible AI notes

The calculation layer produces structured financial results, and Gemini helps convert those results into clear, useful, and human-readable language.

---

## MongoDB MCP Role

MongoDB is used as the main system of record. MongoDB MCP is positioned as the tool-access layer that allows the agent to interact with stored borrower data, generated analysis, reports, and rescue plans.

MongoDB stores:

- Loan applications
- Agent analyses
- Generated reports
- Rescue plans

The agent uses MongoDB-backed data instead of relying only on static or hardcoded information. This makes the workflow easier to trace, review, and explain.

---

## Main Agent Tools

The planned agent workflow is prepared around these tools:

### getLoanApplication

Fetches a single loan application by application ID.

### listLoanApplications

Lists loan applications for the bank officer dashboard.

### saveAgentAnalysis

Saves Financial Twin, Future Mirror, Dynamic EMI, and recommendation results.

### getReportsByApplication

Fetches reports connected to one loan application.

### saveGeneratedReport

Saves a generated bank memo, customer summary, or rescue report.

### createRescuePlan

Creates an early support plan before the borrower reaches default.

---

## Example Agent Flow

A bank officer selects application `APP-001`.

The agent then:

1. Fetches the application from MongoDB.
2. Reviews the borrower profile and loan request.
3. Calculates the Financial Twin Score.
4. Runs repayment stress scenarios.
5. Compares the requested loan with a safer recommended amount.
6. Prepares a Dynamic EMI Plan.
7. Generates the Bank Officer Credit Memo.
8. Generates the Customer-Friendly Loan Guidance.
9. Saves the reports.
10. Prepares a Rescue Before Default plan if risk signals are detected.

---

## Responsible AI Positioning

YOUSUN Amicus is a decision-support system.

It does not make final loan approval, rejection, restructuring, or recovery decisions. Final decisions must remain with authorized bank officers or risk managers.

The goal of the agent is to support responsible lending, improve explainability, reduce repayment pressure, and help banks act earlier when borrowers show signs of financial stress.

---

## Judge-Facing Summary

YOUSUN Amicus uses an agentic workflow for responsible loan review. The agent reads borrower data from MongoDB, builds a Financial Twin profile, simulates repayment stress, recommends safer loan structures, generates reports, and prepares rescue-before-default actions.

MongoDB works as the system of record, MongoDB MCP is positioned as the tool-access layer, and Agent Builder is planned as the orchestration layer for coordinating the complete workflow.

The system is not intended to replace bank officers. It is designed to support human decision-making with structured analysis, clear explanations, and early borrower support.


