const Start = async (bot, msg) => {
    try {
        const chatId = msg.chat.id;
        const username = msg.from?.username || msg.from?.first_name || 'User';
        
        console.log(`Sending welcome message to ${username} (${chatId})`);
        
        await bot.sendMessage(chatId, 
            `مرحباً ${username} في بوت Notion!\n\n` +
            `يمكنك إرسال أي نوع من الملفات (صور، فيديو، مستندات) وسأقوم بحفظها في Notion!`
        );
        
        console.log('Welcome message sent successfully');
    } catch (error) {
        console.error('Error in Start handler:', error);
    }
};

module.exports = Start;
