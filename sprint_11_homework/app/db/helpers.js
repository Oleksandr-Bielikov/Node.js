import { getDB } from "./db_config.js";

const getCollection = (name) => {
    const db = getDB(process.env.DB_NAME);
    return db.collection(name);
};

const getCollectionData = async (collectionName, filters, options) => {
    const collection = getCollection(collectionName);
    const data = collection.find(filters);

    if (!options) return await data.toArray();
    else return await data.sort(options).toArray();
};

export const getUsersData = (filters, options) => getCollectionData("users", filters, options);
export const getTags = async () => {
    const collection = getCollection("users");
    const data = await collection.distinct("tags");
    return data;
};