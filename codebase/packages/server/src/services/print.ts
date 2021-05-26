import puppeteer, { PDFOptions, PaperFormat, PDFMargin } from 'puppeteer';

interface PageOptions {
  PDFOptions?: PDFOptions;
}

interface Viewport {
  width: number;
  height: number;
}

interface PrintParams {
  page: string;
  format: PaperFormat;
  scale?: number;
  landscape?: boolean;
  margin?: PDFMargin;
  viewport?: Viewport;
}

const getPDFBuffer = async (
  body: PrintParams,
  options: PageOptions = {},
): Promise<Buffer> => {
  const { PDFOptions = {} } = options;
  const url = body.page;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--disable-web-security',
    ],
  });
  const page = await browser.newPage();
  const defViewport = {
    width: 640,
    height: 480,
    deviceScaleFactor: 1,
    isLandscape: true,
    isMobile: false,
  };

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.setViewport(body.viewport || defViewport);

  const buffer: Buffer = await page.pdf({
    ...body,
    printBackground: true,
    ...PDFOptions,
  });
  await browser.close();

  return buffer;
};

export type { PrintParams };
export { getPDFBuffer };
