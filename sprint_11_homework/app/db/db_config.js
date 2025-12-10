let _client = null;

export function setClient(client) {
    _client = client;
};

export function getClient() {
    if (!_client) throw new Error('MongoClient not initialized. Call setClient(client) from app.js');
    return _client;
};

export function getDB(dbName) {
    const client = getClient();
    return client.db(dbName);
};

export async function closeClient() {
    if (_client) {
        await _client.close();
        _client = null
    };
};

export default { setClient, getClient, getDB, closeClient };