(() => {

const startStream = async () => {
    navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    const v = document.querySelector('video')
    const cameraSelect = document.querySelector('#camera')
    let cameraSource = cameraSelect.value
    cameraSelect.onchange = startStream
    const constraints = {
        audio: false,
        video: {
            mandatory: {
            }
            ,
            optional: [{
                sourceId: cameraSource
            }]
        }
    }
    const devices = await navigator.mediaDevices.enumerateDevices()
    // .then(devices => {
        devices.forEach(device => {
            const option = document.createElement('option')
            if (device.kind === 'videoinput') {
                option.value = device.deviceId
                option.text = `${device.label}`
                console.log(device)
                cameraSelect.appendChild(option)
            }
        })
    // })
    const success = stream => {
        console.log('success!')
        v.srcObject = stream
        v.setAttribute('width', 240)
        v.setAttribute('height', 240)
        v.className = 'grayscale-filter'
        v.play()
    }
    const failure = err => {
        console.log(err)
    }
    navigator.getUserMedia(constraints, success, failure)
}

startStream()

})()
