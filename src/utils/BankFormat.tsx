export function bankFormat(input: string): string {
  const words = input.split('');

  if (words.length === 3) {
    return input.toUpperCase(); // Convert to uppercase if exactly 3 words example BCA, BNI
  } else if (words.length > 3) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); // Capitalize the first letter if more than 3 words example Mandiri
  }

  // If it's a single word or less than 3 words, capitalize the first letter only
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); // Capitalize the first letter
}
