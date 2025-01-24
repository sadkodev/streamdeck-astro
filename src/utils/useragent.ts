export interface UserAgentInfo {
	source: string;
	browser: {
		name: string;
		version: string;
	};
	os: {
		name: string;
		version: string;
	};
	device: {
		type: "mobile" | "tablet" | "desktop" | "unknown";
		vendor: string;
		model: string;
	};
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	isBot: boolean;
}

export function useUserAgent(userAgent: string | null): UserAgentInfo {
	if (!userAgent) {
		return createEmptyUserAgent();
	}

	const ua = userAgent.toLowerCase();

	return {
		source: userAgent,
		browser: detectBrowser(ua),
		os: detectOS(ua),
		device: detectDevice(ua),
		isMobile: checkIsMobile(ua),
		isTablet: checkIsTablet(ua),
		isDesktop: checkIsDesktop(ua),
		isBot: checkIsBot(ua),
	};
}

function createEmptyUserAgent(): UserAgentInfo {
	return {
		source: "",
		browser: { name: "unknown", version: "" },
		os: { name: "unknown", version: "" },
		device: { type: "unknown", vendor: "", model: "" },
		isMobile: false,
		isTablet: false,
		isDesktop: false,
		isBot: false,
	};
}

function detectBrowser(ua: string) {
	const browsers = {
		chrome: /chrome|chromium|crios/i,
		safari: /safari/i,
		firefox: /firefox|fxios/i,
		edge: /edg/i,
		opera: /opera|opr/i,
	};

	for (const [name, regex] of Object.entries(browsers)) {
		if (regex.test(ua)) {
			const version = ua.match(
				/(?:chrome|safari|firefox|edge|opera|version)[\s/:](\d+(\.\d+)?)/i,
			);
			return {
				name,
				version: version ? version[1] : "",
			};
		}
	}

	return { name: "unknown", version: "" };
}

function detectOS(ua: string) {
	const os = {
		windows: /windows nt/i,
		mac: /macintosh|mac os x/i,
		linux: /linux/i,
		android: /android/i,
		ios: /iphone|ipad|ipod/i,
	};

	for (const [name, regex] of Object.entries(os)) {
		if (regex.test(ua)) {
			const version = ua.match(/(?:windows nt|mac os x|android) ([._\d]+)/i);
			return {
				name,
				version: version ? version[1].replace(/_/g, ".") : "",
			};
		}
	}

	return { name: "unknown", version: "" };
}

function detectDevice(ua: string) {
	const device = {
		type: "unknown" as UserAgentInfo["device"]["type"],
		vendor: "",
		model: "",
	};

	// Detectar tablets primero
	if (
		/ipad/i.test(ua) ||
		/android(?!.*mobile)/i.test(ua) ||
		/tablet/i.test(ua)
	) {
		device.type = "tablet";
	}
	// Luego móviles
	else if (
		/iphone/i.test(ua) ||
		/android.*mobile/i.test(ua) ||
		/mobile/i.test(ua)
	) {
		device.type = "mobile";
	}
	// Por defecto, desktop
	else {
		device.type = "desktop";
	}

	// Detectar vendor y modelo
	if (/iphone|ipad/i.test(ua)) {
		device.vendor = "Apple";
		device.model = /iphone/i.test(ua) ? "iPhone" : "iPad";
	} else if (/samsung/i.test(ua)) {
		device.vendor = "Samsung";
		const model = ua.match(/sm-\w+/i);
		device.model = model ? model[0].toUpperCase() : "";
	}

	return device;
}

function checkIsMobile(ua: string): boolean {
	return /android.*mobile|mobile|iphone|ipod|blackberry|opera mini|opera mobi/i.test(
		ua,
	);
}

function checkIsTablet(ua: string): boolean {
	return /ipad|android(?!.*mobile)|tablet/i.test(ua);
}

function checkIsDesktop(ua: string): boolean {
	return !checkIsMobile(ua) && !checkIsTablet(ua);
}

function checkIsBot(ua: string): boolean {
	return /bot|crawler|spider|crawling/i.test(ua);
}
