//META{"name":"LongerMessages","version":"1.9.3","description":"Allows longer messages, up to 4000 characters without Nitro","author":"BMF","website":"https://github.com/mattswagyt/LongerMessages"}*//

console.log("LongerMessages plugin started.");

class LongerMessages {
  constructor() {
    // Increase the character limit for messages
    this.patchMessageCharacterLimit();
  }

  start() {
    // Start the plugin
    console.log("LongerMessages plugin started.");
  }

  stop() {
    // Stop the plugin
    console.log("LongerMessages plugin stopped.");
    this.restoreOriginalCharacterLimit();
  }

  patchMessageCharacterLimit() {
    // Get the original sendMessage function
    const originalSendMessage = BdApi.findModuleByProps("sendMessage").sendMessage;

    // Patch the sendMessage function to increase the character limit
    BdApi.findModuleByProps("sendMessage").sendMessage = async (e, t, n) => {
      if (t.length > 4000) {
        // Split the message into multiple parts if it's too long
        const parts = [];
        while (t.length > 0) {
          parts.push(t.substring(0, 4000));
          t = t.substring(4000);
        }

        // Send each part as a separate message
        for (const part of parts) {
          originalSendMessage.call(this, e, part, n);
        }
      } else {
        // Send the message as usual if it's within the character limit
        originalSendMessage.call(this, e, t, n);
      }
    };
  }

  restoreOriginalCharacterLimit() {
    // Restore the original sendMessage function
    const originalSendMessage = BdApi.findModuleByProps("sendMessage").sendMessage;
    BdApi.findModuleByProps("sendMessage").sendMessage = originalSendMessage;
  }
}

const longerMessages = new LongerMessages();
export default longerMessages;
