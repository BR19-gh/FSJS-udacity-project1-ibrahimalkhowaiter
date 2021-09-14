import { Request, Response } from 'express';

export default {
    validateImageParams(req: Request, res: Response, next: Function) {
        let imageId: string;
        let width: number;
        let height: number;

        if (!req.query.imageId) {
            return res.status(400).send("Can't proceed without Image ID");
        } else {
            imageId = req.query.imageId as string;
        }

        if (req.query.width && Number(req.query.width) <= 0) {
            return res.status(400).send(`Invalid "width" value: ${req.query.width}`);
        } else {
            width = Number(req.query.width) as number;
        }

        if (req.query.height && Number(req.query.height) <= 0) {
            return res.status(400).send(`Invalid "height" value: ${req.query.height}`);
        } else {
            height = Number(req.query.height) as number;
        }

        if (isNaN(Number(req.query.width)) || req.query.width == '') {
            if (req.query.width == '') {
                return res.status(400).send(`"width" is empty`);
            }
            return res
                .status(400)
                .send(`"width" is not a number value: ${req.query.width}, it's a ${typeof req.query.width}`);
        } else {
            width = Number(req.query.width) as number;
        }

        if (isNaN(Number(req.query.height)) || req.query.height == '') {
            if (req.query.height == '') {
                return res.status(400).send(`"height" is empty`);
            }
            return res
                .status(400)
                .send(`"height" is not a number value: ${req.query.height}, it's a ${typeof req.query.height}`);
        } else {
            height = Number(req.query.height) as number;
        }

        res.locals.imageId = imageId;
        res.locals.width = width;
        res.locals.height = height;
        next();
    },
};
