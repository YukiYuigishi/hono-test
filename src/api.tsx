import { Hono } from "hono";
import { Bindings } from "./bindings";
import * as model from "./model";

const api = new Hono<{ Bindings: Bindings }>();

api.get("/book/:isbn", async (c) => {
   const { isbn } = c.req.param();
   const book = await model.getBook(c.env.HONO_KV_TEST, isbn);
   if (!book) {
      return c.json({ error: "Not Found", ok: false }, 404);
   }
   return c.json({ ISBN: book?.ISBN, title: book?.title });
});

api.post("/book", async (c) => {
   const { isbn, title } = c.req.query();
   console.log(title);
   console.log(isbn);

   const post = await model.createBook(c.env.HONO_KV_TEST, {
      ISBN: isbn,
      title,
   });
   if (!post) {
      return c.json({ error: "Query error", ok: false }, 400);
   }

   return c.json({ post, ok: true });
});

api.get("/test", (c) => c.text("test"));
export default api;
