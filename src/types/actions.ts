export interface Action {
	type: string;
	payload?: any;
}

export interface Actions {
	[key: string]: Action;
}
