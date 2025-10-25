import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Crown, Zap, Rocket, ArrowLeft } from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      icon: Zap,
      color: 'blue',
      monthlyPrice: 999,
      yearlyPrice: 9999,
      description: 'Perfect for getting started',
      features: [
        { text: '1 Project Access', included: true },
        { text: 'Basic Mentorship (2 hrs/month)', included: true },
        { text: 'Community Support', included: true },
        { text: 'Project Certificate', included: true },
        { text: 'GitHub Integration', included: true },
        { text: 'Advanced Projects', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Resume Review', included: false }
      ],
      popular: false
    },
    {
      name: 'Pro',
      icon: Crown,
      color: 'purple',
      monthlyPrice: 1999,
      yearlyPrice: 19999,
      description: 'Most popular choice',
      features: [
        { text: '3 Projects Access', included: true },
        { text: 'Pro Mentorship (5 hrs/month)', included: true },
        { text: 'Priority Support', included: true },
        { text: 'All Certificates', included: true },
        { text: 'GitHub + Jira Access', included: true },
        { text: 'Advanced Projects', included: true },
        { text: 'Resume Review', included: true },
        { text: 'Interview Prep', included: false }
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      color: 'green',
      monthlyPrice: 3999,
      yearlyPrice: 39999,
      description: 'For serious learners',
      features: [
        { text: 'Unlimited Projects', included: true },
        { text: 'Elite Mentorship (10 hrs/month)', included: true },
        { text: '24/7 Priority Support', included: true },
        { text: 'All Certificates + LinkedIn Badge', included: true },
        { text: 'All Tools Access', included: true },
        { text: 'Real Client Projects', included: true },
        { text: 'Resume + Portfolio Review', included: true },
        { text: 'Mock Interviews', included: true }
      ],
      popular: false
    }
  ];

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        gradient: 'from-blue-500 to-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-500'
      },
      purple: {
        bg: 'bg-purple-500',
        gradient: 'from-purple-500 to-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-500'
      },
      green: {
        bg: 'bg-green-500',
        gradient: 'from-green-500 to-green-600',
        text: 'text-green-600',
        border: 'border-green-500'
      }
    };
    return colors[color][type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey to becoming industry-ready
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorClasses(plan.color, 'gradient')} flex items-center justify-center mb-4`}>
                    <Icon className="text-white" size={32} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gray-900">
                        ₹{price.toLocaleString()}
                      </span>
                      <span className="text-gray-600">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-sm text-green-600 mt-2">
                        Save ₹{((plan.monthlyPrice * 12) - plan.yearlyPrice).toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate('/register')}
                    className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${getColorClasses(plan.color, 'gradient')} hover:shadow-lg transition mb-6`}
                  >
                    Get Started
                  </button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                        ) : (
                          <X className="text-gray-300 flex-shrink-0 mt-0.5" size={20} />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I switch plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time.'
              },
              {
                q: 'Is there a refund policy?',
                a: 'We offer a 7-day money-back guarantee if you\'re not satisfied.'
              },
              {
                q: 'Do I get a certificate?',
                a: 'Yes! All plans include verified certificates upon project completion.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Absolutely! No long-term contracts. Cancel anytime.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Join thousands of freshers gaining real industry experience
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;