"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ChevronUp, Gauge, Pause, Play, Square, Volume2, X } from "lucide-react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DocTtsDockProps = {
  docTitle: string;
  readingTime: number;
  targetId: string;
};

type TtsBlock = {
  element: HTMLElement;
  text: string;
  kind: string;
};

type TtsSegment = {
  blockIndex: number;
  text: string;
};

const BLOCK_SELECTOR = "[data-tts-block='true']";
const RATE_STEPS = [0.95, 1, 1.15] as const;

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function splitTextToSegments(text: string) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return [];
  }

  const sentenceChunks = normalized
    .split(/(?<=[.!?。！？])\s+/)
    .map(normalizeText)
    .filter(Boolean);

  const sourceChunks = sentenceChunks.length > 0 ? sentenceChunks : [normalized];
  const segments: string[] = [];

  for (const chunk of sourceChunks) {
    if (chunk.length <= 90) {
      segments.push(chunk);
      continue;
    }

    const phraseChunks = chunk
      .split(/(?<=[,;:·])\s+/)
      .map(normalizeText)
      .filter(Boolean);

    const queue = phraseChunks.length > 0 ? phraseChunks : [chunk];

    for (const phrase of queue) {
      if (phrase.length <= 90) {
        segments.push(phrase);
        continue;
      }

      for (let start = 0; start < phrase.length; start += 90) {
        segments.push(phrase.slice(start, start + 90).trim());
      }
    }
  }

  return segments.filter(Boolean);
}

function getBlocks(targetId: string) {
  const root = document.getElementById(targetId);

  if (!root) {
    return [];
  }

  return Array.from(root.querySelectorAll<HTMLElement>(BLOCK_SELECTOR))
    .filter((element) => !element.parentElement?.closest(BLOCK_SELECTOR))
    .map((element) => ({
      element,
      text: normalizeText(element.innerText),
      kind: element.dataset.ttsKind ?? "paragraph",
    }))
    .filter((block) => block.text.length > 0);
}

