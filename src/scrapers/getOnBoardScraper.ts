import puppeteer from "puppeteer";
import type { Job } from "../types/jobsType.js"

const linkFilter = "https://www.getonbrd.com/empleos-desarrollador"

const getOnBoardJobs = async (): Promise<Job[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(linkFilter, { waitUntil: "networkidle2" });

  const cardJobs = await page.$$eval(".gb-results-list__item", items => {
    return items.map(item => {
      const title = item.querySelector(".gb-results-list__title strong")?.textContent?.trim() || ""
      const link = item.getAttribute("href") || ""
      const description = (item.querySelector(".location")?.textContent?.trim() || "").replace(/\n+/g, " ").trim()
      const source = "Get On Board"

      return {
        title,
        description,
        link,
        source
      }
    })
  })

  console.log(cardJobs.slice(0, 2));

  await browser.close();

  return cardJobs;
};

export { getOnBoardJobs }

