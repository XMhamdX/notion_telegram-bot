const { Client } = require('@notionhq/client');
require('dotenv').config();

class NotionPage {
    constructor() {
        const notionApiKey = process.env.NOTION_API_KEY;
        
        if (!notionApiKey) {
            throw new Error('Missing required environment variable: NOTION_API_KEY');
        }

        this.notionClient = new Client({ auth: notionApiKey });
    }

    async insert(pageId, url, caption = '') {
        try {
            console.log(`Inserting bookmark to page ${pageId} with URL: ${url}`);
            
            await this.notionClient.blocks.children.append({
                block_id: pageId,
                children: [
                    {
                        object: 'block',
                        type: 'bookmark',
                        bookmark: {
                            url: url,
                            caption: caption ? [
                                {
                                    type: 'text',
                                    text: {
                                        content: caption
                                    }
                                }
                            ] : []
                        }
                    }
                ]
            });

            console.log('Bookmark inserted successfully');
            return true;
        } catch (error) {
            console.error('Error inserting bookmark to Notion page:', error);
            return false;
        }
    }

    async insertText(pageId, text) {
        try {
            console.log(`Inserting text to page ${pageId}`);
            
            await this.notionClient.blocks.children.append({
                block_id: pageId,
                children: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        paragraph: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: text
                                    }
                                }
                            ]
                        }
                    }
                ]
            });

            console.log('Text inserted successfully');
            return true;
        } catch (error) {
            console.error('Error inserting text to Notion page:', error);
            return false;
        }
    }
}

module.exports = NotionPage;
