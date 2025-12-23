const TelegramBot = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");
const token = "8417273508:AAGe1ozsPoKHS96Wu5vRC4qnw9pfvdrNZKg";
const bot = new TelegramBot(token, { polling: true });

const obj = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Kompyuter 0 dan 9 gacham son o'yladi, siz usha sonni toposhga xarakat qiling."
  );
  const randomNumber = Math.floor(Math.random() * 10);
  obj[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Tog'ri sonni toping", gameOptions);
};

const bootstrap = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Bot haqida ma'lumot",
    },
    {
      command: "/info",
      description: "O'zingiz haqida ma'lumot",
    },
    {
      command: "/game",
      description: "O'yin o'ynash",
    },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      return bot.sendMessage(
        chatId,
        `Assalomu alaykum xurmatli ${msg.from?.first_name} ${msg.from?.last_name} sizni o'quv botimizga ko'rib turganimizdan xursandmiz `
      );
    }
    if (text === "/info") {
      await bot.sendPhoto(
        chatId,
        "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.jpg"
      );
      return bot.sendMessage(
        chatId,
        `Sizning username bu ${msg.from?.username}, sizning ismingiz esa ${msg.from?.first_name} ${msg.from?.last_name}`
      );
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    bot.sendMessage(chatId, "Bunga hali ma'lumot joylanmagan");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }

    if (data == obj[chatId]) {
      return bot.sendMessage(
        chatId,
        `Tabriklaymiz siz to'g'ri javob berdingiz , kompyuter ${obj[chatId]} sonni tanlagan edi `
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Siz noto'g'ri son tanladingiz ${data}, kompyuter ${obj[chatId]} sonni tanlagan edi`,
        againOptions
      );
    }
  });
};

bootstrap();
