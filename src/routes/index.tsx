import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useState, useRef, useEffect } from "react";
import { Petals } from "@/components/wedding/Petals";
import { Ornament } from "@/components/wedding/Ornament";
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpForm } from "@/components/wedding/RsvpForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wedding Ceremony — Harry John & Dr. Anju Agnes Tom" },
      {
        name: "description",
        content:
          "Mrs. Suja Mathew & Dr. K. P. John cordially invite your esteemed presence and prayerful blessings on the auspicious occasion of the Wedding Ceremony of their son Harry John with Dr. Anju Agnes Tom on Sunday, 1 November 2026.",
      },
      { property: "og:title", content: "Wedding Ceremony — Harry John & Dr. Anju Agnes Tom" },
      {
        property: "og:description",
        content: "“Therefore what God has joined together, let no one separate.” — Mark 10:9 | Wedding of Harry John & Dr. Anju Agnes Tom",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/og-preview.jpg" },
      { property: "og:image:secure_url", content: "/images/og-preview.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Wedding Ceremony — Harry John & Dr. Anju Agnes Tom" },
      { name: "twitter:description", content: "“Therefore what God has joined together, let no one separate.” — Mark 10:9 | Wedding of Harry John & Dr. Anju Agnes Tom" },
      { name: "twitter:image", content: "/images/og-preview.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Pinyon+Script&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: CelebrationApp,
});

const galleryImgs: { src: string; alt: string; subtitle?: string; pos?: string }[] = [
  {
    src: "/images/couple-04.jpg",
    alt: "Harry & Dr. Anju",
    subtitle: "Forever Together",
    pos: "object-center",
  },
  {
    src: "/images/couple-01.jpg",
    alt: "Blessings in Holy Matrimony",
    subtitle: "Sacred Church Ceremony",
    pos: "object-[center_35%]",
  },
  {
    src: "/images/couple-03.jpg",
    alt: "Two Hearts United in Love",
    subtitle: "Cherished Embrace",
    pos: "object-center",
  },
  {
    src: "/images/couple-02.jpg",
    alt: "Walking Hand in Hand Forever",
    subtitle: "Scenic Mountain Walk",
    pos: "object-center",
  },
  {
    src: "/images/couple-05.jpg",
    alt: "Grace & Sacred Traditions",
    subtitle: "Royal Heritage",
    pos: "object-center",
  },
  {
    src: "/images/couple-06.jpg",
    alt: "A Lifetime of Smiles & Joy",
    subtitle: "Joyous Beginnings",
    pos: "object-center",
  },
];

