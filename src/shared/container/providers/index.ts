import {container} from "tsyringe";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

const diskStorage = {
    local: LocalStorageProvider,
    //s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
)