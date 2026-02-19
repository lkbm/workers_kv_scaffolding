import { Hono } from 'hono';

// Note: You should run `npx wrangler types` to generate the correct types for your KV Namespace and Assets bindings and remove this definition:
export interface Env {
	PLACEHOLDER_KV_NAMESPACE: KVNamespace;
	ASSETS: Fetcher; // provided by Workers Static Assets binding
}

const app = new Hono<{ Bindings: Env }>();

// API routes
app.get('/api/state/:key', async (c) => {
	const key = c.req.param('key');
	const value = await c.env.PLACEHOLDER_KV_NAMESPACE.get(key);
	return c.json({ value });
});

app.put('/api/state/:key', async (c) => {
	const key = c.req.param('key');
	const { value } = await c.req.json<{ value: string }>();
	// waitUntil will keep the process running until it's completed, but doesn't block the response:
	c.executionCtx.waitUntil(
		c.env.PLACEHOLDER_KV_NAMESPACE.put(key, value)
	);
	return c.json({ success: true });
});

export default app;