function CelebrationApp() {
  const [showIntro, setShowIntro] = useState(true);
  const [isFaded, setIsFaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const introVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setShowIntro(false);
      
      const startAudioOnInteraction = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
        }
        window.removeEventListener("click", startAudioOnInteraction);
        window.removeEventListener("touchstart", startAudioOnInteraction);
        window.removeEventListener("pointerdown", startAudioOnInteraction);
        window.removeEventListener("keydown", startAudioOnInteraction);
        window.removeEventListener("scroll", startAudioOnInteraction);
      };
      
      window.addEventListener("click", startAudioOnInteraction);
      window.addEventListener("touchstart", startAudioOnInteraction);
      window.addEventListener("pointerdown", startAudioOnInteraction);
      window.addEventListener("keydown", startAudioOnInteraction);
      window.addEventListener("scroll", startAudioOnInteraction);
      
      return () => {
        window.removeEventListener("click", startAudioOnInteraction);
        window.removeEventListener("touchstart", startAudioOnInteraction);
        window.removeEventListener("pointerdown", startAudioOnInteraction);
        window.removeEventListener("keydown", startAudioOnInteraction);
        window.removeEventListener("scroll", startAudioOnInteraction);
      };
    }
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImgs.length) % galleryImgs.length : null));
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImgs.length : null));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleComplete = () => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    setIsFaded(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1500);
  };

  const handleTimeUpdate = () => {
    const video = introVideoRef.current;
    if (video && video.duration && video.currentTime > 1 && video.duration - video.currentTime <= 0.5) {
      handleComplete();
    }
  };

  const handleIntroClick = () => {
    const video = introVideoRef.current;
    const audio = audioRef.current;

    if (!isPlaying && video) {
      setIsPlaying(true);
      video.play().catch((err) => {
        console.error("Play failed:", err);
      });
      if (audio) {
        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold/30">
      <Toaster position="top-center" richColors />
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
        preload="none"
        muted={isMuted}
      />
      {showIntro && (
        <div
          id="intro-screen"
          onClick={handleIntroClick}
          onTouchStart={(e) => {
            e.preventDefault();
            handleIntroClick();
          }}
          className={`fixed inset-0 z-50 cursor-pointer md:hidden pointer-events-${isFaded ? "none" : "auto"}`}
          style={{
            backgroundColor: "#f6f4f2",
            transition: "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: isFaded ? 0 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div 
            className="relative w-full h-full md:h-[85vh] md:max-w-[480px] md:rounded-sm md:overflow-hidden md:shadow-[0_20px_60px_rgba(0,0,0,0.65)] md:border-4 md:border-double md:border-sand/35 transition-all duration-300"
            style={{
              aspectRatio: "9/16",
            }}
          >
            <video
              id="intro-video"
              ref={introVideoRef}
              src="/intro-video.mp4#t=0.1"
              muted
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleComplete}
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = 0.1;
              }}
              onLoadedData={(e) => {
                e.currentTarget.currentTime = 0.1;
              }}
              className="w-full h-full object-cover"
              style={{
                transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isFaded ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>
        </div>
      )}
      <HeroVideo />
      <WelcomeMessageSection />
      <CountdownSection />
      <EventsBreakdownSection />
      <Gallery onOpenLightbox={(idx) => setLightboxIndex(idx)} />
      <Venue />
      <Footer />

      {/* Lightbox Modal */}
      <LightboxModal
        images={galleryImgs}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {!showIntro && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-ivory/90 text-primary backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-ivory hover:border-primary/45 shadow-[var(--shadow-soft)] cursor-pointer"
          aria-label={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate" }} />
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate", animationDelay: "0.2s" }} />
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate", animationDelay: "0.4s" }} />
              <span className="w-[3px] bg-primary rounded-full" style={{ animation: "soundbar 0.8s ease-in-out infinite alternate", animationDelay: "0.15s" }} />
            </div>
          )}
        </button>
      )}
    </div>
  );
}

function LightboxModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: { src: string; alt: string }[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  if (currentIndex === null) return null;

  const [downloading, setDownloading] = useState(false);
  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloading) return;
    setDownloading(true);

    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const cleanName = (currentImage.alt || "wedding-photo")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      link.download = `${cleanName || "wedding-photo"}-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback
      const link = document.createElement("a");
      link.href = currentImage.src;
      link.download = `harry-anju-wedding-${currentIndex + 1}.jpg`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-4 animate-fade-up select-none"
      onClick={onClose}
    >
      {/* Top Action Controls (Download & Close) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-full bg-black/60 hover:bg-sand hover:text-wine-deep text-white border border-white/25 hover:border-sand transition-all duration-300 shadow-lg text-xs font-sans-ui uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-60"
          title="Download photo"
        >
          {downloading ? (
            <svg className="animate-spin h-3.5 w-3.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          )}
          <span>{downloading ? "Saving..." : "Download"}</span>
        </button>

        <button
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/25 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Close Lightbox"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Prev Arrow */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-50 text-white/80 hover:text-white p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/25 transition hover:scale-110 cursor-pointer"
          aria-label="Previous Image"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Main Image View */}
      <div
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[72vh] sm:max-h-[76vh] object-contain rounded-sm border border-white/20 shadow-2xl"
        />

        {/* Caption & Quick Download Button */}
        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-center px-2">
            <p className="font-sans-ui text-xs sm:text-sm text-sand tracking-widest text-center drop-shadow-md font-medium">
              {currentImage.alt}
            </p>
            <span className="text-white/40">•</span>
            <span className="font-sans-ui text-xs text-white/70 tracking-widest">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-sand hover:bg-white text-wine-deep font-sans-ui text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer disabled:opacity-60"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{downloading ? "Downloading..." : "Download Photo"}</span>
          </button>
        </div>
      </div>

      {/* Next Arrow */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-50 text-white/80 hover:text-white p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/25 transition hover:scale-110 cursor-pointer"
          aria-label="Next Image"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch((err) => console.log("Hero video autoplay blocked:", err));
    };

    playVideo();

    window.addEventListener("touchstart", playVideo, { once: true });
    window.addEventListener("click", playVideo, { once: true });

    return () => {
      window.removeEventListener("touchstart", playVideo);
      window.removeEventListener("click", playVideo);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="video-container absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        <div className="overlay absolute inset-0 bg-black/45 backdrop-brightness-[0.85]" />
      </div>

      <Petals count={22} />

      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-4 sm:px-6 text-center text-ivory drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] py-10 sm:py-12 md:py-8">
        {/* Holy Cross */}
        <div className="animate-fade-up flex items-center gap-3 text-sand mb-2 sm:mb-3">
          <span className="h-px w-8 sm:w-12 bg-sand/60" />
          <svg width="20" height="28" viewBox="0 0 24 32" fill="currentColor" className="drop-shadow-md">
            <path d="M10 0H14V9H23V13H14V32H10V13H1V9H10V0Z" />
          </svg>
          <span className="h-px w-8 sm:w-12 bg-sand/60" />
        </div>

        <p className="animate-fade-up font-body italic text-sm sm:text-base text-sand/95 max-w-md px-2">
          “Therefore what God has joined together, let no one separate.”
        </p>
        <p className="animate-fade-up font-sans-ui text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-sand/80 font-semibold mb-2">
          MARK 10:9
        </p>

        <p className="animate-fade-up font-sans-ui text-[11px] sm:text-[13px] uppercase tracking-[0.45em] text-ivory/95 font-medium mt-1">
          You are cordially invited to celebrate the wedding of
        </p>

        <div className="animate-fade-up mt-3 sm:mt-5 flex flex-col items-center gap-1 sm:gap-2" style={{ animationDelay: "0.2s" }}>
          <span className="font-script text-5xl sm:text-7xl md:text-8xl text-sand drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
            Harry John
          </span>

          <div className="flex items-center justify-center gap-4 my-1 text-sand">
            <span className="font-script text-3xl sm:text-4xl text-sand font-bold">&amp;</span>
          </div>

          <span className="font-script text-5xl sm:text-7xl md:text-8xl text-sand drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
            Dr. Anju Agnes Tom
          </span>
        </div>

        <p className="animate-fade-up mt-4 sm:mt-5 max-w-xl font-body text-sm sm:text-base md:text-lg italic text-ivory/90 leading-relaxed" style={{ animationDelay: "0.4s" }}>
          As they unite their lives and hearts in holy matrimony by the grace of God.
        </p>

        <div className="animate-fade-up mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-sans-ui text-xs sm:text-sm uppercase tracking-[0.2em] text-sand" style={{ animationDelay: "0.6s" }}>
          <span>Sunday, 1 November 2026</span>
          <span className="hidden sm:inline text-ivory/40">•</span>
          <span>12:15 PM</span>
          <span className="hidden sm:inline text-ivory/40">•</span>
          <span>St. Joseph's Church, Kizhathadiyur, Pala</span>
        </div>

        {/* Premium Gold Glassmorphic Location Button */}
        <a
          href="#events"
          className="animate-fade-up mt-6 sm:mt-8 md:mt-6 inline-flex items-center gap-3 rounded-full border border-sand/50 bg-black/40 backdrop-blur-md px-8 sm:px-10 py-3.5 sm:py-4 font-sans-ui text-xs uppercase tracking-[0.35em] text-sand shadow-[0_6px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:bg-sand hover:text-wine-deep hover:border-sand hover:shadow-[0_8px_30px_rgba(212,175,55,0.45)] cursor-pointer group"
          style={{ animationDelay: "0.8s" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-sand group-hover:text-wine-deep transition-colors duration-300"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-semibold">View Events &amp; Locations</span>
        </a>
      </div>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 z-10 -translate-x-1/2 text-ivory/70 hidden sm:block">
        <div className="animate-shimmer flex flex-col items-center gap-1">
          <span className="font-sans-ui text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <span className="h-5 w-px bg-ivory/60" />
        </div>
      </div>
    </section>
  );
}

function WelcomeMessageSection() {
  return (
    <section className="relative bg-background py-20 sm:py-24 px-6 flex items-center justify-center">
      <div className="relative z-10 mx-auto w-full max-w-5xl rounded-sm border border-primary/20 bg-ivory p-8 sm:p-14 shadow-[var(--shadow-frame)] text-foreground">
        
        {/* Holy Scripture Top */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 text-primary/70 mb-3">
            <span className="h-px w-8 sm:w-12 bg-primary/30" />
            <svg width="18" height="24" viewBox="0 0 24 32" fill="currentColor">
              <path d="M10 0H14V9H23V13H14V32H10V13H1V9H10V0Z" />
            </svg>
            <span className="h-px w-8 sm:w-12 bg-primary/30" />
          </div>
          <p className="font-body text-xl sm:text-2xl italic text-primary leading-relaxed max-w-2xl mx-auto font-medium">
            “Therefore what God has joined together, let no one separate.”
          </p>
          <p className="mt-1 font-sans-ui text-xs uppercase tracking-[0.35em] text-primary/75 font-bold">
            MARK 10:9
          </p>
        </div>

        <div className="ornament-divider text-primary my-8">
          <span className="ornament-line" />
          <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
            <circle cx="16" cy="16" r="2" />
          </svg>
          <span className="ornament-line" />
        </div>

        {/* Heartfelt Invitation Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <Ornament label="With Joyful Hearts" />
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-primary font-semibold">
            Two Lives, One Sacred Journey
          </h2>
          <p className="font-body text-base sm:text-lg italic text-foreground/80 leading-relaxed mt-4">
            Mrs. Suja Mathew &amp; Dr. K. P. John have great pleasure in inviting you with family on the auspicious occasion of the Wedding Ceremony of their son
          </p>
        </div>

        {/* Couple Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto mt-10">
          
          {/* Groom Card */}
          <div className="relative rounded-md bg-ivory p-2 sm:p-2.5 shadow-[var(--shadow-frame)] border border-primary/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="border border-[#C59B27]/40 rounded-sm p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDC] text-center">
              
              <div>
                {/* Groom Royal Cameo Portrait */}
                <div className="relative mx-auto mb-4 w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 border-2 border-[#C59B27]/50 bg-gradient-to-tr from-[#C59B27]/40 via-ivory to-primary/30 shadow-md group">
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-sand/40">
                    <img
                      src="/images/groom.jpg"
                      alt="Harry John — The Groom"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-1 text-[#C59B27]">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C59B27]/60" />
                  <span className="font-sans-ui text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-bold">
                    The Groom
                  </span>
                  <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C59B27]/60" />
                </div>

                <h3 className="font-script text-4xl sm:text-5xl text-primary font-bold mt-1">
                  Harry John
                </h3>
              </div>

              {/* Family Lineage */}
              <div className="mt-6 pt-4 border-t border-primary/15 text-foreground/85 font-body text-sm sm:text-base leading-relaxed space-y-2">
                <p className="font-display text-lg sm:text-xl font-bold text-primary">
                  Son of Mrs. Suja Mathew &amp; Dr. K. P. John
                </p>
                <p className="font-sans-ui text-xs uppercase tracking-wider text-primary/75">
                  Kadukappillil House, Palackattumala P.O., Marangattupilly, Kottayam District
                </p>
                <p className="font-body text-xs italic text-foreground/70 pt-2 border-t border-primary/10">
                  (Grandson of late Mrs. Annamma Philip &amp; Mr. K. J. Philip, Kadukappillil, Palackattumala and Mrs. Aleykutty K. S. &amp; late Mr. P. V. Mathai, Punnolil, Paingottoor)
                </p>
              </div>

            </div>
          </div>

          {/* Bride Card */}
          <div className="relative rounded-md bg-ivory p-2 sm:p-2.5 shadow-[var(--shadow-frame)] border border-primary/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="border border-[#C59B27]/40 rounded-sm p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDC] text-center">
              
              <div>
                {/* Bride Royal Cameo Portrait */}
                <div className="relative mx-auto mb-4 w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 border-2 border-[#C59B27]/50 bg-gradient-to-tr from-[#C59B27]/40 via-ivory to-primary/30 shadow-md group">
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-sand/40">
                    <img
                      src="/images/bride.jpg"
                      alt="Dr. Anju Agnes Tom — The Bride"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-1 text-[#C59B27]">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C59B27]/60" />
                  <span className="font-sans-ui text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-bold">
                    The Bride
                  </span>
                  <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C59B27]/60" />
                </div>

                <h3 className="font-script text-4xl sm:text-5xl text-primary font-bold mt-1">
                  Dr. Anju Agnes Tom
                </h3>
              </div>

              {/* Family Lineage */}
              <div className="mt-6 pt-4 border-t border-primary/15 text-foreground/85 font-body text-sm sm:text-base leading-relaxed space-y-2">
                <p className="font-display text-lg sm:text-xl font-bold text-primary">
                  Daughter of Mrs. Jessy Thomas &amp; Mr. K. J. Thomas
                </p>
                <p className="font-sans-ui text-xs uppercase tracking-wider text-primary/75">
                  Kollikulavil House, Koovappally, Kanjirappally, Kottayam District
                </p>
                <p className="font-body text-xs italic text-foreground/70 pt-2 border-t border-primary/10">
                  (Granddaughter of Late Mariakutty &amp; Late K. V. Joseph, Kollikulavil, Koovappally, and Late Aleykutty Joseph &amp; Late Adv. P. J. Joseph Panamthottam, Chunkappara)
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Transition */}
        <div className="mt-12 text-center">
          <p className="font-body text-base sm:text-lg italic text-primary/90 max-w-xl mx-auto">
            "Your presence, love, and prayers will make our celebration truly complete."
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-primary/40">
            <span className="h-px w-16 bg-primary/20" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-sand">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="h-px w-16 bg-primary/20" />
          </div>
        </div>

      </div>
    </section>
  );
}

function EventsBreakdownSection() {
  return (
    <section id="events" className="relative bg-secondary py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Ornament label="The Sacred Celebrations" />
          <h2 className="font-display text-4xl sm:text-6xl text-primary font-semibold tracking-tight">
            Programme &amp; Celebrations
          </h2>
          <p className="mt-3 font-body text-base sm:text-lg italic text-foreground/80 max-w-xl mx-auto">
            We cordially invite your esteemed presence and prayerful blessings on the auspicious occasion of our Holy Matrimony and Reception.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* 1. Wedding Ceremony Card */}
          <div className="relative rounded-md bg-ivory p-2 sm:p-2.5 shadow-[var(--shadow-frame)] border-2 border-wine/40 transition-all duration-300 hover:shadow-2xl">
            <div className="border border-wine/30 rounded-sm p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F7EFE6]">
              
              <div>
                {/* Header Badge & Title */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2 text-wine">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-wine/60" />
                    <span className="text-xs">✦</span>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-wine/60" />
                  </div>
                  <span className="font-sans-ui text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-wine font-bold block mb-1">
                    Holy Matrimony
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">
                    The Wedding Ceremony
                  </h3>
                  <p className="font-script text-2xl sm:text-3xl text-wine mt-1">
                    United in Holy Grace
                  </p>
                </div>

                {/* Date & Time Divider */}
                <div className="my-6 py-3 border-y border-wine/20 text-center bg-wine/[0.04]">
                  <span className="font-display text-lg sm:text-xl font-bold tracking-wide text-primary block">
                    Sunday, 1 November 2026
                  </span>
                  <span className="font-sans-ui text-xs uppercase tracking-[0.3em] text-wine font-bold mt-1 block">
                    12:15 PM
                  </span>
                </div>

                {/* Event Locations */}
                <div className="space-y-4 text-center">
                  <div className="space-y-1">
                    <span className="font-sans-ui text-[10px] uppercase tracking-[0.3em] text-wine font-semibold block">
                      Sacred Nuptial Blessing
                    </span>
                    <h4 className="font-display text-2xl font-bold text-primary">
                      St. Joseph's Church
                    </h4>
                    <p className="font-body text-sm text-foreground/75">
                      Kizhathadiyur, Pala
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-5 border-t border-primary/15">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=St+Josephs+Church+Kizhathadiyur+Pala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-primary text-ivory hover:bg-wine-deep text-xs font-sans-ui uppercase tracking-[0.2em] font-semibold shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <span>📍 Church Location Map</span>
                  <span className="text-sm">↗</span>
                </a>
              </div>

            </div>
          </div>

          {/* 2. Wedding Reception Card */}
          <div className="relative rounded-md bg-ivory p-2 sm:p-2.5 shadow-[var(--shadow-frame)] border border-primary/20 transition-all duration-300 hover:shadow-2xl">
            <div className="border border-[#C59B27]/40 rounded-sm p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDC]">
              
              <div>
                {/* Header Badge & Title */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2 text-[#C59B27]">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C59B27]/60" />
                    <span className="text-xs">✦</span>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C59B27]/60" />
                  </div>
                  <span className="font-sans-ui text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C59B27] font-bold block mb-1">
                    Joyous Gathering
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">
                    The Wedding Reception
                  </h3>
                  <p className="font-script text-2xl sm:text-3xl text-primary/80 mt-1">
                    Dinner &amp; Fellowship
                  </p>
                </div>

                {/* Date & Time Divider */}
                <div className="my-6 py-3 border-y border-primary/15 text-center bg-secondary/30">
                  <span className="font-display text-lg sm:text-xl font-bold tracking-wide text-primary block">
                    Sunday, 1 November 2026
                  </span>
                  <span className="font-sans-ui text-xs uppercase tracking-[0.3em] text-[#C59B27] font-bold mt-1 block">
                    Immediately Following Ceremony
                  </span>
                </div>

                {/* Event Locations */}
                <div className="space-y-4 text-center">
                  <div className="space-y-1">
                    <span className="font-sans-ui text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold block">
                      Banquet &amp; Celebration
                    </span>
                    <h4 className="font-display text-2xl font-bold text-primary">
                      Sun Star Convention Centre
                    </h4>
                    <p className="font-body text-sm text-foreground/75">
                      Arunapuram, Pala
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-5 border-t border-primary/15">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sun+Star+Convention+Centre+Arunapuram+Pala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-primary text-ivory hover:bg-wine-deep text-xs font-sans-ui uppercase tracking-[0.2em] font-semibold shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <span>📍 Reception Location Map</span>
                  <span className="text-sm">↗</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}



function EventCalendar() {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  
  // November 2026 starts on Sunday (index 0) and has 30 days
  const calendarCells = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30
  ];

  return (
    <div className="w-[300px] sm:w-[340px] bg-ivory text-primary p-6 sm:p-8 rounded-sm shadow-[var(--shadow-frame)] border border-sand/30 flex flex-col items-center select-none">
      <h3 className="font-script text-4xl sm:text-5xl text-primary mb-4">
        November 2026
      </h3>
      
      <div className="grid grid-cols-7 gap-2 w-full text-center border-b border-primary/20 pb-2 mb-2">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="font-sans-ui text-[10px] sm:text-xs uppercase tracking-wider text-primary/75 font-semibold">
            {day}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-y-2 gap-x-2 w-full text-center">
        {calendarCells.map((day, idx) => {
          if (day === null) {
            return <div key={idx} className="aspect-square" />;
          }
          
          if (day === 1) {
            return (
              <div key={idx} className="relative flex items-center justify-center aspect-square" title="Wedding Ceremony & Reception · 1 Nov 2026">
                <svg className="absolute w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] text-wine fill-current drop-shadow-sm animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="relative z-10 text-white font-sans-ui text-[12px] sm:text-[14px] font-bold">
                  1
                </span>
              </div>
            );
          }
          
          return (
            <div key={idx} className="flex items-center justify-center aspect-square font-sans-ui text-[12px] sm:text-[14px] text-foreground/80 hover:text-primary transition-colors cursor-default">
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-primary/15 flex items-center justify-center gap-5 text-[10px] sm:text-xs font-sans-ui uppercase tracking-wider text-primary/80">
        <span className="flex items-center gap-1.5 font-medium">
          <svg className="w-3.5 h-3.5 text-wine fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          1 November: Wedding &amp; Reception
        </span>
      </div>
    </div>
  );
}

function CountdownSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0 animate-fade-in order-2 lg:order-1">
            <EventCalendar />
          </div>
          
          <div className="flex-grow text-center lg:text-left order-1 lg:order-2">
            <p className="font-sans-ui text-[10px] uppercase tracking-[0.5em] text-primary-foreground/70">
              Counting Down to the Special Day
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-white">Until We Celebrate Together</h2>
            <div className="mt-10">
              <Countdown />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ onOpenLightbox }: { onOpenLightbox: (index: number) => void }) {
  return (
    <section id="gallery" className="relative bg-secondary/60 py-20 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <Ornament label="Love &amp; Togetherness" />
        <h2 className="font-display text-5xl text-primary sm:text-6xl tracking-tight">Photo Gallery</h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-base sm:text-lg italic text-foreground/80 leading-relaxed">
          Glimpses of love, sacred promises, and the joyous beginning of our forever.
        </p>
      </div>

      {/* Luxury Royal Gallery Grid - 3 columns on desktop, 2 on tablet, perfectly preserving 2:3 portrait grandeur with zero cropping */}
      <div className="mx-auto mt-12 sm:mt-16 grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
        {galleryImgs.map((g, i) => (
          <div
            key={i}
            onClick={() => onOpenLightbox(i)}
            className="group relative rounded-sm p-2 sm:p-2.5 bg-ivory shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-sand/40 hover:border-sand hover:shadow-[0_20px_45px_rgba(127,1,31,0.14)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
          >
            {/* Outer Gold Hairline Frame with true 2:3 portrait aspect ratio */}
            <div className="relative overflow-hidden rounded-[2px] border border-sand/30 aspect-[2/3] w-full bg-sand/10">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 ${g.pos || "object-center"}`}
              />

              {/* Elegant Gold Corner Accents */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-sand/70 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-sand/70 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-sand/70 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-sand/70 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Floating Magnify Glass Pill */}
              <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 transform translate-y-1 group-hover:translate-y-0">
                <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-black/60 text-white backdrop-blur-md text-[11px] font-sans-ui uppercase tracking-wider border border-white/20 shadow-md">
                  <span>View</span>
                  <span className="text-xs">↗</span>
                </span>
              </div>

              {/* Subtle Gradient & Bottom Title Bar */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white drop-shadow-sm transition-opacity duration-300">
                <span className="font-sans-ui text-[10px] uppercase tracking-[0.3em] text-sand/90 font-medium block">
                  {g.subtitle}
                </span>
                <p className="font-display text-lg sm:text-xl font-medium tracking-wide text-white mt-0.5 leading-snug">
                  {g.alt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Helpful Hint */}
      <div className="mt-8 text-center">
        <p className="font-sans-ui text-xs uppercase tracking-[0.25em] text-primary/60">
          ✦ Click any photo to view in high resolution ✦
        </p>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="relative bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ornament label="Locations" />
          <h2 className="font-display text-5xl text-primary sm:text-6xl">Event Venues</h2>
          <p className="mx-auto mt-4 max-w-md font-body italic text-foreground/75">
            Directions and venue guides for our wedding celebrations.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <VenueCard
            badge="Holy Matrimony"
            icon="💒"
            title="St. Joseph's Church, Kizhathadiyur, Pala"
            subtitle="Sunday, 1 November 2026 · 12:15 PM"
            address="Kizhathadiyur, Pala, Kottayam District, Kerala"
            maps="https://www.google.com/maps/search/?api=1&query=St+Josephs+Church+Kizhathadiyur+Pala"
          />
          <VenueCard
            badge="Wedding Reception"
            icon="🥂"
            title="Sun Star Convention Centre"
            subtitle="Sunday, 1 November 2026 · Immediately Following Ceremony"
            address="Arunapuram, Pala, Kottayam District, Kerala"
            maps="https://www.google.com/maps/search/?api=1&query=Sun+Star+Convention+Centre+Arunapuram+Pala"
          />
        </div>
      </div>
    </section>
  );
}

