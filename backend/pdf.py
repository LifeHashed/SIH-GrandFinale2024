import os
import re
import pytesseract
from pdf2image import convert_from_path
from PIL import Image, ImageDraw
from regex import redact_all
import pandas as pd

# Optional: Specify Tesseract path if needed
# pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"

# Patterns for sensitive data (emails and phone numbers)
email_pattern = re.compile(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+')
phone_pattern = re.compile(r'(\+?\d[\d\-\s]{7,}\d)')

def redact_sensitive_data(pdf_path, output_pdf="redacted_output.pdf"):
    """
    Redact sensitive data (emails, phone numbers) in a PDF and save as a new PDF.
    """
    pages = convert_from_path(pdf_path)  # Converts PDF pages to images
    redacted_images = []

    for page_image in pages:
        tsv_data = pytesseract.image_to_data(page_image, output_type=pytesseract.Output.DATAFRAME)
        draw = ImageDraw.Draw(page_image)

        # Check each word in OCR output
        for _, row in tsv_data.iterrows():
            text = row.get('text', '')
            if isinstance(text, str) and text.strip():
                if email_pattern.search(text) or phone_pattern.search(text):
                    left = int(row['left'])
                    top = int(row['top'])
                    width = int(row['width'])
                    height = int(row['height'])
                    draw.rectangle([left, top, left + width, top + height], fill="black")

        redacted_images.append(page_image)

    # Save the redacted images to a new PDF
    save_images_to_pdf(redacted_images, output_pdf)
    print(f"Redacted PDF saved as {output_pdf}")

def save_images_to_pdf(images, output_pdf):
    """
    Combine a list of PIL images into a single PDF.
    """
    rgb_images = [img.convert('RGB') if img.mode != 'RGB' else img for img in images]
    rgb_images[0].save(output_pdf, save_all=True, append_images=rgb_images[1:], resolution=100)

def main():
    pdf_path = input("Enter the path to your PDF file: ").strip()
    if not os.path.exists(pdf_path):
        print("File not found. Please check the path and try again.")
        return

    # Redact sensitive data and save as a new PDF
    redact_sensitive_data(pdf_path, "redacted_output.pdf")

if __name__ == "__main__":
    main()
