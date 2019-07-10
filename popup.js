var app = new Vue({
    el: "#app",
    data: {
        script: '',
        url: 'mys',
        run: false,
        steps: [{
            action: 'click',
            target: '#watch_find > span > input',
            time: 5
        }, {
            action: 'click',
            target: '#attack_form > div > span > input',
            time: 4
        }, ],
        actions: [
            'click', 'search'
        ],
        logs: [
            'Проверка скрипта',
            'Подготовка скрипта'
        ]
    },
    methods: {
        saveScript() {
            localStorage.setItem('script-' + this.script, JSON.stringify(this.steps))
        },
        toggleScript() {
            this.run = !this.run
            this.logs.push(this.run ? "Включили скрипт" : "Остановили скрипт")
        },
        findAndClick(step) {



            var vm = this
            this.logs.push('start find and click ' + JSON.stringify(step))
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "findAndClick",
                    step: step
                }, function (response) {
                    vm.logs.push('response ' + JSON.stringify(response))
                });
            });
            /*
            let targetElement = document.querySelector(step.target)
            if (targetElement) {
                targetElement.click()
                this.logs.push('Выполнено действие: ' + JSON.stringify(step))
            } else {
                this.logs.push('Не найдено элемента для ' + JSON.stringify(step))
            }
            */
        },
        testTab() {

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "findAndClick"
                }, function (response) {
                    this.logs.push('response ', response)
                });
            });
        }
    },

})