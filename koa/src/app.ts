import * as Koa        from 'koa';
import * as Router     from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import {connectDB}     from './config/db';
import UsersRouter     from './api/users/users.routes';

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/koa-test';
const app    = new Koa();

(async () => {

    await connectDB(DB_URI);

    app.use(bodyParser());
    app.use(async (ctx, next) => {
        console.log('Url:', ctx.url); // Log the request to the console
        await next(); // Pass the request to the next middleware function
    });

    const mainRouter = new Router();

    mainRouter.get('/hello*', async (ctx) => {
        ctx.body = 'Hello World!';
    });

    // mount users routes on main router
    mainRouter.use('/users', UsersRouter.routes(), UsersRouter.allowedMethods());

    app.use(mainRouter.routes());
    app.listen(PORT);

    console.log(`Server running on port ${PORT}`);

})();
