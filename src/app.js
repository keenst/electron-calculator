import key from './components/Key'
import CloseIcon from 'icons/Close'
import DarkModeIcon from 'icons/WeatherNight'
import LightModeIcon from 'icons/WhiteBalanceSunny'

const { ipcRenderer } = window.require('electron')
const { clipboard } = require('electron')

export default {
    mounted() {
        var binds = [ ['del', 'c'], '^', '/', 'backspace', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '', '0', '.', 'enter' ]

        for (let i = 0; i < binds.length; i++) {
            this.$mousetrap.bind(binds[i], () => { this.addToBuffer(this.buttons[i]) })
        }
    },
    components: {
        key,
        CloseIcon,
        DarkModeIcon,
        LightModeIcon
    },
    data() {
        return {
            buffer: 0,
            bufferDisplay: '0',
            memory: 0,
            memoryDisplay: '',
            operator: '',
            prevOperator: '',
            prevBuffer: 0,
            buttons: [
                'C', '^', '/', 'DEL',
                '7', '8', '9', '*',
                '4', '5', '6', '-',
                '1', '2', '3', '+',
                '+/-', '0', '.', '='
            ],
            darkMode: true,
            showingResult: false,
            startDecimal: false,
            showCopyMessage: false
        }
    },
    methods: {
        addToBuffer(input) {

            switch (input) {
                case 'CE':
                    this.buffer = 0
                    this.bufferDisplay = '0'
                    this.startDecimal = false
                    break

                case 'C':
                    this.memory = 0
                    this.memoryDisplay = ''
                    this.operator = ''
                    this.prevBuffer = 0
                    break

                case '^':
                case '/':
                case '*':
                case '-':
                case '+':
                    if (this.operator != '') {

                        this.calculate()

                        this.operator = input

                        this.memory = this.buffer

                        this.bufferDisplay = this.getDisplayNum(this.buffer)
                        this.memoryDisplay = this.getDisplayNum(this.memory) + ' ' + this.operator

                        break
                    }

                    this.operator = input

                    this.memory = this.buffer
                    this.buffer = 0

                    this.bufferDisplay = this.getDisplayNum(this.buffer)
                    this.memoryDisplay = this.getDisplayNum(this.memory) + ' ' + this.operator

                    break

                case '=':
                    if (this.operator == '' && this.prevOperator == '') break

                    if (this.operator == '') {
                        this.memory = this.buffer
                        this.buffer = this.prevBuffer
                    }

                    this.prevBuffer = this.buffer

                    this.calculate()

                    break

                case '+/-':
                    this.buffer *= -1
                    this.bufferDisplay = this.getDisplayNum(this.buffer)

                    break

                case '.':
                    if (this.bufferDisplay.toString().includes('.')) break

                    this.startDecimal = true
                    this.bufferDisplay += '.'

                    break

                case 'DEL':
                    if (this.buffer == 0) break

                    if (this.buffer.toString().length == 1) {
                        this.buffer = 0
                    } else {
                        this.buffer = parseFloat(this.buffer.toString().slice(0, -1))
                    }

                    this.bufferDisplay = this.getDisplayNum(this.buffer)

                    break

                default:
                    if (this.buffer.toString().length > 14) break

                    if (this.showingResult) {
                        if (this.operator == '') {
                            this.memoryDisplay = ''
                        }

                        this.buffer = 0
                        this.showingResult = false
                    }

                    if (this.startDecimal) {
                        input = '.' + input
                        this.startDecimal = false
                    }

                    this.buffer = parseFloat(this.buffer + input)
                    this.bufferDisplay = this.getDisplayNum(this.buffer)

                    break
            }

            if (this.buffer == 0) {
                this.buttons[0] = 'C'
            } else {
                this.buttons[0] = 'CE'
            }
        },
        getDisplayNum(input) {
            let num = input.toString()

            if (num.length == 0) {
                return '0'
            }

            if (num.length > 20)
                return Number.parseFloat(num).toExponential(17)
            else {
                if (!num.includes('.')) {
                    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }

                let numbers = num.split('.')[0]
                let decimals = num.split('.')[1]
                numbers = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                return numbers + '.' + decimals
            }
        },
        closeApp() {
            ipcRenderer.send('close')
        },
        calculate() {
            let operator = this.operator

            if (this.operator == '') {
                operator = this.prevOperator
            }

            this.memoryDisplay = 
                this.getDisplayNum(this.memory) + 
                ' ' + operator + ' ' + 
                this.getDisplayNum(this.buffer) + 
                ' ='

            switch (operator) {
                case '^':
                    this.buffer = Math.pow(this.memory, this.buffer)
                    break
                case '/':
                    this.buffer = this.memory / this.buffer
                     break
                case '*':
                    this.buffer = this.memory * this.buffer
                    break
                case '-':
                    this.buffer = this.memory - this.buffer
                    break
                case '+':
                    this.buffer = this.memory + this.buffer
                    break
            }

            this.bufferDisplay = this.getDisplayNum(this.buffer)

            this.memory = 0
            this.showingResult = true
            this.prevOperator = operator
            this.operator = ''
        },
        async copyToClipboard() {
            clipboard.writeText(this.buffer.toString())
            this.showCopyMessage = true

            setTimeout(() => {
                this.showCopyMessage = false
            }, 1000)
        }
    }
}