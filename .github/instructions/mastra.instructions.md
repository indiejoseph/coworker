---
description: "Mastra framework instructions for agents, workflows, harness, tools, and memory. Always check Mastra documentation."
applyTo: "apps/api/src/mastra/**"
---

# Mastra Project Instructions

When working with Mastra code in the `apps/api/src/mastra/` directory:

- **Always check Mastra documentation**: Before implementing or modifying code, consult https://mastra.ai/llms.txt or the relevant docs for best practices.

- **Use appropriate Mastra components**:
  - Agents for open-ended tasks with reasoning and tool use.
  - Workflows for structured sequences of tasks.
  - Harness for testing and evaluation.
  - Tools for specific functionalities.
  - Memory for conversation coherence.

- **Follow Mastra conventions**: Use the framework's patterns for imports, configurations, and integrations.

- **Incorporate key concepts**: Model routing, human-in-the-loop, context management, MCP, etc.

This is a hard rule: Always verify with documentation before proceeding.