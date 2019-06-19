const { watch, returnState } = require('./core/heartBeatService');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const App = require('koa');

const app = new App();

// 路由
const Router = require('koa-router');

const router = new Router();

setInterval(() => {
	// 调用函数
	watch()
}, 10 * 1000);

router.all('/api', async (ctx, next) => {
	const state = returnState();
	ctx.body = { state }
})

const port = process.env.PORT ? process.env.PORT : 3300;

app.use(router.routes()).use(router.allowedMethods())

app.listen(port);
console.log(`heart service start! port: ${port}`)