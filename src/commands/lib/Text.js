const NotionDB = require('../../notion/NotionDB');
const NotionPage = require('../../notion/NotionPage');

const Text = async (bot, msg) => {
    try {
        const chatId = msg.chat.id;
        const topicId = msg.message_thread_id || 1;
        const text = msg.text || '';
        
        console.log('Processing text message:', text);
        
        const notionDB = new NotionDB();
        const notionPage = new NotionPage();
        const pageId = await notionDB.getPageIdByTopicId(`${topicId}`);

        if (!pageId) {
            await bot.sendMessage(chatId, `No page found for topic_id: ${topicId}`);
            return;
        }

        await notionPage.insertText(pageId, text);
        console.log('Text saved to Notion successfully');
    } catch (error) {
        console.error('Error in Text handler:', error);
    }
};

module.exports = Text;
