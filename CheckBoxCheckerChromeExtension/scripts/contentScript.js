const savedCheckboxAttributesAndMessageObject = {
    message: '',
    checkboxes: []
};

// ==========================================
// === Helper functions
// ==========================================

const toggleEventListenerAvailable = (toggle) => {
    toggle ? document.addEventListener('click', setClickedElementDetails) : document.removeEventListener('click', setClickedElementDetails);
};

const addHoverEffectToAllDomElements = () => {
    const elements = [...document.querySelectorAll('*:not(html):not(head):not(body)')];

    elements.forEach((element) => {
        element.classList.add('hover-effect');
    });
};

const getAllTargetedCheckboxElements = () => {
    const checkboxes = document.querySelectorAll('.targetThisElement input[type="checkbox"]');
    return checkboxes;
};

const removeHoverEffectFromAllDomElements = () => {
    const elements = [...document.querySelectorAll('*:not(html):not(head):not(body)')];

    elements.forEach((element) => {
        element.classList.remove('hover-effect');
    });

    const toggle = false;
    toggleEventListenerAvailable(toggle);
};

const pressSelectElementButton = () => {
    const toggle = true;

    addHoverEffectToAllDomElements();

    setTimeout(()=> {
        toggleEventListenerAvailable(toggle);
    } ,1);
};

const setClickedElementDetails = (event) => {
    removeHoverEffectFromAllDomElements();
    
    const element = event.target;
    const targetElement = 'targetThisElement';

    // Remove old targetElement(-s);
    try {
        const oldTargetElements = Array.from(document.getElementsByClassName(targetElement));
        oldTargetElements.forEach((oldTargetElement) => {
            oldTargetElement.classList.remove(targetElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }

    // Add new unique targetElement
    element.classList.add(targetElement);

    saveInitialCheckboxAttributes();
};

const restoreInitialCheckboxAttributes = () => {
    const checkboxes = getAllTargetedCheckboxElements();
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = savedCheckboxAttributesAndMessageObject.checkboxes[index];
    });
};

const saveInitialCheckboxAttributes = () => {
    savedCheckboxAttributesAndMessageObject.checkboxes = [];
    getAllTargetedCheckboxElements().forEach((element) => {
        savedCheckboxAttributesAndMessageObject.checkboxes.push(element.checked)
    });
};

const toggleChecked = (toggle) => {
    const checkboxes = getAllTargetedCheckboxElements();
    checkboxes.forEach((checkbox) => {
        if (toggle) {
            checkbox.checked = toggle;
        } else {
            checkbox.checked = toggle;
        }
    });
};

// Initiate below when .js file is done loading
(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        .hover-effect {
            transition: background-color 0.3s ease, outline 0.3s ease, color 0.3s ease;
        }
        
        .hover-effect:hover {
            background-color: lightblue;
            outline: 0.05vw solid darkblue;
            color: black;
        }
        
        .hover-effect.clicked {
            background-color: initial;
            outline: none;
            color: initial;
        }
    `;
    document.head.appendChild(styleElement);
})();

// Add event listener once
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request) {
        case 'selectElement':
            pressSelectElementButton();
            break;

        case 'restoreDefaults':
            restoreInitialCheckboxAttributes();
            break;

        case 'checkAll':
            toggleChecked(true);
            break;

        case 'unCheckAll':
            toggleChecked(false);
            break;

        default:
        // Do nothing
    }
});
