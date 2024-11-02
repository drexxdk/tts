"use client";

import HtmlDemo from "@/app/_features/tts/components/TTSDemoComponent";
import { useTTSSelection } from "@/app/_features/tts/hooks/useTTSSelection";
import "@vidstack/react/player/styles/base.css";

export interface IPollyObject {
  Audio: string[];
  Marks: IPollyMark[];
  Status: "Success"; // What else can it return?
}

export interface IPollyMark {
  end: string;
  start: string;
  time: string;
  type: string;
  value: string;
}

export default function TTS() {
  const { ttsSelection } = useTTSSelection();
  return (
    <>
      <header>
        <button
          className="bg-orange-500"
          onClick={() => {
            if (!ttsSelection) {
              return;
            }

            const utterance = new SpeechSynthesisUtterance();
            let wordIndex = 0;
            utterance.lang = "en-UK";
            utterance.rate = 1;

            utterance.onboundary = function (event) {
              if (!ttsSelection) {
                return;
              }
              if (event.name === "word") {
                const elem = ttsSelection.nodes[wordIndex];
                const range = document.createRange();
                range.setStart(elem.node, elem.startOffset);
                range.setEnd(elem.node, elem.endOffset);
                const highlight = new Highlight(range);
                CSS.highlights.set("word", highlight);
                wordIndex++;
              }
            };

            function setVoice() {
              const voices = speechSynthesis.getVoices();
              const desiredVoice = voices.find(
                (voice) =>
                  voice.name === "Microsoft George - English (United Kingdom)"
              );
              if (desiredVoice) {
                utterance.voice = desiredVoice;
              } else {
                console.error("Desired voice not found");
              }
            }

            // Ensure voices are loaded
            speechSynthesis.onvoiceschanged = function () {
              setVoice();
            };

            wordIndex = 0;
            utterance.text = ttsSelection.text;
            speechSynthesis.speak(utterance);
          }}
        >
          audio player
        </button>
      </header>
      <main>
        <HtmlDemo />
        <HtmlDemo />
        <HtmlDemo />
      </main>
    </>
  );
}