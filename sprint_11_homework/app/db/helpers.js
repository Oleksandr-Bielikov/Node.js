import { getDB } from "./db_config.js";

const getCollection = (name) => {
    const db = getDB(process.env.DB_NAME);
    return db.collection(name);
};

const getAllDocuments = async (collectionName) => {
    const collection = getCollection(collectionName);
    const data = await collection.find().toArray();
    return data;
};

const getSortByAge = async (collectionName, filter) => {
    const collection = getCollection(collectionName);
    const data = await collection.find().sort({ age: filter }).toArray();
    return data;
};

const getSortByField = async (collectionName, field, filter) => {
    const collection = getCollection(collectionName);
    const data = await collection.find({ [field]: filter }).toArray();
    return data;
};

const getSortByFieldExists = async (collectionName, field) => {
    const collection = getCollection(collectionName);
    const data = await collection.find({ [field]: { $exists: true } }).toArray();
    return data;
};

export const getUsersData = () => getAllDocuments("users");
export const userAgeFilter = (filter) => getSortByAge("users", filter);
export const userRoleFilter = (filter) => getSortByField("users", "role", filter);
export const userTagsFilter = (filter) => getSortByField("users", "tags", filter);
export const userFieldFilter = (field) => getSortByFieldExists("users", field);
export const getTags = async () => {
    const collection = getCollection("users");
    const data = await collection.distinct("tags");
    return data;
};