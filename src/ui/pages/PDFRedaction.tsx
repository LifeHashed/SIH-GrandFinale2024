import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Progress } from '../components/Progress';
import { Slider } from '../components/Slider';
import { BackButton } from '../components/BackButton';
import { cn } from '../lib/utils';

export function PDFRedaction() {
  const [file, setFile] = useState<File | null>(null);
  const [redactionLevel, setRedactionLevel] = useState([0]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleRedact = async () => {
    if (!file) return;
  
    setIsProcessing(true);
  
    // Create FormData to send the file and any additional data (redaction level)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("redaction_level", redactionLevel[0].toString()); // Include the selected redaction level
    console.log(formData);
  
    try {
      const response = await fetch("http://localhost:8000/redact-pdf/", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // Handle response when the PDF is redacted
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `redacted_${file.name}`;
        link.click();
      } else {
        alert("Failed to redact PDF");
      }
    } catch (error) {
      console.error("Error redacting PDF:", error);
      alert("Error redacting PDF");
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="mt-[60px] max-w-4xl mx-auto">
        <BackButton />

        <h1 className="text-2xl font-bold mb-6">File Redaction</h1>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8">
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <label className="cursor-pointer">
                <span className="text-blue-500 hover:text-blue-600">
                  Click to upload document
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Supported format: TXT,PDF,JPG,PNG,LOG,DOC,DOCX,CSV,XLSX
              </p>
            </div>
          </div>

          {file && (
            <>
              <div>
                <p className="text-sm font-medium mb-2">Upload Progress</p>
                <Progress value={progress} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Redaction Level: {redactionLevel[0]}
                </label>
                <Slider
                  value={redactionLevel}
                  onValueChange={setRedactionLevel}
                  className="w-full"
                />
              </div>

              <button
                onClick={handleRedact}
                disabled={isProcessing}
                className={cn(
                  "px-4 py-2 rounded-lg",
                  "bg-blue-500 hover:bg-blue-600",
                  "text-white font-medium",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isProcessing ? 'Processing...' : 'Redact File'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}