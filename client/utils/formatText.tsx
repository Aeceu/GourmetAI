export const renderFormattedText = (text: string) => {
  // Replace '**' with React Native's text styling syntax for bold
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "$1");
  // Replace '\n\n' with newline character in React Native
  formattedText = formattedText.replace(/\n\n/g, "\n");
  // Replace '*' with bullet point unicode character
  formattedText = formattedText.replace(/\*/g, "\u2022");
  // Replace '\n' with newline character in React Native
  formattedText = formattedText.replace(/\n/g, "\n\n");
  // Return the processed text
  return formattedText;
};
