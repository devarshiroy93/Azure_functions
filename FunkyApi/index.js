const CosmosClient = require('@azure/cosmos').CosmosClient;

const key = 'jwxfIl30f5xIygvEJx2gdyRErSbi9m5HCB4y6mBitNq8bjOlqPgU9uYnBeUV7dqk0920TNA0RvLMACDbP2d1uQ=='
const endpoint = 'https://funkyapi.documents.azure.com:443/'

const client = new CosmosClient({ endpoint, key });

const databaseId = 'task';
const containerId = 'task'

const database = client.database(databaseId);
const container = database.container(containerId);


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const body = context.req.body;
    const {description , category } = body;
    let taskItem = {
        description ,
        category ,
    }

    const {resource : createdItem} = await container.items.create(taskItem);
    const responseMessage = "TESTING AZURE FUNCTIONS"
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}