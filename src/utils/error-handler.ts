import {Response} from "express";

export function errorHandler(res: Response, error: Error): void {
    res.status(500).json({
        message: error?.message || error || `unknown error`,
    });
}
