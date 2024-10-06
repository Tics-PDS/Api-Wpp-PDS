// routes.js
import { Router } from 'express';
import qrcode from 'qrcode';
import { client, qrCodeImage } from '../whatsapp-client.js';

const router = Router();

router.get('/qr', async (req, res) => {
    if (qrCodeImage) {
        qrcode.toDataURL(qrCodeImage, (err, url) => {
            if (err) {
                res.status(500).send('Error generando el código QR');
            } else {
                res.send(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Código QR</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f9;
                                color: #333;
                                text-align: center;
                                padding: 50px;
                            }
                            .container {
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                                display: inline-block;
                            }
                            h1 {
                                color: #28a745;
                                font-size: 24px;
                                margin-bottom: 20px;
                            }
                            img {
                                max-width: 100%;
                                height: auto;
                                border: 2px solid #28a745; /* Añadir borde verde */
                                border-radius: 5px; /* Esquinas redondeadas */
                            }
                            .description {
                                font-size: 18px;
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>¡Aquí está tu Código QR!</h1>
                            <img src="${url}" alt="Código QR">
                            <p class="description">Escanea el código QR para acceder a la información.</p>
                        </div>
                    </body>
                    </html>
                `);                
            }
        });
    } else {
        res.send('El código QR no está disponible. El bot ya puede estar autenticado o no se ha generado el QR.');
    }
});

/* router.post('/send', async(req, res) => {
    const {numTo, message} = req.body;
}) */

router.get('/send_inscription', async(req, res) => {
    console.log(req.query)
    const {cel, namechildren, nameparent} = req.query
    const idUser = `${cel}@c.us`;
    const me = `573007396419@c.us`;
    const msg = `Hola *${nameparent}*, te informamos que la inscripción al Campamento Infantil La Brújula Mágica para el menor *${namechildren}*, fue exitosa ✅⛺️`
    try {
        await client.sendMessage(me, msg);
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Mensaje Enviado</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f9;
                        color: #333;
                        text-align: center;
                        padding: 50px;
                    }
                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                        display: inline-block;
                        max-width: 600px;
                    }
                    h1 {
                        color: #28a745;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 18px;
                        margin: 10px 0;
                    }
                    .success-icon {
                        font-size: 50px;
                        color: #28a745;
                    }
                    .details {
                        background-color: #f9f9f9;
                        padding: 10px;
                        margin-top: 20px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        text-align: left;
                        display: inline-block;
                    }
                </style>
                <script>
                    setTimeout(() => {
                        window.close();
                    }, 1500);
                </script>
            </head>
            <body>
                <div class="container">
                    <div class="success-icon">✅</div>
                    <h1>¡Mensaje enviado con éxito!</h1>
                    <p>Tu mensaje ha sido enviado a <strong>${cel}</strong>.</p>
                    <div class="details">
                        <p><strong>Contenido del mensaje:</strong> ${msg}</p>
                        <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error al Enviar</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f9;
                        color: #333;
                        text-align: center;
                        padding: 50px;
                    }
                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                        display: inline-block;
                    }
                    h1 {
                        color: #dc3545;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 18px;
                        margin: 10px 0;
                    }
                    .error-icon {
                        font-size: 50px;
                        color: #dc3545;
                    }
                    .details {
                        background-color: #f9f9f9;
                        padding: 10px;
                        margin-top: 20px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        text-align: left;
                        display: inline-block;
                    }
                </style>
                <script>
                    setTimeout(() => {
                        window.close();
                    }, 1500);
                </script>
            </head>
            <body>
                <div class="container">
                    <div class="error-icon">❌</div>
                    <h1>¡Error al enviar el mensaje!</h1>
                    <p>No se pudo enviar el mensaje a <strong>${cel}</strong>.</p>
                    <div class="details">
                        <p><strong>Error:</strong> No se ha podido enviar el mensaje de WhatsApp, inténtalo de nuevo</p>
                        <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
    }    
})
export default router;
