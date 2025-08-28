import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Slider } from '../components/Slider';
import { BackButton } from '../components/BackButton';
import { cn } from '../lib/utils';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export function TextRedaction() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [redactionLevel, setRedactionLevel] = useState([0]);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleRedact = async () => {
    if (!inputText) {
      alert('Error: No text to redact');
      return;
    }

    console.log({
      text: inputText,
      redaction_level: redactionLevel[0],
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/redact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          redaction_level: redactionLevel[0],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to redact text');
      }

      const data = await response.json();
      console.log(data);
      setOutputText(data.redacted_text || 'Error: No redacted text returned');
      setShowFeedbackModal(true);
    } catch (error) {
      console.error(error);
      setOutputText('An error occurred while processing the text');
    }
  };

  const handleFeedback = (feedback) => {
    console.log('User feedback:', feedback);
    setShowFeedbackModal(false);

    // Send feedback to backend if needed
    // fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ feedback }) });
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setRedactionLevel([0]);
    setShowDownloadOptions(false);
    setShowFeedbackModal(false);
  };

  const handleDownload = (format) => {
    if (format === 'txt') {
      const blob = new Blob([outputText], { type: 'text/plain' });
      saveAs(blob, `redacted-text.${format}`);
      setShowDownloadOptions(false);
    } else if (format === 'docx') {
      const doc = new Document({
        sections: [
          {
            children: [new Paragraph({ children: [new TextRun(outputText)] })],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `redacted-text.${format}`);
      });
      setShowDownloadOptions(false);
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      doc.text(outputText, 10, 10);
      doc.save(`redacted-text.${format}`);
      setShowDownloadOptions(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="mt-[60px] max-w-4xl mx-auto">
        <BackButton />

        <h1 className="text-2xl font-bold mb-6">Text Redaction</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Input Text</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={cn(
                'w-full h-40 p-3 rounded-lg border',
                'bg-white dark:bg-gray-800',
                'border-gray-200 dark:border-gray-700',
                'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              )}
              placeholder="Enter text to redact..."
            />
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

          <div className="flex gap-4">
            <button
              onClick={handleRedact}
              className={cn(
                'px-4 py-2 rounded-lg',
                'bg-blue-500 hover:bg-blue-600',
                'text-white font-medium'
              )}
            >
              Redact Text
            </button>
            <button
              onClick={handleClear}
              className={cn(
                'px-4 py-2 rounded-lg',
                'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
                'text-gray-700 dark:text-gray-300 font-medium'
              )}
            >
              Clear All
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Output Text</label>
            <textarea
              value={outputText}
              readOnly
              className={cn(
                'w-full h-40 p-3 rounded-lg border',
                'bg-gray-50 dark:bg-gray-900',
                'border-gray-200 dark:border-gray-700'
              )}
              placeholder="Redacted text will appear here..."
            />

            {outputText && (
              <div className="absolute bottom-4 right-4">
                <div className="relative">
                  <button
                    onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                    <Download className="w-5 h-5" />
                  </button>

                  {showDownloadOptions && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                      <button
                        onClick={() => handleDownload('txt')}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Download as TXT
                      </button>
                      <button
                        onClick={() => handleDownload('docx')}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Download as DOCX
                      </button>
                      <button
                        onClick={() => handleDownload('pdf')}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Download as PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {showFeedbackModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Was the redaction satisfactory?</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => handleFeedback('yes')}
                  className={cn(
                    'px-4 py-2 rounded-lg',
                    'bg-green-500 hover:bg-green-600',
                    'text-white font-medium'
                  )}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleFeedback('no')}
                  className={cn(
                    'px-4 py-2 rounded-lg',
                    'bg-red-500 hover:bg-red-600',
                    'text-white font-medium'
                  )}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
