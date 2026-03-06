import type { SystemModelMessage } from "@mastra/core/_types/@internal_ai-sdk-v5/dist";
import type { HarnessRequestContext } from "@mastra/core/harness";
import type { RequestContext } from "@mastra/core/request-context";
import { agentConfig } from "../../config/agent-config";
import type { stateSchema } from "../../harness/schema";
import { buildFullPrompt } from "./prompts";

/**
 * Dynamic instructions for the coworker agent.
 * All callers (app, scheduled tasks, WhatsApp) go through Harness,
 * so harnessCtx should always be present. The fallback is a safety net.
 */
export async function getInstructions(params?: {
	requestContext?: RequestContext;
}): Promise<SystemModelMessage> {
	const harnessCtx = params?.requestContext?.get("harness") as
		| HarnessRequestContext<typeof stateSchema>
		| undefined;

	// Safety net — all callers should go through Harness
	if (!harnessCtx) {
		return agentConfig.getInstructions();
	}

	const state = harnessCtx.getState?.();
	const modeId = harnessCtx.modeId ?? "build";

	// Build structured prompt from mode + state
	const prompt = buildFullPrompt({
		date: new Date().toISOString().split("T")[0],
		mode: modeId,
		modeId,
		platform: process.platform,
		activePlan: state?.activePlan ?? null,
		state,
	});

	// Append user-configured instructions from AGENTS.md if any
	const customInstructions = agentConfig.getInstructions();
	if (customInstructions?.content) {
		return {
			role: "system",
			content: `${prompt}\n\nAdditional Instructions:\n${customInstructions.content}`,
		};
	}
	return customInstructions;
}
