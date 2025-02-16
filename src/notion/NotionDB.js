const { Client } = require('@notionhq/client');
require('dotenv').config();

class NotionDB {
    constructor() {
        const notionApiKey = process.env.NOTION_API_KEY;
        const databaseId = process.env.NOTION_DATABASE_ID;

        if (!notionApiKey || !databaseId) {
            throw new Error('Missing required environment variables: NOTION_API_KEY or NOTION_DATABASE_ID');
        }

        this.notionClient = new Client({ auth: notionApiKey });
        this.databaseId = databaseId;
    }

    async getPageIdByTopicId(topicId) {
        try {
            console.log(`Searching for page with topic_id: ${topicId}`);
            
            const response = await this.notionClient.databases.query({
                database_id: this.databaseId,
                filter: {
                    property: 'topic_id',
                    rich_text: {
                        equals: topicId
                    }
                }
            });

            if (response.results.length > 0) {
                const page = response.results[0];
                const pageId = page.properties.page_id.rich_text[0].plain_text;
                console.log(`Found page with ID: ${pageId}`);
                return pageId;
            }

            console.log('No matching page found');
            return null;
        } catch (error) {
            console.error('Error querying Notion database:', error);
            return null;
        }
    }
}

module.exports = NotionDB;
