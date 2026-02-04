"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type NowPlayingItem = {
  id: string;
  title: string;
  subtitle: string;
  coverSrc: string;
  audioSrc: string;
};

type NowPlayingContextValue = {
  queueKey: string | null;
  queue: NowPlayingItem[];
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLooping: boolean;
  isShuffling: boolean;
  currentItem: NowPlayingItem | null;
  play: (queueKey: string, queue: NowPlayingItem[], index: number) => void;
  toggle: (queueKey: string, queue: NowPlayingItem[], index: number) => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (time: number) => void;
  setVolume: (value: number) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
};

const NowPlayingContext = createContext<NowPlayingContextValue | null>(null);

export function NowPlayingProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queueKey, setQueueKey] = useState<string | null>(null);
  const [queue, setQueue] = useState<NowPlayingItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const stateRef = useRef({
    queue: [] as NowPlayingItem[],
    queueKey: null as string | null,
    currentIndex: 0,
    isShuffling: false,
  });

  useEffect(() => {
    stateRef.current = {
      queue,
      queueKey,
      currentIndex,
      isShuffling,
    };
  }, [queue, queueKey, currentIndex, isShuffling]);

  const attachAudioListeners = useCallback((audio: HTMLAudioElement) => {
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration || 0);
    });
    audio.addEventListener("play", () => {
      setIsPlaying(true);
    });
    audio.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    audio.addEventListener("ended", () => {
      if (audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(() => undefined);
        return;
      }
      const { queue: currentQueue, currentIndex: currentIdx, isShuffling: shuffle } =
        stateRef.current;
      if (!currentQueue.length) {
        setIsPlaying(false);
        return;
      }
      const nextIndex = shuffle
        ? Math.floor(Math.random() * currentQueue.length)
        : (currentIdx + 1) % currentQueue.length;
      playRef.current(stateRef.current.queueKey ?? "queue", currentQueue, nextIndex);
    });
  }, []);

  const ensureAudio = useCallback(
    (src?: string) => {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
        audioRef.current.loop = isLooping;
        audioRef.current.volume = volume;
        attachAudioListeners(audioRef.current);
      }
    },
    [attachAudioListeners, isLooping, volume]
  );

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const play = useCallback(
    (nextQueueKey: string, nextQueue: NowPlayingItem[], index: number) => {
      const nextItem = nextQueue[index];
      if (!nextItem) {
        return;
      }
      ensureAudio(nextItem.audioSrc);
      if (!audioRef.current) {
        return;
      }
      const isSameTrack =
        queueKey === nextQueueKey && currentIndex === index && audioRef.current.src;
      if (!isSameTrack) {
        audioRef.current.src = nextItem.audioSrc;
        audioRef.current.currentTime = 0;
      }
      audioRef.current.loop = isLooping;
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setQueueKey(nextQueueKey);
          setQueue(nextQueue);
          setCurrentIndex(index);
        })
        .catch(() => setIsPlaying(false));
    },
    [currentIndex, ensureAudio, isLooping, queueKey, volume]
  );

  const playRef = useRef(play);
  useEffect(() => {
    playRef.current = play;
  }, [play]);

  const toggle = useCallback(
    (nextQueueKey: string, nextQueue: NowPlayingItem[], index: number) => {
      if (queueKey === nextQueueKey && currentIndex === index && audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => setIsPlaying(false));
        } else {
          audioRef.current.pause();
        }
        return;
      }
      play(nextQueueKey, nextQueue, index);
    },
    [currentIndex, play, queueKey]
  );

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const next = useCallback(() => {
    if (!queue.length) {
      return;
    }
    const nextIndex = isShuffling
      ? Math.floor(Math.random() * queue.length)
      : (currentIndex + 1) % queue.length;
    play(queueKey ?? "queue", queue, nextIndex);
  }, [currentIndex, isShuffling, play, queue, queueKey]);

  const prev = useCallback(() => {
    if (!queue.length) {
      return;
    }
    const nextIndex = isShuffling
      ? Math.floor(Math.random() * queue.length)
      : (currentIndex - 1 + queue.length) % queue.length;
    play(queueKey ?? "queue", queue, nextIndex);
  }, [currentIndex, isShuffling, play, queue, queueKey]);

  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffling((prev) => !prev);
  }, []);

  const currentItem = useMemo(() => {
    if (!queue.length) {
      return null;
    }
    return queue[currentIndex] ?? null;
  }, [currentIndex, queue]);

  const value = useMemo<NowPlayingContextValue>(
    () => ({
      queueKey,
      queue,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      isLooping,
      isShuffling,
      currentItem,
      play,
      toggle,
      pause,
      next,
      prev,
      seekTo,
      setVolume,
      toggleLoop,
      toggleShuffle,
    }),
    [
      queueKey,
      queue,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      isLooping,
      isShuffling,
      currentItem,
      play,
      toggle,
      pause,
      next,
      prev,
      seekTo,
      setVolume,
      toggleLoop,
      toggleShuffle,
    ]
  );

  return <NowPlayingContext.Provider value={value}>{children}</NowPlayingContext.Provider>;
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext);
  if (!context) {
    throw new Error("useNowPlaying must be used within NowPlayingProvider");
  }
  return context;
}
