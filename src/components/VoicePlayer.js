import { useEffect } from "react";
import { speakText } from "../services/elevenLabsService";

function VoicePlayer({ text, onFinish }) {

  useEffect(() => {
    if(text){
      speakText(text, onFinish);
    }
  }, [text]);

  return null;
}

export default VoicePlayer;