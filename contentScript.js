chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        console.log('request', request)
        console.log('sender', sender)
        console.log('sendResponse', sendResponse)

        if (request.type == "findAndClick") {
            console.log('findAndClick triggered')

            let clicked = false
            let targetElement = document.querySelector(request.step.target)

            if (targetElement) {
                targetElement.click()
                clicked = true

            }

            sendResponse({
                founded: !!targetElement,
                clicked: clicked
            });
        } else {
            console.log(123)
        }
    });

// alert('work')
console.log('work7');