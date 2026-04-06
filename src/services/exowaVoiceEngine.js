/* =========================================
EXOWA REAL TIME VOICE ENGINE
Safari compatible
WebSocket streaming
Low latency audio playback
========================================= */

class ExowaVoiceEngine {

constructor(){

this.ws = null
this.audioContext = null
this.processor = null
this.stream = null
this.source = null

this.sampleRate = 16000

this.playQueue = []
this.isPlaying = false

}


/* START VOICE SESSION */

async start(){

console.log("Voice engine starting...")

/* MIC ACCESS */

this.stream = await navigator.mediaDevices.getUserMedia({
audio:true
})

/* AUDIO CONTEXT */

this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
sampleRate:this.sampleRate
})

this.source = this.audioContext.createMediaStreamSource(this.stream)


/* PROCESSOR */

this.processor = this.audioContext.createScriptProcessor(4096,1,1)

this.processor.onaudioprocess = (e)=>{

if(!this.ws || this.ws.readyState !== 1) return

const input = e.inputBuffer.getChannelData(0)

const pcm = this.convertFloatToPCM(input)

this.ws.send(pcm)

}

this.source.connect(this.processor)
this.processor.connect(this.audioContext.destination)


/* CONNECT WEBSOCKET */

await this.connectSocket()

}



/* CONNECT SOCKET */

async connectSocket(){

console.log("Connecting websocket...")

const response = await fetch("/.netlify/functions/getVoiceSocket")

const data = await response.json()

const url = data.url

console.log("Socket URL:",url)

this.ws = new WebSocket(url)

this.ws.binaryType = "arraybuffer"


this.ws.onopen = ()=>{

console.log("Voice socket connected")

this.ws.send(JSON.stringify({
type:"interaction_start"
}))

}


this.ws.onmessage = (event)=>{

this.handleServerMessage(event.data)

}


this.ws.onclose = ()=>{

console.log("Voice socket closed")

}


}



/* HANDLE SERVER MESSAGE */

handleServerMessage(data){

try{

const message = JSON.parse(data)

if(message.type === "audio_chunk"){

this.queueAudio(message.audio)

}

}catch(e){

console.log("Binary audio chunk")

this.queueAudio(data)

}

}



/* QUEUE AUDIO */

queueAudio(base64Audio){

let arrayBuffer

if(typeof base64Audio === "string"){

const binary = atob(base64Audio)

const len = binary.length

const bytes = new Uint8Array(len)

for(let i=0;i<len;i++){
bytes[i] = binary.charCodeAt(i)
}

arrayBuffer = bytes.buffer

}else{

arrayBuffer = base64Audio

}

this.playQueue.push(arrayBuffer)

if(!this.isPlaying){

this.playNext()

}

}



/* PLAY NEXT CHUNK */

async playNext(){

if(this.playQueue.length === 0){

this.isPlaying = false
return

}

this.isPlaying = true

const chunk = this.playQueue.shift()

const audioBuffer = await this.audioContext.decodeAudioData(chunk)

const source = this.audioContext.createBufferSource()

source.buffer = audioBuffer

source.connect(this.audioContext.destination)

source.start(0)

source.onended = ()=>{

this.playNext()

}

}



/* PCM CONVERTER */

convertFloatToPCM(input){

const buffer = new ArrayBuffer(input.length * 2)

const view = new DataView(buffer)

let offset = 0

for(let i=0;i<input.length;i++,offset+=2){

let s = Math.max(-1,Math.min(1,input[i]))

view.setInt16(offset,s<0 ? s*0x8000 : s*0x7FFF,true)

}

return buffer

}



/* STOP ENGINE */

stop(){

if(this.ws){

this.ws.close()
this.ws = null
}

if(this.processor){

this.processor.disconnect()
this.processor = null
}

if(this.source){

this.source.disconnect()
}

if(this.stream){

this.stream.getTracks().forEach(t=>t.stop())
}

console.log("Voice engine stopped")

}

}


const voiceEngine = new ExowaVoiceEngine()

export default voiceEngine