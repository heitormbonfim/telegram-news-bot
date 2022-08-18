const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
  const options = {
    method: "GET",
    url: "https://br.investing.com/news/cryptocurrency-news",
    headers: {
      authority: "br.investing.com",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      cookie:
        'udid=7a1fa69aa0178579a00afcdf55a8cb8a; PHPSESSID=eas9ou3nj87d15cfk84vlvre4n; adBlockerNewUserDomains=1659979534; G_ENABLED_IDPS=google; OptanonAlertBoxClosed=2022-08-08T17:25:53.035Z; OTAdditionalConsentString=1~39.43.46.55.61.70.83.89.93.108.117.122.124.131.135.136.143.144.147.149.159.162.167.171.192.196.202.211.218.228.230.239.241.259.266.272.286.291.311.317.322.323.326.327.338.367.371.385.389.394.397.407.413.415.424.430.436.440.445.449.453.482.486.491.494.495.501.503.505.522.523.540.550.559.560.568.574.576.584.587.591.733.737.745.787.802.803.817.820.821.829.839.864.867.874.899.904.922.931.938.979.981.985.1003.1024.1027.1031.1033.1040.1046.1051.1053.1067.1085.1092.1095.1097.1099.1107.1127.1135.1143.1149.1152.1162.1166.1186.1188.1201.1205.1211.1215.1226.1227.1230.1252.1268.1270.1276.1284.1286.1290.1301.1307.1312.1345.1356.1364.1365.1375.1403.1415.1416.1419.1440.1442.1449.1455.1456.1465.1495.1512.1516.1525.1540.1548.1555.1558.1564.1570.1577.1579.1583.1584.1591.1603.1616.1638.1651.1653.1665.1667.1677.1682.1697.1699.1703.1712.1716.1721.1725.1732.1745.1750.1765.1769.1782.1786.1800.1808.1810.1825.1827.1832.1837.1838.1840.1842.1843.1845.1859.1866.1870.1878.1880.1889.1899.1917.1929.1942.1944.1962.1963.1964.1967.1968.1969.1978.2003.2007.2008.2027.2035.2039.2044.2047.2052.2056.2064.2068.2070.2072.2074.2088.2090.2103.2107.2109.2115.2124.2130.2133.2137.2140.2145.2147.2150.2156.2166.2177.2183.2186.2202.2205.2216.2219.2220.2222.2225.2234.2253.2264.2279.2282.2292.2299.2305.2309.2312.2316.2322.2325.2328.2331.2334.2335.2336.2337.2343.2354.2357.2358.2359.2370.2376.2377.2387.2392.2394.2400.2403.2405.2407.2411.2414.2416.2418.2425.2440.2447.2459.2461.2462.2465.2468.2472.2477.2481.2484.2486.2488.2493.2496.2497.2498.2499.2501.2510.2511.2517.2526.2527.2532.2534.2535.2542.2552.2563.2564.2567.2568.2569.2571.2572.2575.2577.2583.2584.2596.2601.2604.2605.2608.2609.2610.2612.2614.2621.2628.2629.2633.2634.2636.2642.2643.2645.2646.2647.2650.2651.2652.2656.2657.2658.2660.2661.2669.2670.2677.2681.2684.2686.2687.2690.2695.2698.2707.2713.2714.2729.2739.2767.2768.2770.2772.2784.2787.2791.2792.2798.2801.2805.2812.2813.2816.2817.2818.2821.2822.2827.2830.2831.2834.2836.2838.2839.2840.2844.2846.2847.2849.2850.2852.2854.2856.2860.2862.2863.2865.2867.2869.2873.2874.2875.2876.2878.2880.2881.2882.2883.2884.2886.2887.2888.2889.2891.2893.2894.2895.2897.2898.2900.2901.2908.2909.2911.2912.2913.2914.2916.2917.2918.2919.2920.2922.2923.2924.2927.2929.2930.2931.2939.2940.2941.2942.2947.2949.2950.2956.2961.2962.2963.2964.2965.2966.2968.2970.2973.2974.2975.2979.2980.2981.2983.2985.2986.2987.2991.2994.2995.2997.2999.3000.3002.3003.3005.3008.3009.3010.3012.3016.3017.3018.3019.3024.3025.3028.3034.3037.3038.3043.3045.3048.3052.3053.3055.3058.3059.3063.3065.3066.3068.3070.3072.3073.3074.3075.3076.3077.3078.3089.3090.3093.3094.3095.3097.3099.3104.3106.3109.3112.3117.3118.3119.3120.3124.3126.3127.3128.3130.3135.3136.3145.3149.3150.3151.3154.3155.3162.3163.3167.3172.3173.3180.3182.3183.3184.3185.3187.3188.3189.3190.3194.3196.3197.3209.3210.3211.3214.3215.3217.3219.3222.3223.3225.3226.3227.3228.3230.3231.3232.3234.3235.3236.3237.3238.3240.3241.3244.3245.3250.3251.3253.3257.3260.3268.3270.3272.3281.3288.3290.3292.3293.3295.3296.3300.3306.3307.3308.3314.3315.3316; usprivacy=1YNN; r_p_s_n=1; g_state={"i_p":1660697070547,"i_l":3}; eupubconsent-v2=CPdZNngPdZNngAcABBENCcCsAP_AAH_AAChQI8Nf_X__b2_j-_5_f_t0eY1P9_7__-0zjhfdl-8N3f_X_L8X52M7vF36pq4KuR4Eu3LBIQdlHOHcTUmw6okVrzPsbk2cr7NKJ7PEmnMbOydYGH9_n1_zuZKY7_____7z_v-v______f_7-3f3__p_3_-__e_V_99zfn9_____9vP___9v-_9__________3_7BHYAkw1biALsyxwZtowigRAjCsJDqBQAUUAwtEFhA6uCnZXAT6whYAIBQhOBECHEFGDAIABBIAkIiAkCPBAIgCIBAACABUAhAAxsAgsALAwCAAUA0LFCKAIQJCDIgIjlMCAqRIKCeysQSg70NMIQ6zwAoNH_FQgI1kDFYGQkLByHBEgJeLJA8xRvkAIwQoBRKgAAAAA.f_gAD_gAAAAA; ses_id=Yy0%2BfzY5NT0ydj07YjMyNDRkZT5mZDo5MjEwNDU2Y3U2IjU7ZzA%2FeT4xOXdmZTAsZGY%2FNjRnOzhnZ2U%2FZDVuPmMzPjw2MjVuMmA9Z2JiMjI0MGVtZmM6MTJnMDU1OmNrNmU1YGdpPzI%2BYDljZjowbWR2PyM0cDsqZzVlNWQlbiljbD5%2FNmY1azIyPWViODI5NDRlPWZkOjEyOjAwNTJjezZ9; upa=eyJpbnZfcHJvX2Z1bm5lbCI6IiIsIm1haW5fYWMiOiIxIiwibWFpbl9zZWdtZW50IjoiNCIsImRpc3BsYXlfcmZtIjoiMTMzIiwiYWZmaW5pdHlfc2NvcmVfYWNfZXF1aXRpZXMiOiIxIiwiYWZmaW5pdHlfc2NvcmVfYWNfY3J5cHRvY3VycmVuY2llcyI6IjEiLCJhZmZpbml0eV9zY29yZV9hY19jdXJyZW5jaWVzIjoiMSIsImFjdGl2ZV9vbl9pb3NfYXBwIjoiMCIsImFjdGl2ZV9vbl9hbmRyb2lkX2FwcCI6IjAiLCJhY3RpdmVfb25fd2ViIjoiMSIsImludl9wcm9fdXNlcl9zY29yZSI6IjAifQ%3D%3D; geoC=BR; comment_notification_241051274=1; Adsfree_conversion_score=3; adsFreeSalePopUpdeda5d5861e687c9989e6aa28d58a4b4=1; gtmFired=OK; __cflb=0H28vFEFimnpowq71C5nfGdnLUwphqf2TBVSPtodC1S; OptanonConsent=isGpcEnabled=1&datestamp=Wed+Aug+17+2022+22%3A45%3A17+GMT-0300+(Brasilia+Standard+Time)&version=6.38.0&isIABGlobal=false&hosts=&consentId=70eca2a9-9b86-45af-805f-2b3510ccbdac&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CSTACK42%3A1&geolocation=BR%3BCE&AwaitingReconsent=false; smd=7a1fa69aa0178579a00afcdf55a8cb8a-1660789874',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
    },
  };

  const html = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  const $ = cheerio.load(html);

  let news = [
    {
      title: $(
        "#leftColumn > div.largeTitle > article:nth-child(1) > div.textDiv > a"
      ).text(),

      link:
        "https://br.investing.com" +
        $(
          "#leftColumn > div.largeTitle > article:nth-child(1) > div.textDiv > a"
        ).attr("href"),

      img: $(
        "#leftColumn > div.largeTitle > article:nth-child(1) > a > img"
      ).attr("data-src"),
    },
    {
      title: $(
        "#leftColumn > div.largeTitle > article:nth-child(2) > div.textDiv > a"
      ).text(),

      link:
        "https://br.investing.com" +
        $(
          "#leftColumn > div.largeTitle > article:nth-child(2) > div.textDiv > a"
        ).attr("href"),

      img: $(
        "#leftColumn > div.largeTitle > article:nth-child(2) > a > img"
      ).attr("data-src"),
    },
    {
      title: $(
        "#leftColumn > div.largeTitle > article:nth-child(3) > div.textDiv > a"
      ).text(),

      link:
        "https://br.investing.com" +
        $(
          "#leftColumn > div.largeTitle > article:nth-child(3) > div.textDiv > a"
        ).attr("href"),

      img: $(
        "#leftColumn > div.largeTitle > article:nth-child(3) > a > img"
      ).attr("data-src"),
    },
    {
      title: $(
        "#leftColumn > div.largeTitle > article:nth-child(4) > div.textDiv > a"
      ).text(),

      link:
        "https://br.investing.com" +
        $(
          "#leftColumn > div.largeTitle > article:nth-child(4) > div.textDiv > a"
        ).attr("href"),

      img: $(
        "#leftColumn > div.largeTitle > article:nth-child(4) > a > img"
      ).attr("data-src"),
    },
    {
      title: $(
        "#leftColumn > div.largeTitle > article:nth-child(5) > div.textDiv > a"
      ).text(),

      link:
        "https://br.investing.com" +
        $(
          "#leftColumn > div.largeTitle > article:nth-child(5) > div.textDiv > a"
        ).attr("href"),

      img: $(
        "#leftColumn > div.largeTitle > article:nth-child(5) > a > img"
      ).attr("data-src"),
    },
  ];

  return news;
}

module.exports.webScraper = main;
