import type { Action } from "@/shared/actions/ActionInterface";

export class ToggleFullScreenAction implements Action {
	private isFullScreen: boolean = false;

	async execute(payload: any): Promise<any> {
		this.isFullScreen = !this.isFullScreen;

		//DEBUG: Log the current state of the microphone
		console.log(`Fullscreen is ${this.isFullScreen ? "enabled" : "disabled"}`);

		return {
			success: true,
			data: { isFullScreen: this.isFullScreen },
		};
	}

	canExecute(payload: any): boolean {
		return payload.type === "toggleFullScreen" && this.isFullScreenAvailable();
	}

	private isFullScreenAvailable(): boolean {
		return typeof document != "undefined" && document.fullscreenEnabled;
	}
}
