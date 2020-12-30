import * as TelegramBot from 'node-telegram-bot-api';

const token = process.env.TOKEN;

if (!token) {
  throw 'Please provide a valid token for a telegram bot';
}

const bot = new TelegramBot.default(token, { polling: true });
const isAcceptable = function (msg: TelegramBot.Message): boolean {
  return Boolean(msg.photo);
};
const onMessage = function (msg: TelegramBot.Message): boolean {
  if (isAcceptable(msg)) {
    return;
  }

  bot.deleteMessage(msg.chat.id, String(msg.message_id));
};

bot.on('message', onMessage);
bot.on('channel_post', onMessage);
