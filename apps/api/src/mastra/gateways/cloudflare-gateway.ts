import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModelV3 } from "@ai-sdk/provider";
import { MastraModelGateway, type ProviderConfig } from "@mastra/core/llm";

export class CloudflareGateway extends MastraModelGateway {
	// Required: Unique identifier for the gateway
	// This ID is used as the prefix for all providers from this gateway
	readonly id = "cloudflare";

	// Required: Human-readable name
	readonly name = "Cloudflare Gateway";

	/**
	 * Fetch provider configurations from your gateway
	 * Returns a record of provider configurations
	 */
	async fetchProviders(): Promise<Record<string, ProviderConfig>> {
		return {
			google: {
				name: "Google",
				models: [
					"gemini-2.5-pro",
					"gemini-2.5-flash",
					"gemini-3-flash-preview",
					"gemini-2.5-flash-lite",
				],
				apiKeyEnvVar: process.env.CF_AIG_TOKEN as string,
				gateway: process.env.CF_GATEWAY_NAME as string,
				url: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/${process.env.CF_AI_GATEWAY_NAME}/google-ai-studio/v1beta`,
			},
		};
	}

	/**
	 * Build the API URL for a model
	 * @param modelId - Full model ID (e.g., "cloudflare/google/gemini-2.5-flash")
	 * @param envVars - Environment variables (optional)
	 */
	buildUrl(_modelId: string, _envVars?: Record<string, string>): string {
		return `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/${process.env.CF_AI_GATEWAY_NAME}/google-ai-studio/v1beta`;
	}

	/**
	 * Get the API key for authentication
	 * @param modelId - Full model ID
	 */
	async getApiKey(modelId: string): Promise<string> {
		const apiKey = process.env.CF_AIG_TOKEN;
		if (!apiKey) {
			throw new Error(`Missing CF_AIG_TOKEN environment variable`);
		}
		return apiKey;
	}

	/**
	 * Create a language model instance
	 * @param args - Model ID, provider ID, and API key
	 */
	async resolveLanguageModel({
		modelId,
		providerId,
		apiKey,
	}: {
		modelId: string;
		providerId: string;
		apiKey: string;
	}): Promise<LanguageModelV3> {
		const baseURL = this.buildUrl(`${providerId}/${modelId}`);
		const google = createGoogleGenerativeAI({
			apiKey,
			baseURL,
		});
		const model = google(modelId);

		return model;
	}
}
