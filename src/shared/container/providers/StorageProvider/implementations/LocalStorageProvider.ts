import { IStorageProvider } from "../IStorageProvider";

import { resolve } from "path";
import upload from "../../../../../config/upload";

const fsPromises = require('fs').promises

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fsPromises.rename(
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );

        return file;
    }
    
    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

        try {
            await fsPromises.stat(filename);
        } catch {
            return;
        }
        await fsPromises.unlink(filename);
    }
}

export { LocalStorageProvider }