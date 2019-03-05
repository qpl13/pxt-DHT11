//% color=#2159b2 icon="\uf2c9" block="DHT11"
namespace DHT11 {
    let pin = DigitalPin.P0;
    let init = false;
    function dht11Request(): void {
        pins.digitalWritePin(pin, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(pin)
        pins.setPull(pin, PinPullMode.PullUp);

    }


    //% blockId=setPin block="set DHT11 to pin %myPin"
    //% myPin.fieldEditor="gridpicker" myPin.fieldOptions.columns=4
    //% myPin.fieldOptions.tooltips="false" myPin.fieldOptions.width="300"
    export function setPin(myPin: DigitalPin): void {
        pin = myPin;
        init = true;
    }


    //% blockId=temperature block="temperature"    
    export function temperature(): number {
        if (init) {
            dht11Request();
            while (pins.digitalReadPin(pin) == 1);
            while (pins.digitalReadPin(pin) == 0);
            while (pins.digitalReadPin(pin) == 1);
            let value = 0;
            let counter = 0;

            for (let i = 0; i <= 32 - 1; i++) {
                while (pins.digitalReadPin(pin) == 0);
                counter = 0
                while (pins.digitalReadPin(pin) == 1) {
                    counter += 1;
                }
                if (i > 15) {
                    if (counter > 2) {
                        value = value + (1 << (31 - i));
                    }
                }
            }
            return ((value & 0x0000ff00) >> 8);
        }
        else
            return 0;
    }

    //% blockId=humidity block="humidity" 
    export function humidity(): number {
        if (init) {
            dht11Request();

            while (pins.digitalReadPin(pin) == 1);
            while (pins.digitalReadPin(pin) == 0);
            while (pins.digitalReadPin(pin) == 1);

            let value = 0;
            let counter = 0;

            for (let i = 0; i <= 8 - 1; i++) {
                while (pins.digitalReadPin(pin) == 0);
                counter = 0
                while (pins.digitalReadPin(pin) == 1) {
                    counter += 1;
                }
                if (counter > 3) {
                    value = value + (1 << (7 - i));
                }
            }
            return value;
        }
        else
            return 0;
    }
}  