import { ClientActionController } from '@client/actions/ClientActionController';
import type { ActionPayload, ActionType } from '@shared/types';
import { ActionRegistry } from '@shared/actions/ActionRegistry';

import { ToggleMuteAction } from '@client/actions/implementations/ToggleMuteAction';
import { ToggleFullScreenAction } from '@client/actions/implementations/ToggleFullScreenAction';

const registry = ActionRegistry.getInstance();
registry.register('toggleMute', new ToggleMuteAction());
registry.register('toggleFullScreen', new ToggleFullScreenAction());

const clientController = new ClientActionController();

class AstroButton extends HTMLElement {
	data: ActionPayload | null = null;
	constructor() {
		super();
		this.addEventListener('click', this.handleClick.bind(this));
	}

	connectedCallback() {
		const raw = this.dataset.action;
		try {
			this.data = raw ? JSON.parse(raw) : null;
		} catch (error) {
			console.error('Failed to parse data-action attribute', error);
			this.data = null;
		}
	}

	async handleClick() {
		if (!this.data || this.data.params?.empty || (this.data.params?.system && this.data.params?.system.disabled)) {
			console.log('Button is empty or disabled');
			return;
		}

		try {
			const payload: ActionPayload = {
				type: this.data.type as ActionType,
				id: this.data.id,
				params: this.data.params,
			};

			const result = await clientController.executeAction(payload);

			if (result.success) {
				console.log(`Action ${payload.type} executed successfully:`);
				console.log(`This is the client result:`, result);
				this.updateVisualState(result.data);
			} else {
				console.error(`Action ${payload.type} failed:`, result.message);
			}
		} catch (error) {
			console.error('Error executing button action:', error);
		}
	}
	updateVisualState(data: any) {
		if (data && data.active !== undefined) {
			data.active ? this.classList.add('test') : this.classList.remove('test');
		}
	}
}

customElements.define('astro-button', AstroButton);
