
const CosmosClient = require('@azure/cosmos').CosmosClient;

const key = process.env.DB_KEY
const endpoint = process.env.DB_URL;

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