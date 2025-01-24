import { useState } from 'react';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Calculator, Shield, Brain, BarChart3, Target, Zap, ArrowRight, Sparkles, Check, ExternalLink, ClipboardEdit } from 'lucide-react';
import { Meteors } from "@/components/ui/meteors";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: existingEmails } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email);

      if (existingEmails && existingEmails.length > 0) {
        toast({
          title: "Already on the waitlist!",
          description: "This email is already registered. We'll notify you when we launch!",
          duration: 4000,
        });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "Welcome to SmartRisk! 🎉",
        description: (
          <div className="flex flex-col gap-1">
            <p>You're officially on the waitlist! We'll notify you as soon as we launch.</p>
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Check className="w-4 h-4" />
              <span>Email successfully registered</span>
            </div>
          </div>
        ),
        duration: 5000,
      });
      
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't add you to the waitlist. Please try again later.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative flex flex-col items-center justify-center antialiased overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative z-10">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-6 py-3 mb-8 border border-blue-100/50 shadow-lg hover:shadow-blue-100 transition-all duration-300">
                <Calculator className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">SmartRisk</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8">
                Perfect Position Sizing.{' '}
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Zero Guesswork.
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-sm"></span>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Professional position sizing calculator that helps you maximize profits while keeping your portfolio protected. Stay within prop firm limits and trade with confidence.
              </p>
            </div>

            {/* CTA Section */}
            <div className="max-w-md mx-auto mb-16">
              <div className="relative">
                <div className="mb-6 text-center">
                  <p className="text-sm text-gray-600">Join the waitlist to take advantage of highly discounted prices for our early adopters!</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 bg-white/80 backdrop-blur-sm border-gray-200 text-gray-900 text-lg shadow-sm rounded-xl transition-all duration-200 group-hover:shadow-md group-hover:border-blue-300"
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl transition-all duration-200 opacity-0 group-hover:opacity-100"></div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      "Joining..."
                    ) : (
                      <>
                        Join the Waitlist
                        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
                
                <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span>Early Access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Survey Link */}
            <div className="text-center mb-16">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfWfEsE85l6i95pIFB3V1EbS9ZKCodlt81W4m_3QDf7pKEKVg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <ClipboardEdit className="w-5 h-5 text-blue-600 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-gray-900 font-medium">Help shape SmartRisk by taking our quick survey</span>
                <ExternalLink className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Advanced Position Calculator */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 hover:border-blue-200/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Calculator className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Advanced Position Calculator</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Calculate exact position sizes using precise risk parameters. Our advanced calculator handles all major forex pairs plus gold and silver with real-time pip value calculations.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-600">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span>Support for all major forex pairs</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span>Gold (XAU/USD) trading</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span>Silver (XAG/USD) trading</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span>Dynamic position sizing</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span>Saved calculations</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Risk Management */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 hover:border-purple-200/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Risk Management</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Monitor and manage your risk with alerts and customizable risk thresholds. Stay within prop firm drawdown limits.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-600">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span>Real-time drawdown monitoring</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <span>Custom risk thresholds</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span>Daily loss limits</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span>Risk level warnings</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Advanced Analytics */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 hover:border-green-200/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Advanced Analytics</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Make data-driven decisions with advanced risk metrics including Value at Risk (VaR) and Monte Carlo simulations.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-600">
                      <Target className="w-5 h-5 text-green-600" />
                      <span>Value at Risk (VaR) analysis</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      <span>Monte Carlo simulations</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <Zap className="w-5 h-5 text-green-600" />
                      <span>Risk of Ruin calculator</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackgroundBeams className="opacity-20" />
        <Meteors number={40} />
      </div>
      <Toaster />
    </>
  );
}

export default App;