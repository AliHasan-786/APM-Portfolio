import PyPDF2
import os

def extract_text(pdf_path, max_pages=10):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len(reader.pages)
            text = ""
            for count, i in enumerate(range(min(num_pages, max_pages))):
                page = reader.pages[i]
                text += page.extract_text() + "\n"
            return text
    except Exception as e:
        return str(e)

print("--- Guest Lectures ---")
print(extract_text('Guest Lectures_ Daniel + Sunny.pdf', 15)[:2000])

print("\n\n--- All T&S Lectures (First 20 Pages) ---")
print(extract_text('All T&S Lectures.pdf', 20)[:2000])
