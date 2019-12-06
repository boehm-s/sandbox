import * as Router from 'koa-router';

import UserCtrl from './users.controller';

const router = new Router();

router
    .get('/', UserCtrl.getAll)
    .post('/', UserCtrl.create)
// .put('/:id', UserCtrl.updateById)
// .del('/:id', UserCtrl.removeById)
;

export default router;
