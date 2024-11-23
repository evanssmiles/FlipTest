export function bankFormat(input: string): string {
  const words = input.split('');

  if (words.length <= 4) {
    return input.toUpperCase(); // Convert to uppercase if less or equal to 4 words example BCA, BNI, BTPN
  } else if (words.length > 4) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); // Capitalize the first letter if more than 4 words example Mandiri
  }

  // Default condition
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); // Capitalize the first letter
}
