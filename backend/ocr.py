import pytesseract
from pdf2image import convert_from_path
import pandas as pd
from io import BytesIO

# Optional: Specify Tesseract path if needed
# pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"

def extract_ocr_to_csv(pdf_file: BytesIO, output_csv="ocr_output.csv"):
    """
    Extract OCR text and positional data from a PDF file-like object and save to a CSV file.

    """
    print(pdf_file)
    pdf_file.seek(0)  # Ensure the file pointer is at the beginning
    pages = convert_from_path(pdf_file)  # Converts PDF pages to images
    results = []
    page_number = 1

    for page_image in pages:
        tsv_data = pytesseract.image_to_data(page_image, output_type=pytesseract.Output.DATAFRAME)

        # Process each row in the OCR dataframe
        for _, row in tsv_data.iterrows():
            text = row.get('text', '')
            if isinstance(text, str) and text.strip():
                results.append({
                    "page_number": page_number,
                    "text": text.strip(),
                    "left": int(row['left']),
                    "top": int(row['top']),
                    "width": int(row['width']),
                    "height": int(row['height']),
                    "confidence": row['conf']
                })
        page_number += 1

    # Save results to a CSV file
    df = pd.DataFrame(results)
    output_csv_file = BytesIO()
    df.to_csv(output_csv_file, index=False)
    output_csv_file.seek(0)  # Reset the pointer for reading
    return output_csv_file