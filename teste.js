const { TraduzirEn } = require('./webscraping')

const texto = TraduzirEn('olá lucas!').then((res) => {
    console.log(res);
    return res;
})
console.log(texto);


