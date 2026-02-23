export function generateGrid(realWords, decoys, wildcards) {
  const items = [];
  const allNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
  
  const uniqueRealWords = [...new Set(realWords)];
  const uniqueDecoys = [...new Set(decoys)];
  
  // Get numbers already taken by wildcards
  const wildcardNumbers = new Set(wildcards.map(w => w.number));
  
  // Remaining numbers for words and decoys
  const remainingNumbers = allNumbers.filter(n => !wildcardNumbers.has(n));
  // Shuffle without mutating
  const shuffled = [...remainingNumbers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Assign real words — ALWAYS assign all of them
  uniqueRealWords.forEach((word, idx) => {
    items.push({ number: shuffled[idx], type: 'word', content: word });
  });
  
  // Assign decoys — ALWAYS assign all of them
  uniqueDecoys.forEach((decoy, idx) => {
    const numberIdx = uniqueRealWords.length + idx;
    items.push({ number: shuffled[numberIdx], type: 'decoy', content: decoy });
  });
  
  // Add wildcards
  wildcards.forEach(wildcard => {
    items.push({ number: wildcard.number, type: 'wildcard', content: wildcard.type });
  });
  
  // Verify: every number 1-15 should appear exactly once
  const usedNumbers = new Set(items.map(i => i.number));
  if (usedNumbers.size !== 15) {
    console.error('GRID BUG: expected 15 unique numbers, got', usedNumbers.size,
      'words:', uniqueRealWords.length, 'decoys:', uniqueDecoys.length, 'wildcards:', wildcards.length,
      'remaining slots:', shuffled.length);
  }
  const wordItems = items.filter(i => i.type === 'word');
  if (wordItems.length !== uniqueRealWords.length) {
    console.error('GRID BUG: expected', uniqueRealWords.length, 'words, got', wordItems.length);
  }
  
  return items.sort((a, b) => a.number - b.number);
}

export function getGridLayout() {
  return [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9],
    [10, 11, 12],
    [13, 14],
    [15],
  ];
}
