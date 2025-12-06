import { getDb } from "./db.js";

const getCollection = (name) => {
    const db = getDb(process.env.DB_NAME);
    return db.collection(name);
};

const getAllDocuments = async (collectionName) => {
    const collection = getCollection(collectionName);
    const data = await collection.find().toArray();
    return data;
};

const getDocumentByField = async (collectionName, field, value) => {
    const collection = getCollection(collectionName);
    const data = await collection.findOne({ [field]: value });
    return data;
};

const getDocumentsByField = async (collectionName, field, value) => {
    const collection = getCollection(collectionName);
    return await collection.find({ [field]: value }).toArray();
};

const getLimitedDocuments = async (collectionName, limit) => {
    const collection = getCollection(collectionName);
    const data = await collection.find().limit(limit).toArray();
    return data;
};

export const getAboutData = () => getAllDocuments("pages");
export const getAllCategories = () => getAllDocuments("cat"); 
export const getAllGoods = () => getAllDocuments("goods");
export const getGoodsFor404 = () => getLimitedDocuments("goods", 3);
export const getCategory = (categoryName) => getDocumentByField("cat", "url", categoryName);
export const getItemByName = (itemName) => getDocumentByField("goods", "url", itemName);
export const getCategoryGoods = (categoryName) => getDocumentsByField("goods", "category", categoryName);