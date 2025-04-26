import { ArrowRight, Shield, Heart, Brain } from 'lucide-react';
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate(); 
  return (
    <div className="relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
          Your Personal  Health & Fitness 
          <span className="text-purple-500"> Journey Starts Here</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Professional guidance, personalized support, and tools to help you maintain and improve your health and fitness.
        </p>
        <div className="flex justify-center space-x-4">
        <button
      onClick={() => navigate("/prompt")} // Now navigate works correctly
      className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors flex items-center"
    >
      Ask Me
      <ArrowRight className="ml-2 h-5 w-5" />
    </button>
        
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-shadow border border-gray-700">
            <div className="h-12 w-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
              <Brain className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">AI-Powered Insights</h3>
            <p className="text-gray-300">Advanced algorithms provide personalized health and fitness recommendations and tracking.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-shadow border border-gray-700">
            <div className="h-12 w-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Private & Secure</h3>
            <p className="text-gray-300">Your data is protected with enterprise-grade security and encryption.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-shadow border border-gray-700">
            <div className="h-12 w-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
              <Heart className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">24/7 Support</h3>
            <p className="text-gray-300">Access to professional support whenever you need it, wherever you are.</p>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -z-10">
        <div className="h-96 w-96 bg-purple-900 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10">
        <div className="h-96 w-96 bg-blue-900 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
}