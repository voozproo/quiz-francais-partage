
// Sound effects for quiz interactions
export const playSound = (type: 'correct' | 'incorrect' | 'click' | 'complete') => {
  // Create audio context for web audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  switch (type) {
    case 'correct':
      // Happy ascending chord
      createTone(523.25, 0.2); // C5
      setTimeout(() => createTone(659.25, 0.2), 100); // E5
      setTimeout(() => createTone(783.99, 0.3), 200); // G5
      break;
    case 'incorrect':
      // Descending sad tone
      createTone(349.23, 0.3, 'sawtooth'); // F4
      setTimeout(() => createTone(293.66, 0.4, 'sawtooth'), 150); // D4
      break;
    case 'click':
      // Short click sound
      createTone(800, 0.1, 'square');
      break;
    case 'complete':
      // Celebration fanfare
      createTone(523.25, 0.15); // C5
      setTimeout(() => createTone(659.25, 0.15), 100); // E5
      setTimeout(() => createTone(783.99, 0.15), 200); // G5
      setTimeout(() => createTone(1046.50, 0.4), 300); // C6
      break;
  }
};
