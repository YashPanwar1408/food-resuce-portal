import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import jsPDF from 'jspdf';

const UploadFoodImage = () => {
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadToSupabase(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const uploadToSupabase = async (file) => {
    setUploading(true);
    setError(null);
    setAnalysis(null);
    setImageUrl(null);
    toast.loading('Uploading image, please wait...', { id: 'upload' });

    const filePath = `uploads/${Date.now()}_${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('uploaded-food-pics')
      .upload(filePath, file);

    toast.dismiss('upload');

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('uploaded-food-pics')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl;

    if (publicUrl) {
      setImageUrl(publicUrl);
      toast.loading('Analysing image, please wait...', { id: 'analysis' });
      await sendImageToGemini(publicUrl);
      toast.dismiss('analysis');
    }

    setUploading(false);
  };

  const sendImageToGemini = async (imageUrl) => {
    try {
      const res = await fetch('https://chatbot-backend-qenz.onrender.com/api/analyze-food-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.reply || 'Something went wrong');
      }

      setAnalysis(data.reply);
      toast.success('Analysis complete!');
    } catch (err) {
      setError(err.message);
      toast.error('Analysis failed: ' + (err.message || 'Unknown error'));
    }
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Food Image Analysis Report', 20, 20);

    if (imageUrl) {
      const img = (await toDataURL(imageUrl)) as string;
      doc.addImage(img, 'JPEG', 20, 30, 160, 90);
    }

    doc.setFontSize(14);
    doc.text('AI Analysis:', 20, 130);

    const lines = doc.splitTextToSize(analysis || '', 170);
    doc.text(lines, 20, 140);

    doc.save('food-analysis-report.pdf');
  };

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center bg-gray-50">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Upload Your Food Image
        </h1>
        <p className="text-muted-foreground mb-6 max-w-xl text-sm sm:text-base">
          Upload your food image to get full analysis — we'll detect items and help assess quality or quantity!
        </p>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button onClick={triggerFileInput} disabled={uploading} className="flex items-center gap-2">
          <UploadCloud className="w-5 h-5" />
          <span>{uploading ? 'Uploading & Analyzing...' : 'Choose Image'}</span>
        </Button>

        {analysis && (
          <div className="mt-6 text-left max-w-xl bg-white shadow-md p-4 rounded-md border">
            <h3 className="text-lg font-semibold text-green-700 mb-2">🍽️ Food Analysis</h3>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded food"
                className="w-full h-auto max-h-64 object-contain mb-4 rounded-md border"
              />
            )}
            <pre className="whitespace-pre-wrap text-gray-800">{analysis}</pre>

            <Button onClick={downloadPDF} className="mt-4 bg-green-600 hover:bg-green-700 text-white">
              Download PDF Report
            </Button>
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-600">
            ❌ {error}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default UploadFoodImage;
