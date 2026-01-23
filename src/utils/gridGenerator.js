import { WILDCARD_TYPES } from '../constants';

export function generateGrid(realWords, decoys, wildcards, extraDecoysWithNumbers = []) {
  const items = [];
  const allNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
  
  // Ensure we have unique real words (remove duplicates)
  const uniqueRealWords = [...new Set(realWords)];
  const uniqueDecoys = [...new Set(decoys)];
  
  // Get numbers assigned to wildcards
  const wildcardNumbers = new Set(wildcards.map(w => w.number));
  
  // Get numbers that were replaced with decoys (from filtered wildcards)
  const replacedNumbers = new Set(extraDecoysWithNumbers.map(d => d.number));
  
  // Get remaining numbers for words and decoys (excluding wildcard numbers and replaced numbers)
  const remainingNumbers = allNumbers.filter(n => !wildcardNumbers.has(n) && !replacedNumbers.has(n));
  const shuffled = [...remainingNumbers].sort(() => Math.random() - 0.5);
  
  // Assign real words (should be 3 unique words)
  uniqueRealWords.forEach((word, idx) => {
    if (idx < shuffled.length) {
      items.push({
        number: shuffled[idx],
        type: 'word',
        content: word,
      });
    }
  });
  
  // Assign regular decoys
  uniqueDecoys.forEach((decoy, idx) => {
    const numberIdx = uniqueRealWords.length + idx;
    if (numberIdx < shuffled.length) {
      items.push({
        number: shuffled[numberIdx],
        type: 'decoy',
        content: decoy,
      });
    }
  });
  
  // Add decoys that replace filtered wildcards (at their original number positions)
  extraDecoysWithNumbers.forEach(decoyData => {
    items.push({
      number: decoyData.number,
      type: 'decoy',
      content: decoyData.content,
    });
  });
  
  // Add wildcards
  wildcards.forEach(wildcard => {
    items.push({
      number: wildcard.number,
      type: 'wildcard',
      content: wildcard.type,
    });
  });
  
  return items.sort((a, b) => a.number - b.number);
}

export function getGridLayout() {
  // Pyramid layout: 5, 4, 3, 2, 1
  return [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9],
    [10, 11, 12],
    [13, 14],
    [15],
  ];
}

