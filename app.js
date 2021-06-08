const venom = require('venom-bot');
const { TraduzirEn } = require('./webscraping')

venom
    .create()
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {

    client.onMessage((message) => {
        if (message.body.startsWith('$') && message.body.length > 1) {
            TraduzirEn(message.body).then((textoTraduzido) => {
                client
                    .sendText(message.from, textoTraduzido)
                    .then((result) => {
                        console.log('Traduzido!')
                    })
                    .catch((erro) => {

                    });
            });
        }
        else if ((message.type === 'image' && message.caption.toLowerCase() === '#fig')) {
            client.downloadMedia(message).then(function (response) {
                convert(client, message, response);

            })
                .catch(function (erro) {
                    console.log(erro)
                })
        }




    });
}

function convert(client, message, response) {
    const fs = require("fs")
    const base = response.split(",")[1]
    fs.writeFileSync('./images/image.png', base, { encoding: 'base64' })
    client.sendImageAsSticker(message.from, './images/image.png').then(function (response) {

    })
        .catch(function (erro) {
            console.log(erro)
        })
}

function sticker(client, message) {
    let link = message.body.split(" ")[1]
    client.sendImageAsSticker(message.from, link)
        .then((result) => {
        })

        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });

}