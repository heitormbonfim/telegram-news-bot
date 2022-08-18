const { webScraper } = require("./web-scraper");

async function main() {
  // get the last 5 news
  let news = await webScraper();

  news.forEach((obj) => {
    console.log(obj.title + '\n');
  });

  let onlyNewNews = [];

  setInterval(async () => {
    // store the old news
    let oldNews = [...news];

    // update news
    const newsUpdate = await webScraper()

    // look for the news that have changed and store it in onlyNewNews
    for (let i = 0; i < news.length; i++) {
      if (oldNews[i].title != newsUpdate[i].title) {
        news[i].title = newsUpdate[i].title;
        news[i].link = newsUpdate[i].link;
        news[i].img = newsUpdate[i].img;

        onlyNewNews = [
          {
            title: newsUpdate[i].title,
            link: newsUpdate[i].link,
            img: newsUpdate[i].img,
          },
        ];

        console.log(onlyNewNews)
      }
    }
  }, 15 * 60 * 1000);
}

main();