function VenueCard({
  badge, icon, title, subtitle, address, maps,
}: { badge: string; icon: string; title: string; subtitle: string; address: string; maps: string }) {
  return (
    <article className="relative rounded-sm border border-primary/25 bg-ivory p-6 sm:p-8 backdrop-blur-sm shadow-[var(--shadow-soft)] flex flex-col justify-between hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans-ui text-[10px] uppercase tracking-[0.35em] font-bold text-primary/70">
            {badge}
          </span>
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="font-display text-2xl text-primary font-semibold leading-snug">{title}</h3>
        <p className="mt-2 font-sans-ui text-xs font-semibold text-wine uppercase tracking-wider">{subtitle}</p>
        <p className="mt-3 font-body text-base italic text-foreground/75 leading-relaxed">{address}</p>
      </div>
      <a
        href={maps}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 font-sans-ui text-[11px] uppercase tracking-[0.35em] text-primary font-semibold transition hover:opacity-75 self-start"
      >
        Open in Maps →
      </a>
    </article>
  );
}

function Footer() {
  const whatsappUrl =
    "https://wa.me/919747647421?text=" +
    encodeURIComponent(
      "Hi! I loved this website design and would like to create one like this."
    );

  return (
    <footer className="bg-primary py-16 px-4 sm:px-6 text-center text-primary-foreground border-t border-sand/20">
      <p className="font-display text-xl sm:text-2xl uppercase tracking-[0.3em] text-sand/90">
        Wedding Celebration
      </p>
      
      {/* Couple Names */}
      <h3 className="mt-2 font-script text-3xl sm:text-4xl md:text-5xl text-sand px-2 max-w-xl mx-auto leading-tight">
        Harry John &amp; Dr. Anju Agnes Tom
      </h3>

      {/* Date */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-sans-ui text-[11px] sm:text-xs uppercase tracking-[0.25em] text-primary-foreground/85 px-2">
        <span>01 · 11 · 2026</span>
        <span className="text-[#C59B27] text-[10px]">✦</span>
        <span>Sunday, 12:15 PM</span>
      </div>

      {/* Royal heart ornament divider */}
      <div className="flex items-center justify-center gap-3 my-5 text-sand/50">
        <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sand/40 to-transparent" />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-sand/80">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent via-sand/40 to-transparent" />
      </div>

      <p className="font-script text-xl sm:text-2xl md:text-3xl text-sand/90 px-4 max-w-lg mx-auto leading-relaxed">
        “Therefore what God has joined together, let no one separate.”
      </p>
      <p className="font-sans-ui text-xs uppercase tracking-[0.3em] text-sand/70 mt-1">
        — Mark 10:9 —
      </p>

      {/* GRANDPIX Branding & WhatsApp Direct Inquiry Link */}
      <div className="mt-14 pt-8 border-t border-sand/15 flex flex-col items-center justify-center">
        <p className="font-sans-ui text-[10px] uppercase tracking-[0.35em] text-sand/70 mb-3">
          Designed &amp; Crafted by
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105 cursor-pointer py-2 px-4"
          title="Contact Grandpix on WhatsApp to build your website"
        >
          <img
            src="/images/grandpix-logo.png"
            alt="GRANDPIX Logo"
            className="h-32 sm:h-44 md:h-52 max-w-[360px] sm:max-w-[480px] w-auto object-contain transition duration-300 group-hover:scale-105"
          />
          <span className="font-sans-ui text-[11px] sm:text-xs uppercase tracking-[0.25em] text-sand/90 group-hover:text-sand border-b border-sand/40 pb-0.5 transition-colors">
            Contact on WhatsApp →
          </span>
        </a>
      </div>
    </footer>
  );
}
