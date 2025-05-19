import type { APIRoute } from "astro";
import { ServerActionController } from "@server/actions/ServerActionController";

import { ActionRegistry } from "@shared/actions/ActionRegistry";
import { ServerToggleMuteAction } from "@server/actions/implementations/ServerToggleMuteAction";

const registry = ActionRegistry.getInstance();

// Register actions disponible on the server
registry.register("toggleMute", new ServerToggleMuteAction());

const controller = new ServerActionController();

export const POST: APIRoute = async ({ request }) => {
	console.log("API endpoint called at", new Date().toISOString());
	try {
		const payload = await request.json();
		const result = await controller.executeAction(payload);

		return new Response(JSON.stringify(result), {
			status: result.success ? 200 : 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error processing action: ", error);

		return new Response(
			JSON.stringify({
				success: false,
				message:
					error instanceof Error ? error.message : "Unknown error occurred",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
};
