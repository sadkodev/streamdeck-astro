import type { ActionPayload, ActionResult } from "@shared/types";

export interface Action {
	execute(payload: ActionPayload): Promise<ActionResult>;
	canExecute(payload: ActionPayload): boolean;
}
