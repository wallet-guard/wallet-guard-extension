// import { v4 as uuidv4 } from 'uuid';

// const conversationID = uuidv4();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  if (message.type === 'ASK_CHATGPT') {
    let originalActiveElement: any;
    let text;

    let activeElementTemp: HTMLElement;

    // If there's an active text input
    if (document && document.activeElement) {
      // type cast to any to avoid TS error
      activeElementTemp = document.activeElement as HTMLElement;
      if (
        activeElementTemp &&
        (activeElementTemp.isContentEditable ||
          activeElementTemp.nodeName.toUpperCase() === 'TEXTAREA' ||
          activeElementTemp.nodeName.toUpperCase() === 'INPUT')
      ) {
        // Set as original for later
        originalActiveElement = document.activeElement;
        // Use selected text or all text in the input
        text =
          document?.getSelection()?.toString().trim() ||
          (originalActiveElement.value || originalActiveElement.textContent).trim();
      } else {
        // If no active text input use any selected text on page
        text = document?.getSelection()?.toString().trim();
      }
    } else if (document) {
      // If no active text input use any selected text on page
      text = document?.getSelection()?.toString().trim();
    }

    if (!text) {
      alert(
        'No text found. Select this option after right clicking on a textarea that contains text or on a selected portion of text.'
      );
      return;
    }

    showLoadingCursor();

    console.log(
      JSON.stringify({
        conversationID: 12345,
        question: { content: text, role: 'user' },
        history: [],
      })
    );

    // Send the text to the API endpoint
    fetch('http://localhost:8080/chatweb3/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationID: '12345',
        question: { content: text, role: 'user' },
        history: [],
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        // Use original text element and fallback to current active text element
        const activeElement = originalActiveElement || (activeElementTemp.isContentEditable && document.activeElement);

        sendResponse({ type: 'CHATGPT_REPLY', data });

        restoreCursor();
      })
      .catch((error) => {
        restoreCursor();
        alert(
          "Error. Make sure you're running the server by following the instructions on https://github.com/gragland/chatgpt-chrome-extension. Also make sure you don't have an adblocker preventing requests to localhost:3000."
        );
        throw new Error(error);
      });
    return true;
  }
});

const showLoadingCursor = () => {
  const style = document.createElement('style');
  style.id = 'cursor_wait';
  style.innerHTML = `* {cursor: wait;}`;
  document.head.insertBefore(style, null);
};

const restoreCursor = () => {
  document?.getElementById('cursor_wait')?.remove();
};
