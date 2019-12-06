import * as Koa    from 'koa';
import {getAllUsers, createUser} from './users.service';

const getAll = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = await getAllUsers();
};

const create = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = await createUser(ctx.request.body);
};

const updateById = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "updateById";
};

const removeById = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "removeById";
};

export default {
    getAll,
    create,
    updateById,
    removeById
};
