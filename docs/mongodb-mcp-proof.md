# MongoDB MCP Integration Proof

## Partner Track
MongoDB

## Why MongoDB MCP is used
YOUSUN Amicus uses MongoDB as the agent system of record for loan applications, agent analyses, reports, and rescue plans. MongoDB MCP is used as the partner tool-access layer so the agent can query and update banking workflow data.

## Collections used by the agent

- loan_applications
- agent_analyses
- reports
- rescue_plans

## Agent tool actions mapped to MongoDB MCP

### getLoanApplication
Reads one loan application from `loan_applications`.

### listLoanApplications
Lists loan applications for the bank officer dashboard.

### saveAgentAnalysis
Stores Financial Twin, Future Mirror, Debt-Trap Shield, Dynamic EMI, and Rescue Before Default analysis in `agent_analyses`.

### saveGeneratedReport
Stores Gemini-generated bank memos, customer summaries, and rescue reports in `reports`.

### createRescuePlan
Stores early support actions in `rescue_plans`.

## Local MCP setup reference

MongoDB MCP Server can be configured with a MongoDB connection string or Atlas API credentials. The setup utility can be started with:

```bash
npx mongodb-mcp-server@latest setup

