
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl mb-8">Oops! We couldn't find that page.</p>
        <div className="max-w-md mb-8">
          <p className="text-muted-foreground">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
