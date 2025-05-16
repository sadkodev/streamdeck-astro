import type { ActionPayload, ActionResult } from "@shared/types";
import { type Action } from "@shared/actions/ActionInterface";

export class ToggleMuteAction implements Action {
	private audioContext: AudioContext | null = null;
	private isMuted: boolean = false;

	async execute(payload: ActionPayload): Promise<ActionResult> {
		this.isMuted = !this.isMuted;

		//DEBUG: Log the current state of the microphone
		console.log(`Microphone is ${this.isMuted ? "muted" : "unmuted"}`);

		return {
			success: true,
			data: { isMuted: this.isMuted },
		};
	}

	canExecute(payload: ActionPayload): boolean {
		return payload.type === "toggleMute" && this.isAudioAvailable();
	}

	private isAudioAvailable(): boolean {
		return (
			typeof AudioContext != "undefined" // ||typeof webkitAudioContext != "undefined"
		);
	}
}
