import { type Action } from "@shared/actions/ActionInterface";
import type { ActionPayload, ActionResult } from "@shared/types";

export class ServerToggleMuteAction implements Action {
	private static isMuted: boolean = false;

	async execute(payload: ActionPayload): Promise<ActionResult> {
		try {
			ServerToggleMuteAction.isMuted = !ServerToggleMuteAction.isMuted;

			console.log(
				`[SERVER] Microphone is now ${ServerToggleMuteAction.isMuted ? "muted" : "unmuted"}`,
			);
			return {
				success: true,
				message: `Microphone ${ServerToggleMuteAction.isMuted ? "muted" : "unmuted"} successfully`,
				data: {
					isMuted: ServerToggleMuteAction.isMuted,
					timestamp: new Date().toISOString(),
				},
			};
		} catch (error) {
			console.error("Error toggling mute state:", error);
			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Failed to toggle mute state",
			};
		}
	}

	canExecute(payload: ActionPayload): boolean {
		return payload.type === "toggleMute";
	}

	private async executeSystemCommand(command: string): Promise<void> {
		console.log(`[SERVER] Executing system command: ${command}`);
	}
}
