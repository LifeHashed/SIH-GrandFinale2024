import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BackButton() {
  return (
    <Link
      to="/#/"
      className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Home
    </Link>
  );
}
