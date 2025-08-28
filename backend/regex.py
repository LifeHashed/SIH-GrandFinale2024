import re

# Regex patterns
coordinates_pattern = r'\b(-?\d+(?:\.\d+)?)°\s*([NnSs])\s*,\s*(-?\d+(?:\.\d+)?)°\s*([EeWw])\b'
hex_pattern = r'\b[0-9a-fA-F]{32,64}\b'  # Hexadecimal Numbers
crypto_key_pattern = r'[A-Za-z0-9_-]{20,}'  # Cryptographic Keys or Tokens
bitcoin_address_pattern = r'\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b'  # Bitcoin Addresses
card_cvv_pattern = r'\b\d{3,4}\b'  # CVV
email_pattern = r'[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.(gov\.in|[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?)'  # Email
phone_pattern = r'\(?\+?\d{1,4}\)?[\s-]?\d{7,14}\b'  # Phone Numbers
aadhar_pattern = r'\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b'  # Aadhar Numbers
card_number_pattern = r'\b(?:\d[ -]*?){13,16}\b'  # Credit/Debit Card Numbers
dob_pattern = r'\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2})\b'  # Dates of Birth (DoB)
bank_account_pattern = r'\b\d{9,18}\b'  # Bank Account Numbers
pan_pattern = r'\s*[A-Z]{5}[0-9]{4}[A-Z]\s*'  # PAN Numbers
tan_pattern = r'\s*[A-Z]{4}[0-9]{4}[A-Z]\s*'  # TAN Numbers
ipv4_pattern = r'(\b(?:\d{1,3}\.){3}\d{1,3}\b)'
ipv6_pattern = r'((?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|::(?:[a-fA-F0-9]{1,4}:){0,6}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){0,6}::(?:[a-fA-F0-9]{1,4}:){0,6}[a-fA-F0-9]{1,4})'
ip_address_pattern = rf'({ipv4_pattern}|{ipv6_pattern})'
ssn_pattern = r'\b\d{3}-\d{2}-\d{4}\b'  # Social Security Numbers (SSN)
driver_license_pattern = r'[A-Z0-9]{1,10}-[A-Z0-9]{1,10}-[A-Z0-9]{1,10}'  # Driver's License Numbers
mac_address_pattern = r'\b([A-Fa-f0-9]{2}[:-]){5}[A-Fa-f0-9]{2}\b'  # MAC Addresses
url_pattern = r'https?://(?:www\.)?[^\s/$.?#].[^\s]*'  # URLs (Web Links)
postal_code_pattern = r'\b\d{5}(-\d{4})?\b'  # Postal Codes/ZIP Codes
invoice_number_pattern = r'\bINV\d{5,10}\b'  # Invoice Numbers
passport_number_pattern = r'[A-Z]{1,2}[0-9]{6,9}'  # Passport Numbers
uppercase_name_pattern = r'^[A-Z]+$'  # All-Uppercase Names

def redact_with_x(match):
    return 'x' * len(match.group(0))

def redact_coordinates(text):
    return re.sub(coordinates_pattern, redact_with_x, text)

def redact_hex(text):
    return re.sub(hex_pattern, redact_with_x, text)

def redact_crypto_key(text):
    return re.sub(crypto_key_pattern, redact_with_x, text)

def redact_bitcoin_address(text):
    return re.sub(bitcoin_address_pattern, redact_with_x, text)

def redact_card_cvv(text):
    return re.sub(card_cvv_pattern, redact_with_x, text)

def redact_email(text):
    return re.sub(email_pattern, redact_with_x, text)

def redact_phone(text):
    return re.sub(phone_pattern, redact_with_x, text)

def redact_aadhar(text):
    return re.sub(aadhar_pattern, redact_with_x, text)

def redact_card_number(text):
    return re.sub(card_number_pattern, redact_with_x, text)

def redact_dob(text):
    return re.sub(dob_pattern, redact_with_x, text)

def redact_bank_account(text):
    return re.sub(bank_account_pattern, redact_with_x, text)

def redact_pan(text):
    return re.sub(pan_pattern, redact_with_x, text)

def redact_tan(text):
    return re.sub(tan_pattern, redact_with_x, text)

def redact_ip_address(text):
    """
    Redacts all IPv4 and IPv6 addresses in the given text.

    Args:
        text (str): The input text.

    Returns:
        str: The text with all IP addresses redacted.
    """
    return re.sub(ip_address_pattern, redact_with_x, text)

def redact_ssn(text):
    return re.sub(ssn_pattern, redact_with_x, text)

def redact_driver_license(text):
    return re.sub(driver_license_pattern, redact_with_x, text)

def redact_mac_address(text):
    return re.sub(mac_address_pattern, redact_with_x, text)

def redact_url(text):
    return re.sub(url_pattern, redact_with_x, text)

def redact_postal_code(text):
    return re.sub(postal_code_pattern, redact_with_x, text)

def redact_invoice_number(text):
    return re.sub(invoice_number_pattern, redact_with_x, text)

def redact_passport_number(text):
    return re.sub(passport_number_pattern, redact_with_x, text)

def redact_uppercase_name(text):
    return re.sub(uppercase_name_pattern, redact_with_x, text)

# Function to redact all patterns
def redact_all(text):
    text = redact_coordinates(text)
    text = redact_hex(text)
    text = redact_crypto_key(text)
    text = redact_bitcoin_address(text)
    text = redact_card_cvv(text)
    text = redact_email(text)
    text = redact_phone(text)
    text = redact_aadhar(text)
    text = redact_card_number(text)
    text = redact_dob(text)
    text = redact_bank_account(text)
    text = redact_pan(text)
    text = redact_tan(text)
    text = redact_ip_address(text)
    text = redact_ssn(text)
    text = redact_driver_license(text)
    text = redact_mac_address(text)
    text = redact_url(text)
    text = redact_postal_code(text)
    text = redact_invoice_number(text)
    text = redact_passport_number(text)
    text = redact_uppercase_name(text)
    return text
