export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function createDomainExtension(input: string[]): string {
  let output = '';
  input.forEach((sub) => {
    output += '.' + sub;
  });
  return output;
}

export function createDomainPrefix(input: string[]): string {
  let output = '';
  input.forEach((sub) => {
    output += sub + '.';
  });
  return output;
}
