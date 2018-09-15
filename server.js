const https = require('https');
const fs = require('fs');
const Koa = require('koa');
const TelegramBot = require('node-telegram-bot-api');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const token = '';
const options = {
    key: fs.readFileSync('../etc/letsencrypt/live/lamavps.com/privkey.pem', 'utf8'),
    cert: fs.readFileSync('../etc/letsencrypt/live/lamavps.com/fullchain.pem', 'utf8')
};

const app = new Koa();
const router = new Router();

const bot = new TelegramBot(token, {polling: true});
bot.setWebHook(`https://lamavps.com/bot`);
router.post('/bot', (ctx, next) => {
    let body = ctx.request.body
    console.log(body);
    bot.processUpdate('sdsdsds');
    ctx.status = 200;
});
app.use(bodyParser());
app.use(router.routes());

https.createServer(options, app.callback()).listen(3000);

bot.on('message', (msg) => {
    console.log(msg.text);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
});