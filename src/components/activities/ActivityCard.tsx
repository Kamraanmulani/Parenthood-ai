import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description: string;
  image: string;
  onStart: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  image,
  onStart,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <Button onClick={onStart} className="w-full">
          <Play className="mr-2 h-4 w-4" />
          Start Activity
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityCard; 