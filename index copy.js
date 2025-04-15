// import { PdfReader } from "pdfreader";
// import pkg from "exceljs";
// const { ExcelJS } = pkg;
// const workbook = new pkg.Workbook();
// //const workbook = new ExcelJS.Workbook();
// const worksheet = workbook.addWorksheet("My Sheet");
// worksheet.columns = [
//   { header: "Book Name", key: "bn", width: 10 },
//   { header: "Word", key: "word", width: 32 },
//   { header: "Page Number", key: "pn", width: 15 },
//   { header: "Line Number", key: "ln", width: 15 },
// ];
// let rows = {}; // indexed by y-position
// function flushRows() {
//   Object.keys(rows) // => array of y-positions (type: float)
//     .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
//     //.forEach((y) => console.log('rowDataBywords:',(rows[y] || []).join("").split(" ")));
//     .forEach((y) =>
//       worksheet.addRow({ word: rows[y], pn: 2, ln: "not known" })
//     );
//   workbook.xlsx.writeFile("export.xlsx");
//   rows = {}; // clear rows for next page
// }
// new PdfReader().parseFileItems("sample.pdf", (err, item) => {
//   if (err) {
//     console.error({ err });
//   } else if (!item) {
//     flushRows();
//     console.log("END OF FILE");
//     console.log(item);
//   } else if (item.page) {
//     flushRows(); // print the rows of the previous page
//     console.log("PAGE:", item.page);
//   } else if (item.text) {
//     // accumulate text items into rows object, per line
//     (rows[item.y] = rows[item.y] || []).push(item.text);
//   }
// });

const fs = require("fs");
const pdf = require("pdf-parse");

// Function to parse PDF and extract words with page and line numbers
async function extractWordsWithPageAndLine(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);

  try {
    const data = await pdf(dataBuffer);
    // console.log(data.numpages);
    // Split pages
    const pages = data.text.split(/\f/);
    // console.log("pages", pages);
    const wordsByPageAndLine = [];

    pages.forEach((pageText, pageIndex) => {
      const lines = pageText.split("\n"); // Split text by lines

      lines.forEach((lineText, lineIndex) => {
        const words = lineText.trim().split(/\s+/); // Split line by words
        words.forEach((word) => {
          if (word) {
            wordsByPageAndLine.push({
              word: word,
              page: pageIndex + 1, // Pages start from 1
              line: lineIndex + 1, // Lines start from 1
            });
          }
        });
      });
    });

    console.log(wordsByPageAndLine);
  } catch (err) {
    console.error("Error extracting text from PDF:", err);
  }
}

// Call the function with the PDF path
extractWordsWithPageAndLine("sample1.pdf");
