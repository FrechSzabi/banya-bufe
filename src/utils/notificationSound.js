let audioContext = null;

/**
 * A böngészők csak felhasználói kattintás után engedik a hangot –
 * ezt a „Hang be" gomb hívja meg.
 */
export const unlockNotificationSound = () => {
  audioContext ??= new AudioContext();
  if (audioContext.state === 'suspended') audioContext.resume();
};

/** Rövid, kétütemű „csengő" hang, hangfájl nélkül. */
export const playNotificationSound = () => {
  if (!audioContext) return;

  [0, 0.18].forEach((offset, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + offset;

    oscillator.type = 'sine';
    oscillator.frequency.value = index === 0 ? 880 : 1175;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.3, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.4);
  });
};
