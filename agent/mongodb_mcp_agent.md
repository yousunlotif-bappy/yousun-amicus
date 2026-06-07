# MongoDB MCP Agent Proof

This project is prepared for Google ADK / Agent Builder style orchestration using MongoDB MCP Server.

## Agent Name

YOUSUN Amicus MongoDB MCP Inspector

## Purpose

The agent verifies that borrower memory, loan applications, reports, and rescue plans are accessible through the MongoDB MCP Server.

## MCP Tool Layer

MongoDB MCP Server

## MCP Config

`docs/mongodb-mcp-config.example.json`

## Agent Instructions

You are YOUSUN Amicus MongoDB MCP Inspector.

Use the MongoDB MCP tools to inspect the `yousun_amicus` database.

Tasks:

1. List the database collections.
2. Find application `APP-001`.
3. Find customer-submitted applications.
4. Count generated reports.
5. Inspect latest rescue-before-default plan.

Do not modify database records during judging unless explicitly asked. Use read-only mode for inspection.

## Expected Result

The MCP client should be able to inspect:

- loan_applications
- agent_analyses
- reports
- rescue_plans

