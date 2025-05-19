import type { Action } from "@/shared/actions/ActionInterface";
import type { ActionPayload, ActionResult } from "@shared/types";

export class ToggleFullScreenAction implements Action {
	private isFullScreen: boolean = false;

	async execute(payload: ActionPayload): Promise<ActionResult> {
		this.isFullScreen = !this.isFullScreen;

		if (!this.isFullScreen) {
			document.exitFullscreen();
			console.log("Fullscreen disabled");
		} else {
			document.documentElement.requestFullscreen();
			console.log("Fullscreen enabled");
		}

		return {
			success: true,
			data: {
				isFullScreen: this.isFullScreen,
			},
		};
	}

	canExecute(payload: any): boolean {
		return payload.type === "toggleFullScreen" && this.isFullScreenAvailable();
	}

	private isFullScreenAvailable(): boolean {
		return typeof document != "undefined" && document.fullscreenEnabled;
	}
}
