const puppeteer = require('puppeteer');

async function TraduzirEn(textoTraduzir) {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://translate.google.com.br/?hl=pt-BR&sl=pt&tl=en&text=${textoTraduzir}%20%0A%0A&op=translate`);

    //await page.type('textarea[aria-label="Texto de origem"]', 'teste', { delay: 200 });
    await page.keyboard.press("Enter", { delay: 2000 });

    const textoTraduzido = await page.evaluate(() => {
        const traducao = document.querySelector('.JLqJ4b').innerText;
        console.log(traducao);
        return traducao;

    });
    await browser.close();
    return textoTraduzido;
}

module.exports = { TraduzirEn }