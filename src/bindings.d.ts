export interface Bindings {
   HONO_KV_TEST: KVNamespace;
}

declare global {
   function getMiniflareBindings(): Bindings;
}