function chooseKoreanVoice(voices: SpeechSynthesisVoice[]) {
  const priorities = [
    (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase() === "ko-kr",
    (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase().startsWith("ko"),
    (voice: SpeechSynthesisVoice) => /korean|한국|ko-kr/i.test(voice.name),
    (voice: SpeechSynthesisVoice) => voice.default,
  ];

  for (const matcher of priorities) {
    const match = voices.find(matcher);
    if (match) {
      return match;
    }
  }

  return voices[0] ?? null;
}

function scrollBlockIntoView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const topThreshold = viewportHeight * 0.18;
  const bottomThreshold = viewportHeight * 0.78;
  const isOutOfView = rect.top < topThreshold || rect.bottom > bottomThreshold;

  if (!isOutOfView) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

export function DocTtsDock({ docTitle, readingTime, targetId }: DocTtsDockProps) {
  const [isSupported, setIsSupported] = React.useState(false);
  const [blocks, setBlocks] = React.useState<TtsBlock[]>([]);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [rate, setRate] = React.useState<(typeof RATE_STEPS)[number]>(1);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const tokenRef = React.useRef(0);
  const activeIndexRef = React.useRef<number | null>(null);
  const blocksRef = React.useRef<TtsBlock[]>([]);
  const voiceRef = React.useRef<SpeechSynthesisVoice | null>(null);
  const rateRef = React.useRef(rate);
  const startTimeoutRef = React.useRef<number | null>(null);

  const selectedVoice = React.useMemo(() => chooseKoreanVoice(voices), [voices]);
  const segments = React.useMemo<TtsSegment[]>(
    () =>
      blocks.flatMap((block, blockIndex) =>
        splitTextToSegments(block.text).map((text) => ({
          blockIndex,
          text,
        })),
      ),
    [blocks],
  );
  const currentSegment = segments[currentSegmentIndex] ?? null;

  React.useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  React.useEffect(() => {
    voiceRef.current = selectedVoice;
  }, [selectedVoice]);

  React.useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  const clearStartTimeout = React.useCallback(() => {
    if (startTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(startTimeoutRef.current);
    startTimeoutRef.current = null;
  }, []);

  const clearActiveBlock = React.useCallback(() => {
    if (activeIndexRef.current === null) {
      return;
    }

    blocksRef.current[activeIndexRef.current]?.element.removeAttribute("data-tts-active");
    activeIndexRef.current = null;
  }, []);

  const setActiveBlock = React.useCallback(
    (index: number) => {
      clearActiveBlock();

      const block = blocksRef.current[index];
      if (!block) {
        return;
      }

      block.element.setAttribute("data-tts-active", "true");
      activeIndexRef.current = index;
      scrollBlockIntoView(block.element);
    },
    [clearActiveBlock],
  );

  const stopPlayback = React.useCallback(
    (resetIndex: boolean) => {
      tokenRef.current += 1;
      clearStartTimeout();

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      clearActiveBlock();
      setIsPlaying(false);
      setIsPaused(false);

      if (resetIndex) {
        setCurrentIndex(0);
        setCurrentSegmentIndex(0);
      }
    },
    [clearActiveBlock, clearStartTimeout],
  );

  const playFrom = React.useCallback(
    function playFrom(segmentIndex: number, allowVoiceFallback = true) {
      const nextBlocks = blocksRef.current;
      const nextSegments = nextBlocks.flatMap((block, blockIndex) =>
        splitTextToSegments(block.text).map((text) => ({
          blockIndex,
          text,
        })),
      );
      const segment = nextSegments[segmentIndex];
      const voice = voiceRef.current;

      if (!segment) {
        stopPlayback(true);
        return;
      }

      tokenRef.current += 1;
      const playbackToken = tokenRef.current;
      let didStart = false;

      clearStartTimeout();
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(segment.text);
      if (voice && allowVoiceFallback) {
        utterance.voice = voice;
      }
      utterance.lang = voice?.lang ?? "ko-KR";
      utterance.rate = rateRef.current;

      setCurrentSegmentIndex(segmentIndex);
      setCurrentIndex(segment.blockIndex);
      setActiveBlock(segment.blockIndex);
      setIsPlaying(true);
      setIsPaused(false);

      utterance.onstart = () => {
        if (playbackToken !== tokenRef.current) {
          return;
        }

        didStart = true;
        clearStartTimeout();
      };

      utterance.onpause = () => {
        if (playbackToken !== tokenRef.current) {
          return;
        }

        setIsPaused(true);
      };

      utterance.onresume = () => {
        if (playbackToken !== tokenRef.current) {
          return;
        }

        setIsPaused(false);
      };

      utterance.onend = () => {
        if (playbackToken !== tokenRef.current) {
          return;
        }

        clearStartTimeout();

        const nextIndex = segmentIndex + 1;

        if (nextIndex < nextSegments.length) {
          playFrom(nextIndex);
          return;
        }

        stopPlayback(true);
      };

      utterance.onerror = () => {
        if (playbackToken !== tokenRef.current) {
          return;
        }

        clearStartTimeout();
        stopPlayback(false);
        toast.error("음성 재생에 실패했습니다.");
      };

      window.speechSynthesis.speak(utterance);

      startTimeoutRef.current = window.setTimeout(() => {
        if (playbackToken !== tokenRef.current || didStart) {
          return;
        }

        window.speechSynthesis.cancel();

        if (allowVoiceFallback) {
          playFrom(segmentIndex, false);
          return;
        }

        stopPlayback(false);
        toast.error("브라우저 음성 재생을 시작하지 못했습니다.");
      }, 1500);
    },
    [clearStartTimeout, setActiveBlock, stopPlayback],
  );

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    setIsSupported(true);
    setBlocks(getBlocks(targetId));

    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      stopPlayback(false);
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [stopPlayback, targetId]);

  React.useEffect(() => {
    setBlocks(getBlocks(targetId));
  }, [targetId]);

  React.useEffect(() => {
    if (currentIndex < blocks.length) {
      return;
    }

    setCurrentIndex(0);
  }, [blocks, currentIndex]);

  React.useEffect(() => {
    if (currentSegmentIndex < segments.length) {
      return;
    }

    setCurrentSegmentIndex(0);
  }, [currentSegmentIndex, segments.length]);

  const getSegmentIndexForBlock = React.useCallback(
    (blockIndex: number) => segments.findIndex((segment) => segment.blockIndex === blockIndex),
    [segments],
  );

  const jumpToBlock = React.useCallback(
    (blockIndex: number) => {
      const nextBlockIndex = Math.max(0, Math.min(blockIndex, blocks.length - 1));
      const nextSegmentIndex = getSegmentIndexForBlock(nextBlockIndex);

      if (nextSegmentIndex === -1) {
        return;
      }

      setCurrentIndex(nextBlockIndex);
      setCurrentSegmentIndex(nextSegmentIndex);
      setActiveBlock(nextBlockIndex);

      if (isPlaying) {
        playFrom(nextSegmentIndex);
      }
    },
    [blocks.length, getSegmentIndexForBlock, isPlaying, playFrom, setActiveBlock],
  );

  const handleTogglePlayback = React.useCallback(() => {
    if (!isSupported) {
      toast.error("이 브라우저에서는 음성 읽기를 지원하지 않습니다.");
      return;
    }

    if (segments.length === 0) {
      toast.error("읽을 수 있는 본문을 찾지 못했습니다.");
      return;
    }

    if (!selectedVoice) {
      toast.error("사용 가능한 음성을 찾지 못했습니다.");
      return;
    }

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    playFrom(currentSegmentIndex);
  }, [currentSegmentIndex, isPaused, isPlaying, isSupported, playFrom, segments.length, selectedVoice]);

  const handleStop = React.useCallback(() => {
    if (!isSupported) {
      return;
    }

    stopPlayback(true);
  }, [isSupported, stopPlayback]);

  const handleRateChange = React.useCallback(() => {
    const currentStepIndex = RATE_STEPS.indexOf(rate);
    const nextRate = RATE_STEPS[(currentStepIndex + 1) % RATE_STEPS.length];
    setRate(nextRate);

    if (isPlaying && !isPaused) {
      playFrom(currentSegmentIndex);
    }
  }, [currentSegmentIndex, isPaused, isPlaying, playFrom, rate]);

  const currentBlock = blocks[currentIndex];
  const progressLabel = blocks.length > 0 ? `${currentIndex + 1}/${blocks.length}` : "0/0";
  if (!isMounted || !isSupported || blocks.length === 0) {
    return null;
  }

  const dock = isCollapsed ? (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4 pb-[max(env(safe-area-inset-bottom),0px)]">
      <button
        type="button"
        className="pointer-events-auto inline-flex max-w-[min(92vw,24rem)] items-center gap-3 rounded-full border border-border/70 bg-background/90 px-4 py-3 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.42)] backdrop-blur-xl transition-transform hover:-translate-y-0.5"
        onClick={() => setIsCollapsed(false)}
        aria-label="본문 듣기 펼치기"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {isPlaying && !isPaused ? (
            <Pause className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-sm font-semibold tracking-tight">본문 듣기</span>
          <span className="block truncate text-xs text-muted-foreground">
            {currentSegment?.text ?? currentBlock?.text ?? `${progressLabel} · ${docTitle}`}
          </span>
        </span>
        <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
      </button>
    </div>
  ) : (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4 pb-[max(env(safe-area-inset-bottom),0px)]">
      <div className="pointer-events-auto w-full max-w-md rounded-[1.75rem] border border-border/70 bg-background/88 p-3 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Volume2 className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight">본문 듣기</p>
                <p className="truncate text-xs text-muted-foreground">{docTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full border border-border/70 bg-background/70 p-1">
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-sm" }),
                      "rounded-full text-muted-foreground",
                    )}
                    onClick={() => jumpToBlock(currentIndex - 1)}
                    aria-label="이전 문단"
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="min-w-[3.5rem] px-1 text-center text-[11px] font-medium text-muted-foreground">
                    {progressLabel}
                  </span>
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-sm" }),
                      "rounded-full text-muted-foreground",
                    )}
                    onClick={() => jumpToBlock(currentIndex + 1)}
                    aria-label="다음 문단"
                    disabled={currentIndex >= blocks.length - 1}
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    "rounded-full text-muted-foreground",
                  )}
                  onClick={() => setIsCollapsed(true)}
                  aria-label="본문 듣기 숨기기"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <p
              className={cn(
                "mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground",
                currentBlock && "text-foreground/80",
              )}
            >
              {currentSegment?.text ?? currentBlock?.text ?? `${readingTime}분 분량 문서를 음성으로 읽습니다.`}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-[7rem] rounded-2xl shadow-sm",
              )}
              aria-label={isPlaying && !isPaused ? "일시정지" : "재생"}
              onClick={handleTogglePlayback}
            >
              {isPlaying && !isPaused ? (
                <>
                  <Pause className="size-5" />
                  일시정지
                </>
              ) : (
                <>
                  <Play className="size-5 fill-current" />
                  재생
                </>
              )}
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon-lg" }),
                "rounded-2xl",
              )}
              aria-label="정지"
              onClick={handleStop}
            >
              <Square className="size-4.5 fill-current" />
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-2xl px-3",
              )}
              aria-label={`재생 속도 ${rate}배`}
              onClick={handleRateChange}
            >
              <Gauge className="size-4" />
              {rate.toFixed(2).replace(/\.00$/, "")}x
            </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dock, document.body);
}
