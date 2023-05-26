// Requiring modules 
import { Application, Router, Request, send } from "https://deno.land/x/oak@v12.5.0/mod.ts";       
import { dejsEngine, oakAdapter, viewEngine } from "https://deno.land/x/view_engine@v10.6.0/mod.ts";
// Initiate app
const app = new Application();
const router = new Router();

// app.use(async (ctx, next) => {
//     await send(ctx, ctx.request.url.pathname, {
//         root: `${Deno.cwd()}/static`
//     })
//     next();
// });

app.use(viewEngine(oakAdapter, dejsEngine, { viewRoot: './views' }));
app.use(router.routes());
app.use(router.allowedMethods());

router.get("/", async (ctx) => {
    await ctx.render('index.ejs', { data: { title: 'Oak' } });
});

router.all('/submit', async function (ctx) {
    let name;
    if (ctx.request.method === 'POST') {
        console.log(await ctx.request.body().value.get('name'));
        // name = await ctx.request.body().value.get('name');
    }
    else if (ctx.request.method === 'GET') {
        name = ctx.request.url.searchParams.get('name');
    }
    
    // Return the greeting in the format preferred by the WWW client
    switch (ctx.request.headers.get('Accept').match(/\/.*$/).slice(1)) {
        case 'json':
            // Send the JSON greeting
            ctx.response.headers.set('Content-Type', 'application/json');
            ctx.response.body = { welcome: `Hello '${name}'` };
            console.log(`\x1B[32mThe server sent a JSON document to the browser using the '${ctx.request.method}' method\x1B[0m`);
            break;

        case 'xml':
            // Send the XML greeting
            ctx.response.headers.set('Content-Type', 'application/xml');
            ctx.response.body = `<welcome>Hello '${name}'</welcome>`;
            console.log(`\x1B[32mThe server sent an XML document to the browser using the '${ctx.request.method}' method\x1B[0m`);
            break;

        default:
            // Send the text plain greeting
            ctx.response.headers.set('Content-Type', 'text/plain');
            ctx.response.body = `Hello '${name}'`;
            console.log(`\x1B[32mThe server sent a plain text to the browser using the '${ctx.request.method}' method\x1B[0m`);
    }
});
/* ************************************************ */

console.log('App is listening to port: 8000');
await app.listen({ port:8000 });
