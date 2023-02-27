const express = require("express");
const app = express();
const port = 3001;
const puppeteer = require("puppeteer-core");
const { executablePath } = require("puppeteer");
const fs = require("fs");
const SALES2_COOKIE =
  "eyJpcCI6IjE0LjUyLjE3OS41OCIsImhpc3RvcnkiOlsiNDhjOWZhMDFhZDI4NGZlMmYzMTZmYjdkZjk2ZWJmNWIiLCI0Mzg4MzE2MmVhMDE4YjkzMjFlMTRhY2IwZjZjOTc2MiIsNTAwMDAwMDUsIjc3MzI5YTAwZTdkZDE1Zjk0ZWFiMWYxMWU1M2JkYjcxIiwiZDliOGE3NzRiZjQ2MjgwMTRjN2MwYjgyYjMwYjUxYzYiLCIzODlkMWMwMTM3ZWY3YTQ4YjI5MDk0NTM5YTgwYzc0ZSIsIjU1ZjY5YjZlZTMxMWM2ZDk2ZjJhNmVmMTM3MzYwNWI0Il0sImxhYmFuZ19vYmoiOnsiNTVmNjliNmVlMzExYzZkOTZmMmE2ZWYxMzczNjA1YjQiOiLsgrzshLHsoITsnpAg6rCk65+t7IucIFMyMyDsgqzsoITtjJDrp6QgMuywqCDrnbzsnbTruIwiLCIzODlkMWMwMTM3ZWY3YTQ4YjI5MDk0NTM5YTgwYzc0ZSI6IuyLoOuCmOuKlCDsi6DtlZnquLAg66+464uI66eJ7Iqk66GcIOykgOu5hCDsmYTro4whIiwiNzczMjlhMDBlN2RkMTVmOTRlYWIxZjExZTUzYmRiNzEiOiLwn6eh7YKo642U7Y287Y6Y7LigICAxKzFEQVkgTElWRfCfp6EiLCJkOWI4YTc3NGJmNDYyODAxNGM3YzBiODJiMzBiNTFjNiI6IvCfk7pUViDrj5nsi5zwn5O6IDIzU1Mg7Iug7IOBIDEwJSDsoIHrpr0g7LCs7IqkISIsIjQzODgzMTYyZWEwMThiOTMyMWUxNGFjYjBmNmM5NzYyIjoi7J6F7IaM66y464KcICfsoJzrgpjrsqgnIFBEUk4g7YGs66a8IOyZuCAxKzEiLCI0OGM5ZmEwMWFkMjg0ZmUyZjMxNmZiN2RmOTZlYmY1YiI6IuyCvOyEsSDqsKTrn63si5zrtoEzK+qwpOufreyLnO2DrSJ9LCJ1c2VyIjp7InVzZXJfaWQiOiJ6TkdNS0V4LW9FTmQ2QWdLVWJ4S2IiLCJuaWNrbmFtZSI6IuywjO2bhOuLnSIsInVzZXJfdHlwZSI6MCwidm91Y2hlciI6MCwibmV3YmllIjp0cnVlfX0=";
const SALES2_SIG_COOKIE = "oYOqq6GYQx5BY71HT-mYBHQGJq4";

app.get("/data", (req, res) => {
  (async () => {
    const cookies = {
      sales2: SALES2_COOKIE,
      "sales2.sig": SALES2_SIG_COOKIE,
    };
    const browser = await puppeteer.launch({
      executablePath: executablePath(),
    });

    // 사용자 쿠키 저장
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setCookie(
      ...Object.keys(cookies).map((key) => ({
        name: key,
        value: cookies[key],
        domain: "datalab.labangba.com/recruit",
      }))
    );
    await page.goto("https://datalab.labangba.com/recruit");

    // 페이지 렌더링하기 위해 서버에서 사전준비
    const data = await page.evaluate(() => {
      return __NEXT_DATA__;
    });

    const labangRanking = data.props.pageProps.labang_ranking;

    res.send(labangRanking); // server 에서 front 로 전달

    await browser.close(); // 브라우저 종료
  })();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
