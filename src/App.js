import React, { useState, useEffect, useRef } from "react";
import { unlockAudio, preloadSpeech } from "./services/sarvamVoiceService";
import SlideViewer from "./components/SlideViewer";
import ChatBox from "./components/ChatBox";
import VoicePlayer from "./components/VoicePlayer";
import AvatarPresenter from "./components/AvatarPresenter";
import { slides } from "./slides/slidesData";
import LeadDashboard from "./components/LeadDashboard";
import SalesAnalytics from "./components/SalesAnalytics";
import CalendarBooking from "./components/CalendarBooking";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [started, setStarted] = useState(false);
  const [qaMode, setQaMode] = useState(false);
  const [qaIntroDone, setQaIntroDone] = useState(false);
  const [isMobileFull, setIsMobileFull] = useState(false);

  const containerRef = useRef(null);

  const leads = [
    {
      name: "Rahul",
      phone: "9876543210",
      status: "NEW",
      attempts: 1,
      demoTime: "5:00 PM",
    },
  ];

  /* FIX MOBILE VIEWPORT HEIGHT */
  useEffect(() => {
    const setMobileHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setMobileHeight();
    window.addEventListener("resize", setMobileHeight);
    return () => window.removeEventListener("resize", setMobileHeight);
  }, []);

  /* PRELOAD FIRST 2 SLIDES */
  useEffect(() => {
    if (started) {
      preloadSpeech(0, slides[0]?.voice);
      preloadSpeech(1, slides[1]?.voice);
    }
  }, [started]);

  /* FULLSCREEN TOGGLE */
  const toggleFullscreen = () => {
    if (window.innerWidth < 768) {
      setIsMobileFull(!isMobileFull);
    } else {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
      {/* WRAPPER START: This fixes the "Adjacent elements" error */}
      <div
        ref={containerRef}
        style={{
          fontFamily: "Arial",
          width: isMobileFull ? "100vw" : "100%",
          height: isMobileFull ? "calc(var(--vh, 1vh) * 100)" : "auto",
          position: isMobileFull ? "fixed" : "relative",
          top: 0,
          left: 0,
          background: "#000",
          zIndex: isMobileFull ? 9999 : "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AvatarPresenter speaking={speaking} />
        <SlideViewer slide={slides[currentSlide]} />

        {started && !qaMode && (
          <VoicePlayer
            key={"slide-" + currentSlide}
            text={slides[currentSlide]?.voice}
            slideIndex={currentSlide}
            onStart={() => setSpeaking(true)}
            onFinish={() => {
              setSpeaking(false);
              if (currentSlide === 19) {
                setQaMode(true);
                return;
              }
              nextSlide();
            }}
          />
        )}

        {qaMode && !qaIntroDone && (
          <VoicePlayer
            key="qa-intro"
            text="अगर आपका कोई सवाल है तो आप पूछ सकते हैं।"
            slideIndex={999}
            onStart={() => setSpeaking(true)}
            onFinish={() => {
              setSpeaking(false);
              setQaIntroDone(true);
            }}
          />
        )}

        {!isMobileFull && !document.fullscreenElement && (
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={prevSlide}>Previous</button>
            <button onClick={nextSlide}>Next</button>
            <button onClick={toggleFullscreen}>Fullscreen</button>
            {!started && (
              <button
                onClick={() => {
                  unlockAudio();
                  setStarted(true);
                }}
                style={{
                  background: "#2F80ED",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                }}
              >
                Start Presentation
              </button>
            )}
          </div>
        )}

        {qaMode && qaIntroDone && (
          <ChatBox
            setSpeaking={setSpeaking}
            autoStart={window.innerWidth > 768}
          />
        )}
      </div>

      {/* DASHBOARD COMPONENTS: Moved here inside the return statement */}
      <div style={{ padding: "20px", background: "#f4f4f4" }}>
        <LeadDashboard leads={leads} />
        <SalesAnalytics
          totalLeads={50}
          demosBooked={20}
          closedSales={8}
          referrals={15}
        />
        <CalendarBooking onBook={(booking) => console.log(booking)} />
      </div>
    </>
  );
}

export default App;