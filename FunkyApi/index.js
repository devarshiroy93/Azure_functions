const CosmosClient = require('@azure/cosmos').CosmosClient;


const key = process.env.DB_KEY
const endpoint = process.env.DB_URL;

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