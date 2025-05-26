import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TeamMember, { TeamMemberProps } from '@/components/home/TeamMember';
import FeatureCard from '@/components/home/FeatureCard';
import { MessageCircle, User, Users, Bell } from 'lucide-react';

const teamMembers: TeamMemberProps[] = [
  {
    name: 'Rohit Gupta',
    role: 'AI and frontend developer',
    image: '/public/Rohit.jpg',
    description: 'Specializes in integrating AI models with user-friendly frontend interfaces to enhance chatbot experiences.',
    linkedinUrl: 'https://www.linkedin.com/in/rohit-gupta-687b9829a/',
    emailAddress: 'rohitgupta87798@gmail.com',
  },
  {
    name: 'Kamraan Mulani',
    role: 'AI and backend developer',
    image: '/public/kamraan.jpg',
    description: 'Focuses on backend systems and AI pipelines to ensure robust and scalable data-driven interactions.',
    linkedinUrl: 'https://www.linkedin.com/in/kamraan-mulani-944166223/',
    emailAddress: 'kamraanmulani8284@gmail.com',
  },
  {
    name: 'Aditya Singh',
    role: 'Frontend developer',
    image: '/public/aditya.jpg',
    description: 'Crafts responsive UI components and ensures smooth user journeys across devices and browsers.',
    linkedinUrl: 'https://www.linkedin.com/in/aditya-singh-2b319b299/',
    emailAddress: 'adityapsingh565@gmail.com',
  },
  {
    name: 'Afraz Hussain',
    role: 'Frontend developer',
    image: '/public/afraz.jpg',
    description: 'Implements modern design principles to build clean, accessible, and interactive user interfaces.',
    linkedinUrl: 'https://www.linkedin.com/in/afraz-hussain-60614b29a/',
    emailAddress: 'afrazanwarhussain@gmail.com',
  },
];

const features = [
  {
    title: 'Personalized Advice',
    description: "Get customized parenting guidance based on your child's age, temperament, and your family situation.",
    icon: <User className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Community Support',
    description: "Access a network of parents and experts who understand what you're going through.",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    title: '24/7 Availability',
    description: 'Get help anytime, day or night, when parenting questions or challenges arise.',
    icon: <Bell className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Expert Knowledge',
    description: 'Our AI is trained on the latest research in child development and evidence-based parenting approaches.',
    icon: <MessageCircle className="h-5 w-5 text-primary" />,
  },
];

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-muted/50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-balance">
                  Your AI Parenting Assistant
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Get expert guidance, support, and answers for all your parenting questions, day or night.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Link to="/chat">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Chatting
                  </Button>
                </Link>
                <Link to="/activity">
                  <Button size="lg" variant="outline">
                    Start Activity
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 rounded-lg overflow-hidden border">
              <img
                src="/public/logo.png"
                alt="ParenthoodAI Screenshot"
                width={550}
                height={400}
                className="aspect-video object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">How ParenthoodAI Helps You</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Our AI assistant is designed specifically for parents like you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Meet Our Expert Team</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              The specialists behind our AI's knowledge base.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                description={member.description}
                linkedinUrl={member.linkedinUrl}
                emailAddress={member.emailAddress}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of parents who are already using ParenthoodAI for support and guidance.
          </p>
          <Link to="/chat">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Chat with ParenthoodAI
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
