import type { ActionPayload, ActionResult } from "@shared/types";
import { ActionRegistry } from "@shared/actions/ActionRegistry";

export class ServerActionController {
	private registry: ActionRegistry;

	constructor() {
		this.registry = ActionRegistry.getInstance();
	}

	public async executeAction(payload: ActionPayload): Promise<ActionResult> {
		const { type } = payload;

		if (!this.registry.hasAction(type)) {
			return {
				success: false,
				message: `Action type ${type} is not registered on the server`,
			};
		}

		const action = this.registry.getAction(type);

		if (!action || !action.canExecute(payload)) {
			return {
				success: false,
				message: `Cannot execute action '${type}' with the provided payload`,
			};
		}

		try {
			return await action.execute(payload);
		} catch (error) {
			return {
				success: false,
				message:
					error instanceof Error ? error.message : "Unknown error occurred",
			};
		}
	}
}
