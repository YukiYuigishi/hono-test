import { Hono } from "hono";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "hono/jsx";

const Page = (props: { name: string }): HTMLElement => (
   <html>
      <h1>やあ、{props.name}</h1>
   </html>
);

const page = new Hono();

page.get("/", (c) => {
   const { name } = c.req.query();
   return c.html(<Page name={name} />);
});

export default page;
