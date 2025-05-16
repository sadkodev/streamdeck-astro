import type { ActionPayload, ActionResult, ActionType } from "@shared/types";
import { ActionRegistry } from "@shared/actions/ActionRegistry";

export class ClientActionController {
	private registry: ActionRegistry;

	constructor() {
		this.registry = ActionRegistry.getInstance();
	}

	public async executeAction(payload: ActionPayload): Promise<ActionResult> {
		const { type } = payload;

		if (this.registry.hasAction(type)) {
			const action = this.registry.getAction(type);

			if (action && action.canExecute(payload)) {
				return await action.execute(payload);
			}
		}

		return this.sendToServer(payload);
	}
	private async sendToServer(payload: ActionPayload): Promise<ActionResult> {
		try {
			const response = await fetch("/api/streamdeck/action", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Server responded with :${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error("Error sending action to server:", error);
			return {
				success: false,
				message:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	}
}
