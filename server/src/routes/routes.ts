import * as swaggerJSDoc from 'swagger-jsdoc';
import * as JSDocOptions from '../../../root/swaggerJSDocs';
import * as express from 'express';
import imagesHandler from './partials/imagesHandler';

export default function (app: express.Application) {
    app.use('/api/image', imagesHandler);
    app.set('view engine', 'ejs');

    app.get('/api-docs.json', function (req: express.Request, res: express.Response) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerJSDoc(JSDocOptions));
    });

    app.get('/test', async (req: express.Request, res: express.Response) => {
        res.json({ message: 'pass test!' });
    });

    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            if (Object.prototype.hasOwnProperty.call(err, 'status')) {
                return res.status(err.status || 500).send(err.message || err);
            } else {
                const parsedError = JSON.parse(err.message);
                return res
                    .status(parsedError.status || 500)
                    .send(parsedError.message || err.message || 'Unknown Error');
            }
        } catch (e) {
            return res.status(err.status || 500).send(err.message || err);
        }
    });
}
