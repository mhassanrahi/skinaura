"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCart } from '@/contexts/cart-context';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  suitableFor: string[];
  concerns: string[];
  sensitivityLevel: string[];
}

const products: Product[] = [
  {
    id: "1",
    name: "Gentle Cleansing Foam",
    description: "A mild, pH-balanced cleanser suitable for all skin types",
    price: 24.99,
    image: "/products/cleanser.jpg",
    suitableFor: ["normal", "dry", "combination", "oily"],
    concerns: ["acne", "sensitivity"],
    sensitivityLevel: ["slightly-sensitive", "very-sensitive"]
  },
  {
    id: "2",
    name: "Hydrating Serum",
    description: "Intensive moisture boost with hyaluronic acid",
    price: 39.99,
    image: "/products/serum.jpg",
    suitableFor: ["dry", "normal", "combination"],
    concerns: ["aging", "sensitivity"],
    sensitivityLevel: ["not-sensitive", "slightly-sensitive"]
  },
  {
    id: "3",
    name: "Brightening Treatment",
    description: "Targets dark spots and uneven skin tone",
    price: 49.99,
    image: "/products/treatment.jpg",
    suitableFor: ["normal", "combination", "oily"],
    concerns: ["dark-spots", "aging"],
    sensitivityLevel: ["not-sensitive"]
  },
  {
    id: "4",
    name: "Oil Control Moisturizer",
    description: "Light, non-comedogenic formula for oily skin",
    price: 29.99,
    image: "/products/moisturizer.jpg",
    suitableFor: ["oily", "combination"],
    concerns: ["acne"],
    sensitivityLevel: ["not-sensitive", "slightly-sensitive"]
  }
]

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your skin type?",
    options: [
      { id: "normal", text: "Normal", value: "normal" },
      { id: "dry", text: "Dry", value: "dry" },
      { id: "oily", text: "Oily", value: "oily" },
      { id: "combination", text: "Combination", value: "combination" },
    ],
  },
  {
    id: 2,
    question: "What are your main skin concerns?",
    options: [
      { id: "acne", text: "Acne", value: "acne" },
      { id: "aging", text: "Anti-aging", value: "aging" },
      { id: "dark-spots", text: "Dark spots", value: "dark-spots" },
      { id: "sensitivity", text: "Sensitivity", value: "sensitivity" },
    ],
  },
  {
    id: 3,
    question: "How would you describe your skin's sensitivity?",
    options: [
      { id: "not-sensitive", text: "Not sensitive", value: "not-sensitive" },
      { id: "slightly-sensitive", text: "Slightly sensitive", value: "slightly-sensitive" },
      { id: "very-sensitive", text: "Very sensitive", value: "very-sensitive" },
    ],
  },
];

interface QuizResult {
  date: string;
  answers: Record<number, string>;
  recommendations: Product[];
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [recommendations, setRecommendations] = React.useState<Product[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [quizHistory, setQuizHistory] = React.useState<QuizResult[]>([]);
  const { addItem } = useCart();

  const currentQuestion = quizQuestions[currentStep];
  const progress = currentStep === quizQuestions.length - 1 && answers[currentQuestion.id]
    ? 100
    : (currentStep / quizQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Load quiz history from localStorage on mount
  React.useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveQuizResult = (answers: Record<number, string>, recommendations: Product[]) => {
    const newResult: QuizResult = {
      date: new Date().toISOString(),
      answers,
      recommendations
    };

    const updatedHistory = [newResult, ...quizHistory].slice(0, 5); // Keep last 5 results
    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const skinType = answers[1];
    const skinConcern = answers[2];
    const sensitivityLevel = answers[3];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const recommendedProducts = products.filter(product => {
      const matchesSkinType = product.suitableFor.includes(skinType);
      const matchesConcerns = product.concerns.includes(skinConcern);
      const matchesSensitivity = product.sensitivityLevel.includes(sensitivityLevel);
      
      return matchesSkinType && (matchesConcerns || matchesSensitivity);
    });

    setRecommendations(recommendedProducts);
    saveQuizResult(answers, recommendedProducts);
    setShowResults(true);
    setIsLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      image: product.image,
      category: 'Skincare'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-gray-600">Analyzing your skin profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Skincare Routine</h1>
        <p className="text-gray-600">
          Answer a few questions to get personalized product recommendations
        </p>
      </div>

      {showResults ? (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Your Personalized Recommendations</h2>
          {recommendations.length > 0 ? (
            <>
              <div className="grid gap-6">
                {recommendations.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-[1.02]">
                    <div className="flex gap-6">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">${product.price}</span>
                            {product.discountedPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.discountedPrice}
                              </span>
                            )}
                          </div>
                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="transition-all hover:scale-105"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {quizHistory.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Previous Quiz Results</h3>
                  <div className="space-y-4">
                    {quizHistory.slice(1).map((result) => (
                      <div key={result.date} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(result.date).toLocaleDateString()}
                        </p>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                          {result.recommendations.map(product => (
                            <div key={product.id} className="flex-shrink-0 w-48">
                              <div className="relative w-full aspect-square mb-2">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-2"
                                onClick={() => handleAddToCart(product)}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-600">
              No products match your specific needs. Please try adjusting your answers.
            </p>
          )}
          <Button
            variant="outline"
            className="w-full mt-6"
            onClick={() => {
              setCurrentStep(0);
              setAnswers({});
              setShowResults(false);
            }}
          >
            Retake Quiz
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Step {currentStep + 1} of {quizQuestions.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            
            <div className="grid gap-4">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option.id}
                  variant={answers[currentQuestion.id] === option.value ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-4 px-6 transition-all hover:scale-[1.02]"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.text}
                </Button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep === quizQuestions.length - 1 && (
                <Button onClick={handleSubmit}>
                  Get Recommendations
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}