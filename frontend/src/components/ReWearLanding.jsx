import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Recycle, Users, Sparkles, Star, ArrowRight, Shirt, Heart, Globe,Smartphone,RefreshCw } from 'lucide-react';
import StepCard from './components/StepCard'
import ListItemForm from './components/ListItemForm';

const ReWearLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  
const steps = [
  {
    stepNumber: "01",
    title: "List Your Items",
    description: "Upload photos and details of clothing you no longer wear. Every item earns you points!",
    icon: Smartphone, // 📱
  },
  {
    stepNumber: "02",
    title: "Browse & Swap",
    description: "Discover amazing pieces from other members. Request swaps or use your points to claim items.",
    icon: RefreshCw, // 🔄
  },
  {
    stepNumber: "03",
    title: "Refresh Your Wardrobe",
    description: "Receive new-to-you items and give your old favorites a new home. Everyone wins!",
    icon: Sparkles, // ✨
  },
];
  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      category: "Outerwear",
      condition: "Like New",
      points: 45,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      user: "Emma K."
    },
    {
      id: 2,
      title: "Designer Silk Scarf",
      category: "Accessories",
      condition: "Excellent",
      points: 35,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=500&fit=crop",
      user: "Alex M."
    },
    {
      id: 3,
      title: "Boho Maxi Dress",
      category: "Dresses",
      condition: "Good",
      points: 40,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      user: "Sarah L."
    },
    {
      id: 4,
      title: "Classic Wool Coat",
      category: "Outerwear",
      condition: "Very Good",
      points: 55,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
      user: "Maya R."
    }
  ];

  const stats = [
    { icon: Shirt, number: "15,000+", label: "Items Exchanged" },
    { icon: Users, number: "8,500+", label: "Happy Members" },
    { icon: Globe, number: "2.3M", label: "CO2 Saved (lbs)" },
    { icon: Heart, number: "98%", label: "User Satisfaction" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ReWear
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-slate-600 hover:text-emerald-600 transition-colors">How It Works</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-slate-600 hover:text-emerald-600 transition-colors">Sign In</button>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-all bg-white duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Sustainable Fashion Revolution
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Swap, Share,
            </span>
            <br />
            <span className="text-slate-700">Sustain</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of fashion lovers exchanging preloved clothing. Give your wardrobe a 
            refresh while reducing textile waste and building a more sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center">
              Start Swapping
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 flex items-center">
              Browse Items
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>

         
        </div>
      </section>

      {/* Featured Items Carousel */}
      <div className="overflow-hidden bg-white">
  <div className="max-w-screen-lg mx-auto relative bg-white">
    {featuredItems.map((item, index) => (
      <div
        key={item.id}
        className={`transition-opacity  duration-500 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none absolute top-0 left-0 w-full'
        }`}
      >
        <div className="w-full px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-100 p-8 rounded-3xl">
            <div className="relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[4/5] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-800">
                {item.condition}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-emerald-600 font-medium mb-2">{item.category}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <div className="flex items-center space-x-4 text-slate-600 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span>Listed by {item.user}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-xl mb-6">
                  <div className="text-emerald-800 font-semibold text-lg">{item.points} Points</div>
                  <div className="text-emerald-600 text-sm">or available for swap</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
                  Swap Request
                </button>
                <button className="flex-1 border-2 border-emerald-500 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300">
                  Redeem Points
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>






      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">How ReWear Works</h2>
          <p className="text-xl text-slate-400">Simple steps to start your sustainable fashion journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
            Join thousands of fashion lovers making sustainable choices. Start swapping today and be part of the solution!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
              <Shirt className="mr-2 h-5 w-5" />
              List an Item
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default ReWearLanding;