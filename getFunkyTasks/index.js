
const CosmosClient = require('@azure/cosmos').CosmosClient;

const key = 'jwxfIl30f5xIygvEJx2gdyRErSbi9m5HCB4y6mBitNq8bjOlqPgU9uYnBeUV7dqk0920TNA0RvLMACDbP2d1uQ=='
const endpoint = 'https://funkyapi.documents.azure.com:443/';

const client = new CosmosClient({ endpoint, key });

const databaseId = 'task';
const containerId = 'task'

const database = client.database(databaseId);
const container = database.container(containerId);

module.exports = async function (context, req) {
    
    const querySpec = {
        query: `SELECT * FROM ${container.id}`
    };
    const { resources } = await container.items.query(querySpec).fetchAll(); 


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            data : resources
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
}