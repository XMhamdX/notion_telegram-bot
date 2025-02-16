const NotionDB = require('../../notion/NotionDB');
const NotionPage = require('../../notion/NotionPage');

const Messages = async (bot, msg) => {
    try {
        const chatId = msg.chat.id;
        const topicId = msg.message_thread_id || 1;
        const messageId = msg.message_id;
        const fileCaption = msg.caption || '';
        
        console.log('Processing message with caption:', fileCaption);
        
        const messageLink = `https://t.me/c/${chatId.toString().slice(4)}/${topicId}/${messageId}`;

        const notionDB = new NotionDB();
        const notionPage = new NotionPage();
        const pageId = await notionDB.getPageIdByTopicId(`${topicId}`);

        if (!pageId) {
            await bot.sendMessage(chatId, `No page found for topic_id: ${topicId}`);
            return;
        }

        await notionPage.insert(pageId, messageLink, fileCaption);
        console.log('Message saved to Notion successfully');
    } catch (error) {
        console.error('Error in Messages handler:', error);
    }
};

module.exports = Messages;
