import spacy

# Load the pre-trained model
model_path1 = "c:/Users/User/Desktop/RedactX - Copy/project/backend/model/model-best"
model_path2 = "c:/Users/User/Desktop/RedactX - Copy/project/backend/model/2"
model_path3 = "c:/Users/User/Desktop/RedactX - Copy/project/backend/model/3"

nlp1 = spacy.load(model_path1)
nlp2 = spacy.load(model_path2)
nlp3 = spacy.load(model_path3)

def redact_entities1(text):
    doc = nlp1(text)
    redacted_text = text
    for ent in doc.ents:
        redacted_text = redacted_text.replace(ent.text, "xxxxx")
    return redacted_text

def redact_entities2(text):
    doc = nlp2(text)
    redacted_text = text
    for ent in doc.ents:
        redacted_text = redacted_text.replace(ent.text, "xxxxx")
    return redacted_text

def redact_entities3(text):
    doc = nlp3(text)
    redacted_text = text
    for ent in doc.ents:
        redacted_text = redacted_text.replace(ent.text, "xxxxx")
    return redacted_text

