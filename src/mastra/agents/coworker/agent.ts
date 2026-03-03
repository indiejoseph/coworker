import { Agent } from "@mastra/core/agent";
import { TokenLimiterProcessor } from '@mastra/core/processors'
import { AGENT_ID, agentConfig } from "../../config/agent-config";
import { noOpSemanticRecall } from "../../processors/no-op-semantic-recall";
import { searchMemoryTool } from "../../tools/search-memory";
import { getDynamicWorkspace } from "./workspace";
import { getInstructions } from "./instructions";
import { getModel } from "./model";

const tokenLimiter =new TokenLimiterProcessor({ limit: 30_000, countMode: 'cumulative', strategy: 'truncate' }) // 30_000 align to observation threshold to avoid trimming before recall

export const coworkerAgent = new Agent({
  id: AGENT_ID,
  name: "Coworker",
  description: "An AI team member that helps with tasks, answers questions, and manages workflows.",
  instructions: getInstructions,
  model: getModel,
  tools: { searchMemory: searchMemoryTool },
  workspace: getDynamicWorkspace,
  // Memory is provided by Harness via getDynamicMemory factory.
  // Non-Harness callers (scheduled tasks, WhatsApp) pass memory explicitly.
  inputProcessors: [noOpSemanticRecall, tokenLimiter],
  defaultOptions: async () => ({
    maxSteps: 100,
    toolsets: await agentConfig.getMcpToolsets(),
  }),
});
