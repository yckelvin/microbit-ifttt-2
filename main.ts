input.onButtonPressed(Button.A, function () {
    alertOn = false
})
let security_distance = 0
let temperature = 0
let alertOn = false
microIoT.microIoT_initDisplay()
microIoT.microIoT_WIFI("DGINCB_WT6F", "20210601")
microIoT.microIoT_MQTT(
"vkW338gnR",
"DkZq38gnRz",
"DanDCZznR",
microIoT.SERVERS.English
)
basic.forever(function () {
    microIoT.microIoT_http_IFTTT("alert", "bWRj55XwiMaWDKZsBPM67s")
    if (temperature > 26) {
        microIoT.microIoT_http_post(
        "temperature is too high, please be cautious",
        "",
        "",
        2000
        )
        if (pins.digitalReadPin(DigitalPin.P16) == 0) {
            microIoT.microIoT_http_post(
            "emergency button is pressed. The elderly may be in danger.",
            "",
            "",
            2000
            )
        }
        if (alertOn == true) {
            microIoT.microIoT_http_post(
            "Alert! Somebody is entering your house.",
            "",
            "",
            2000
            )
        }
    }
})
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P0,
    true,
    false,
    true
    )
    dht11_dht22.selectTempType(tempType.celsius)
    temperature = dht11_dht22.readData(dataType.temperature)
    security_distance = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P13,
    PingUnit.MicroSeconds
    )
    microIoT.microIoT_showUserText(1, convertToText(pins.digitalReadPin(DigitalPin.P16)))
    microIoT.microIoT_showUserText(2, convertToText(temperature))
    basic.pause(2000)
})
basic.forever(function () {
    if (security_distance < 5) {
        alertOn = true
    }
})
