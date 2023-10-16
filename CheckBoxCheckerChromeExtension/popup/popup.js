const sendActionToContentScript = async (button) => {
    const consoleMimic = document.getElementById("console-mimic");

    await button.element.addEventListener('click', async () => {
        // [Async] Get current active browser tab
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

        // Go through array of results (should just be one result)
        tabs.forEach((tab) => {
            // Send action to contentScript.js
            chrome.tabs.sendMessage(tab.id, button.action);
            // Communicate to user
            consoleMimic.innerHTML = button.message;
        });
    });
};

// Select Element
const selectElementButton = document.getElementById("select-element-for-checkbox");
if (selectElementButton) {
    sendActionToContentScript({
        element: selectElementButton,
        action: 'selectElement',
        message: 'Selecting an element...'
    });
    /** Feature
     * Enable disabled buttons when element is selected
     */
}

// Restore Defaults
const restoreDefaultsButton = document.getElementById("restore-defaults");
if (restoreDefaultsButton) {
    sendActionToContentScript({
        element: restoreDefaultsButton,
        action: 'restoreDefaults',
        message: 'Restored default values'
    });
}

// Check
const checkButton = document.getElementById("check-all");
if (checkButton) {
    sendActionToContentScript({
        element: checkButton,
        action: 'checkAll',
        message: 'Checked'
    });
}

// Un-Check
const unCheckButton = document.getElementById("un-check-all");
if (unCheckButton) {
    sendActionToContentScript({
        element: unCheckButton,
        action: 'unCheckAll',
        message: 'Un-checked'
    });
}
