export default function limit(text: string, limit: number): string {
  const truncateAtWordBoundary = (text: string, limit: number): string => {
    if (text.length <= limit) return text;

    const truncated = text.substring(0, limit);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    let result;
    // If there is a space within the truncated string, cut there
    if (lastSpaceIndex > 0) {
      result = truncated.substring(0, lastSpaceIndex);
    } else {
      result = truncated;
    }

    // Remove punctuation marks if they appear at the end
    result = result.replace(/[.,!?]$/, '');

    return result + '...';
  };

  const limitedText = truncateAtWordBoundary(text, limit);
  return limitedText;
}
