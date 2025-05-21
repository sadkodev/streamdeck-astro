import type { ActionPayload, ActionResult } from '@shared/types';
import { ActionRegistry } from '@shared/actions/ActionRegistry';

export class ClientActionController {
	private registry: ActionRegistry;

	constructor() {
		this.registry = ActionRegistry.getInstance();
	}
	public async executeAction(payload: ActionPayload): Promise<ActionResult> {
		const { type } = payload;
		console.log(`ClientActionController: Executing action ${type}`);

		if (this.registry.hasAction(type)) {
			const action = this.registry.getAction(type);

			if (action && action.canExecute(payload)) {
				return await action.execute(payload);
			}
		}

		return this.sendToServer(payload);
	}

	private async sendToServer(payload: ActionPayload): Promise<ActionResult> {
		console.log(`ClientActionController: Sending action ${payload.type} to server`);
		try {
			const response = await fetch('/api/streamdeck/action', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload), // Asegúrate de incluir el payload
			});

			if (!response.ok) {
				throw new Error(`Server responded with: ${response.status}`);
			}

			const result = await response.json();
			return result;
		} catch (error) {
			console.error('Error sending action to server:', error);
			return {
				success: false,
				message: error instanceof Error ? error.message : 'Unknown error occurred',
			};
		}
	}
}
