const TelegramBot = require("node-telegram-bot-api");

const token = "8417273508:AAGe1ozsPoKHS96Wu5vRC4qnw9pfvdrNZKg";

const bot = new TelegramBot(token, { polling: true });

const obj = {};

const gameOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "1",
          callback_data: "1",
        },
        {
          text: "2",
          callback_data: "2",
        },
        {
          text: "3",
          callback_data: "3",
        },
      ],
      [
        {
          text: "4",
          callback_data: "4",
        },
        {
          text: "5",
          callback_data: "5",
        },
        {
          text: "6",
          callback_data: "6",
        },
      ],
      [
        {
          text: "7",
          callback_data: "7",
        },
        {
          text: "8",
          callback_data: "8",
        },
        {
          text: "9",
          callback_data: "9",
        },
      ],
      [
        {
          text: "0",
          callback_data: "0",
        },
      ],
    ],
  },
};

// Again option

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
      await bot.sendMessage(
        chatId,
        "Kompuyuter 0 dan 9 gacha son o'ylaydi siz usha sonni topishga xarakat qiling"
      );
      const randomNumber = Math.floor(Math.random() * 10);
      obj[chatId] = randomNumber;
      return bot.sendMessage(chatId, "To'g'ri sonni toping", gameOptions);
    }

    bot.sendMessage(chatId, "Bunga hali ma'lumot joylanmagan");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data == obj[chatId]) {
      return bot.sendMessage(
        chatId,
        `Tabriklaymiz siz to'g'ri javob berdingiz , kompyuter ${obj[chatId]} sonni tanlagan edi `
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Siz noto'g'ri son tanladingiz ${data}, kompyuter ${obj[chatId]} sonni tanlagan edi`
      );
    }
  });
};

bootstrap();
