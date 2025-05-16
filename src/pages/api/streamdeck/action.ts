import type { APIRoute } from "astro";
import { ServerActionController } from "@actions/ServerActionController";

import { ActionRegistry } from "@shared/actions/ActionRegistry";
import { ServerToggleMuteAction } from "@/actions/implementations/ServerToggleAction";

const registry = ActionRegistry.getInstance();
registry.register("toggleMute", new ServerToggleMuteAction());

const controller = new ServerActionController();

export const POST: APIRoute = async ({ request }) => {
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

		// Corregido: devuelve directamente un objeto Response
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
