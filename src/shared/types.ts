// Define the shared types bewteen client and server
export type ActionType =
	| "settings"
	| "startStream"
	| "stopStream"
	| "startMic"
	| "stopMic"
	| "startAudio"
	| "stopAudio"
	| "addAction"
	| "toggleMute"
	| "toggleFullScreen";

export type ButtonParams = {
	label: string;
	name: string;
	icon: string;
	empty: boolean;
	system: {
		disabled: boolean;
	};
};

export interface ActionPayload {
	type: ActionType;
	id: string;
	params?: ButtonParams;
}

export interface ActionResult {
	success: boolean;
	message?: string;
	data?: any;
}

export interface DataSystemButtonAction {
	disabled: boolean;
	name: string;
	action: Function;
}

export interface DataButttonAction {
	id: string;
	label: string;
	cb: string;
	name: string;
	icon: string;
	empty: boolean;
	system: DataSystemButtonAction;
}

export interface Icons {
	id: string;
	icon: any;
	type: ActionType;
}
