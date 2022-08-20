require("dotenv").config();
const { webScraper } = require("./web-scraper");
const { Telegraf } = require("telegraf");

async function main() {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  const channelId = -1001588644352;

  // start bot
  bot.start((ctx) => {
    ctx.reply(
      `
EN: This bot sends news about cryptocurrencies.
Check the commands on /help

PT: Este bot envia noticias sobre crypto moeadas.
Cheque os comandos em /help
`
    );
  });

  // show the commands available
  bot.command("help", (ctx) => {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      `
Bot commands:
/start : 
EN: description
PT: descrição

/start_news : 
EN: to start sending news
PT: para começar a enviar notícias

/user_info :
EN: to show info about the user 
PT: para mostra informações sobre o usuário
    `
    );
  });

  // shows user id, name, and username
  bot.command("user_info", (ctx) => {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      `
Username: ${ctx.message.chat.username}
First Name: ${ctx.message.chat.first_name}
Last Name: ${ctx.message.chat.last_name}
User ID: ${ctx.message.chat.id}`
    );
  });

  bot.command("start_news", async (ctx) => {
    // get the last 5 news
    let news = await webScraper();

    // send the news
    for (let i = news.length - 1; i >= 0; i--) {
      await ctx.telegram.sendPhoto(
        channelId,
        {url: news[i].img},
        {
          caption: `
${news[i].title}

${news[i].link}
          `
        }
      )
    }
    
    async function updateNews() {
      // store the old news
      let oldNews = [...news];

      // update news
      const newsUpdate = await webScraper();

      // look for the news that have changed and store it in onlyNewNews
      for (let i = news.length - 1; i >= 0; i--) {
        if (oldNews[i].title != newsUpdate[i].title) {
          news = [...newsUpdate];

          // resetting array data structure
          oldNews.push(news[i]);
          oldNews.shift();

          // send the news
          await ctx.telegram.sendPhoto(
            channelId,
            {url: news[i].img},
            {
              caption: `
${news[i].title}

${news[i].link}
              `
            }
          )
        }
      }
    }

    // get new data every 5 minutes 
    setInterval(updateNews, 5 * 60 * 1000);
  });

  // check if bot is working
  bot.hears("Hello", (ctx) => {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "Hey, I'm working, don't worry ;)"
    );
  });

  // echo the text to the channel
  bot.on("text", (ctx) => {
    ctx.telegram.sendMessage(
      ctx.message.chat.id, // channel's id
      ctx.message.text
    );
  });

  bot.launch();
  console.log("Bot is running..");

  // Graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main();
