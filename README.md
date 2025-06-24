# 📄 PDF Processing Project

A Node.js utility for extracting and processing data from PDF files. This tool reads a PDF, extracts words along with their page and line numbers, and saves the results as a JSON file.

---

## ✨ Features

- **Extracts words** from PDF files
- **Tracks page and line numbers** for each word
- **Filters out short and special-character words**
- **Exports results** to a clean, readable JSON file

---

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/pdf-processing-project.git
cd pdf-processing-project
```

### 2. Install dependencies

```sh
npm install
```

### 3. Add your PDF

Place your PDF file (e.g., `Lecturesonvedanta.pdf`) in the project directory.

### 4. Run the script

```sh
npm start
```

The extracted word data will be saved to `word_data.json`.

---

## 🛠️ How It Works

- Reads the PDF file using [`pdf-parse`](https://www.npmjs.com/package/pdf-parse)
- Splits the text into pages and lines
- Extracts words, cleans them, and filters out words shorter than 4 characters
- Saves the output as a JSON array with word, page, and line information

---

## 📦 Project Structure

```
.
├── index.js             # Main script
├── Lecturesonvedanta.pdf# Sample PDF (add your own)
├── word_data.json       # Output file
├── package.json         # Project metadata
└── .gitignore
```

---

## 📋 Example Output

```json
[
  {
    "word": "Vedanta",
    "page": 0,
    "line": 1
  },
  {
    "word": "philosophy",
    "page": 0,
    "line": 2
  }
]
```

---

## 📚 Dependencies

- [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- [Node.js](https://nodejs.org/)
