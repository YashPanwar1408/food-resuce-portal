import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ArrowRight, Upload, Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
interface FoodAnalysisResult {
  quantity: string;
  quality: string;
  description: string;
  estimatedServings: string;
  nutritionalValue: string;
}

const Hero = () => {
  const Navigate=useNavigate()
    const handleRoute=()=>{
      Navigate("/uploadFoodImage");
    }
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Create form data for direct upload to server
      const formData = new FormData();
      formData.append('image', file);

      setIsAnalyzing(true);
      
      // Use the server endpoint directly with the correct port
      const response = await fetch('http://localhost:5000/api/analyze-food-direct', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze image');
      
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing food image:', error);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateReceipt = () => {
    if (!analysisResult) return;
    
    const receiptContent = `
Food Analysis Receipt
---------------------
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Quantity: ${analysisResult.quantity}
Quality: ${analysisResult.quality}
Description: ${analysisResult.description}
Estimated Servings: ${analysisResult.estimatedServings}
Nutritional Value: ${analysisResult.nutritionalValue}
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'food-analysis-receipt.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-accent to-white">
      <div className="container-custom py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="block">Rescue Food.</span>
              <span className="block text-primary">Reduce Waste.</span>
              <span className="block">Feed Communities.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
              FoodRescue Connect bridges the gap between restaurants with excess food and NGOs
              that can distribute it to people in need — creating a world with less waste and less hunger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Dialog>
                <DialogTrigger asChild>
                 
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Food Analysis</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {!imagePreview && !isAnalyzing && (
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="food-image" className="text-sm font-medium">
                          Upload food image for analysis
                        </label>
                        <Input
                          id="food-image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Analyzing food image...</span>
                      </div>
                    )}

                    {imagePreview && !isAnalyzing && (
                      <div className="space-y-4">
                        <div className="overflow-hidden rounded-md">
                          <img
                            src={imagePreview}
                            alt="Food"
                            className="w-full object-cover"
                          />
                        </div>

                        {analysisResult && (
                          <div className="space-y-4 border rounded-md p-4">
                            <h3 className="text-lg font-medium">Analysis Results</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="text-sm font-medium">Quantity:</div>
                              <div className="text-sm">{analysisResult.quantity}</div>
                              <div className="text-sm font-medium">Quality:</div>
                              <div className="text-sm">{analysisResult.quality}</div>
                              <div className="text-sm font-medium">Description:</div>
                              <div className="text-sm">{analysisResult.description}</div>
                              <div className="text-sm font-medium">Est. Servings:</div>
                              <div className="text-sm">{analysisResult.estimatedServings}</div>
                              <div className="text-sm font-medium">Nutritional Value:</div>
                              <div className="text-sm">{analysisResult.nutritionalValue}</div>
                            </div>
                            
                            <Button onClick={generateReceipt} className="w-full flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Download Receipt
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Trusted by restaurants and organizations nationwide</p>
              <div className="grid grid-cols-3 gap-4">
  <motion.div
    className="h-14 bg-gray-200 rounded-md flex items-center justify-center p-2"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
  >
    <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png" alt="Swiggy Logo" className="h-10 object-contain" />
  </motion.div>
  <motion.div
    className="h-14 bg-gray-200 rounded-md flex items-center justify-center p-2"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
  >
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg" alt="Zomato Logo" className="h-10 object-contain" />
  </motion.div>
  <motion.div
    className="h-14 bg-gray-200 rounded-md flex items-center justify-center p-2"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
  >
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Uber_Eats_2020_logo.svg" alt="Uber Eats Logo" className="h-10 object-contain" />
  </motion.div>
</div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dawvvzwyw/image/upload/v1747286671/68257a53da93d_llxeek.jpg" 
                alt="Hero Image" 
                className="object-cover w-full h-full" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
