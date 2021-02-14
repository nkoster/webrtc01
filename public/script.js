(() => {

const startStream = async () => {

    navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    const v = document.querySelector('video')
    const cameraSelect = document.querySelector('#camera')
    const imageCanvas = document.querySelector('#imageCanvas')
    const image = document.querySelector('#image')
    const takePictureButton = document.querySelector('#takePictureButton')
    const videoTag = document.querySelector('#videoTag')
    
    let streaming = false

    let width = 240, height = 240

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

    devices.forEach(device => {
        const option = document.createElement('option')
        if (device.kind === 'videoinput') {
            option.value = device.deviceId
            option.text = `${device.label}`
            console.log(device)
            cameraSelect.appendChild(option)
        }
    })

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

    const takePicture = () => {
        const context = imageCanvas.getContext('2d')
        imageCanvas.width = width
        imageCanvas.height = height
        context.drawImage(videoTag, 0, 0, width, height)
        const data = imageCanvas.toDataURL('image/png')
        image.setAttribute('src', data)
    }

    videoTag.addEventListener('canplay', evt => {
        if (!streaming) {
            height = videoTag.videoHeight / (videoTag.videoWidth / width)
            if (isNaN(height)) {
                height = width / (4 / 3)
            }
            videoTag.setAttribute('width', width)
            videoTag.setAttribute('height', height)
            imageCanvas.setAttribute('width', width)
            imageCanvas.setAttribute('height', height)
            streaming = true
        }
    })

    takePictureButton.addEventListener('click', evt => {
        takePicture()
        evt.preventDefault()
    }, false)

    navigator.getUserMedia(constraints, success, failure)

}

startStream()

})()
