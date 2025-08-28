# RedactX

RedactX is an NLP-based auto-redaction tool that allows users to redact sensitive information from text and documents (PDF, DOCX, TXT, images, etc.) using advanced regex and Named Entity Recognition (NER) techniques. The project features a modern React + Vite frontend, a FastAPI Python backend, and supports both web and Electron desktop deployment.

---

## Features

- **Text Redaction:** Redact sensitive information from user-inputted text.
- **File Redaction:** Upload and redact PDF, DOCX, TXT, CSV, XLSX, JPG, PNG, and LOG files.
- **Multiple Redaction Levels:** Choose from regex-based or various NER-based redaction methods.
- **Download Options:** Download redacted output as TXT, DOCX, or PDF.
- **User Authentication:** Register and login with security questions.
- **History:** View your last 25 redaction operations.
- **PWA Support:** Installable as a Progressive Web App.
- **Electron Desktop App:** Cross-platform desktop support.

---

## Project Structure

```
.
├── backend/                # FastAPI backend and redaction logic
│   ├── main.py
│   ├── ner.py
│   ├── regex.py
│   ├── ocr.py
│   ├── pdf.py
│   ├── form_data.db
│   └── ...
├── src/
│   ├── electron/           # Electron main process
│   └── ui/                 # React frontend (TypeScript)
├── dist-react/             # Production build output
├── public/                 # Static assets
├── .bolt/                  # Bolt config (if used)
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── dockerfile
└── ...
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **Python** (3.8+)
- **pip** (for Python dependencies)
- **Poppler** (for PDF processing, [Download here](http://blog.alivate.com.au/poppler-windows/))
- **Tesseract OCR** (for image-based PDF redaction, [Download here](https://github.com/tesseract-ocr/tesseract))

### Backend Setup

1. **Install Python dependencies:**
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

2. **Configure Tesseract and Poppler paths in `main.py` if needed.**

3. **Run the FastAPI backend:**
    ```sh
    uvicorn main:app --reload
    ```

### Frontend Setup

1. **Install Node dependencies:**
    ```sh
    npm install
    ```

2. **Start the development server:**
    ```sh
    npm run dev
    ```

3. **Build for production:**
    ```sh
    npm run build
    ```

### Electron Desktop App

1. **Build the frontend:**
    ```sh
    npm run build
    ```

2. **Start Electron:**
    ```sh
    npm run start
    ```

---

## Usage

- Access the app at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).
- Register a new user and log in.
- Choose between text or file redaction.
- Upload your document or enter text, select the redaction level, and download the redacted output.

---

## Configuration

- **Tailwind CSS** is used for styling (`tailwind.config.js`).
- **ESLint** is configured for code quality (`eslint.config.js`).
- **Vite** is used for fast frontend builds (`vite.config.ts`).
- **PWA** support via `vite-plugin-pwa`.

---

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Vite, Electron
- **Backend:** FastAPI, Python, PyPDF2, pytesseract, pdf2image, docx, pandas
- **Redaction:** Regex, spaCy NER (via `ner.py`)
- **Other:** Docker (optional), SQLite (for user data/history)

---

## License

This project is for educational and research purposes.

---

## Credits

- [spaCy](https://spacy.io/) for NER
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [Poppler](https://poppler.freedesktop.org/)
- [React](https://react.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)

---

## Troubleshooting

- **Poppler/Tesseract not found:** Ensure their paths are correctly set in `main.py`.
- **PDF/Image redaction errors:** Check that Poppler and Tesseract are installed and accessible.
- **Port conflicts:** Change the port in `vite.config.ts` or backend launch command if needed.

---

