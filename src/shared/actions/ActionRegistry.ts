import type { Action } from "@shared/actions/ActionInterface";
import type { ActionType } from "@shared/types";

// This class is responsible for registering and executing all actions disponible
export class ActionRegistry {
	private static instance: ActionRegistry;
	private actions: Map<ActionType, Action> = new Map();

	private constructor() {
		// Private constructor to prevent instantiation from outside the class
	}

	public static getInstance(): ActionRegistry {
		if (!ActionRegistry.instance) {
			ActionRegistry.instance = new ActionRegistry();
		}
		return ActionRegistry.instance;
	}

	public register(type: ActionType, action: Action): void {
		this.actions.set(type, action);
	}

	public getAction(type: ActionType): Action | undefined {
		return this.actions.get(type);
	}

	public hasAction(type: ActionType): boolean {
		return this.actions.has(type);
	}
}
