import wwjs from 'whatsapp-web.js';
const { Client, LocalAuth } = wwjs;

let qrCodeImage = null;
let client;

const initializeClient = async () => {
    if (client) {
        await client.destroy();
        console.log("Cliente destruido.");
    }

    client = new Client({
        authStrategy: new LocalAuth({
          clientId: "client-one",
          dataPath: './path/to/store/auth',
        }),
        puppeteer: { headless: true }
    });

    client.on('qr', qr => {
        qrCodeImage = qr;
    });

    client.on('ready', async() => {
        console.log('Cliente de WhatsApp listo.');
        qrCodeImage = null
    });

    client.on('auth_failure', (msg) => {
        console.error('Error de autenticación:', msg);
    });

    client.on('disconnected', async () => {
        console.log('Cliente desconectado');
        //await initializeClient();
    });

    try {
        await client.initialize();
    } catch (error) {
        console.error('Error al inicializar el cliente de WhatsApp:', error);
    }
};
setTimeout(() => {
    initializeClient();
}, 100);

export { client, qrCodeImage };
