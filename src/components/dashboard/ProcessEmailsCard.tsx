
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { triggerInitialProcessing, setupRealTimeProcessing } from '@/services/webhooks';
import { Slider } from '@/components/ui/slider';

export function ProcessEmailsCard() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingDelay, setProcessingDelay] = useState<number[]>([0]); // Start at 0 minutes
  const { toast } = useToast();

  const handleProcessing = async () => {
    try {
      setIsProcessing(true);
      // First setup the real-time processing with the chosen delay
      await setupRealTimeProcessing(processingDelay[0]);
      
      // Then trigger initial processing 
      await triggerInitialProcessing(50); // We'll keep a fixed value of 50 emails
      
      toast({
        title: "Email Processing Started",
        description: `Processing enabled with ${formatDelay(processingDelay[0])} delay.`,
      });
      
      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Email Processing Configured",
          description: `Your emails will be processed with ${formatDelay(processingDelay[0])} delay.`,
        });
      }, 3000);
    } catch (error) {
      console.error('Processing error:', error);
      setIsProcessing(false);
      toast({
        title: "Processing Failed",
        description: "We couldn't set up email processing. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDelay = (minutes: number) => {
    if (minutes === 0) return 'immediately';
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = minutes / 60;
      return `${hours} hour${hours === 1 ? '' : 's'}`;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Process Your Emails</CardTitle>
        <CardDescription>
          Set up real-time processing for your incoming emails
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground mb-6">
              <span>When they arrive</span>
              <span>After {formatDelay(processingDelay[0])}</span>
            </div>
            <Slider
              value={processingDelay}
              min={0}
              max={120}
              step={5}
              onValueChange={setProcessingDelay}
              disabled={isProcessing}
              className="mt-2"
            />
          </div>
          <div className="bg-muted/40 p-3 rounded-md">
            <p className="text-xs text-muted-foreground">
              This will process your emails {processingDelay[0] === 0 ? 'as soon as they arrive' : `after a delay of ${formatDelay(processingDelay[0])}`}.
              We'll also process your last 50 emails to get started.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleProcessing}
          disabled={isProcessing}
          className="w-full relative overflow-hidden"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Setting Up...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Enable Processing</span>
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
