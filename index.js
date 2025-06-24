const fs = require("fs");
const pdfParse = require("pdf-parse");

// Function to extract words with accurate page and line numbers
async function extractWordsWithPageAndLine(pdfPath) {
  const pdfBuffer = fs.readFileSync(pdfPath);

  try {
    const data = await pdfParse(pdfBuffer);

    const result = [];
    const pages = data.text.split("\n\n"); // Pages are separated by a form feed character (\f)

    pages.forEach((pageContent, pageIndex) => {
      const lines = pageContent.split("\n"); // Split each page into lines
      lines.forEach((lineContent, lineIndex) => {
        const words = lineContent.trim().split(/\s+/); // Split line into words
        words.forEach((word) => {
          // Remove special characters
          const cleanedWord = word.replace(/[^\p{L}]/gu, "");
          if (cleanedWord && cleanedWord.length > 3) {
            result.push({
              word: word,
              page: pageIndex,
              line: lineIndex + 1, // Line number starts at 1
            });
          }
        });
      });
    });

    return result;
  } catch (error) {
    console.error("Error parsing PDF:", error);
  }
}

// Main function to process the PDF and save the output
(async function () {
  const pdfPath = "Lecturesonvedanta.pdf"; // Replace with your PDF file path
  try {
    const wordsData = await extractWordsWithPageAndLine(pdfPath);

    const outputPath = "word_data.json";
    fs.writeFileSync(outputPath, JSON.stringify(wordsData, null, 2));
    console.log(`Word data has been saved to ${outputPath}`);
  } catch (error) {
    console.error("Error processing PDF:", error);
  }
})();
