import { useEffect } from "react";
import { speakText } from "../services/voiceService";

function VoicePlayer({ text }) {

  useEffect(() => {
    speakText(text);
  }, [text]);

  return null;
}

export default VoicePlayer;