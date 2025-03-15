
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Link2, QrCode, Image, Copy, ExternalLink, Wand2 } from 'lucide-react';

const URLShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    // Simulate URL shortening
    setShortUrl('https://short.link/abc123');
    toast.success('URL shortened successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          URL Shortener
        </CardTitle>
        <CardDescription>Shorten long URLs for easy sharing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleShorten} className="w-full">Shorten URL</Button>
          
          {shortUrl && (
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between rounded-md border p-2">
                <span className="text-sm font-medium">{shortUrl}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    toast.success('Copied to clipboard!');
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const QRCodeGenerator = () => {
  const [content, setContent] = useState('');
  
  const handleGenerate = () => {
    if (!content) {
      toast.error('Please enter content for the QR code');
      return;
    }
    toast.success('QR code generated!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR Code Generator
        </CardTitle>
        <CardDescription>Create custom QR codes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter URL or text content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>
          <Button onClick={handleGenerate} className="w-full">Generate QR Code</Button>
          
          {content && (
            <div className="flex justify-center pt-4">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-md h-48 w-48 flex items-center justify-center">
                <QrCode className="h-32 w-32 text-primary" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error('Please enter a prompt');
      return;
    }
    
    setGenerating(true);
    // Simulate image generation
    setTimeout(() => {
      setGenerating(false);
      toast.success('Image generated!');
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Image Generator
        </CardTitle>
        <CardDescription>Create images from text descriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>
          <Button 
            onClick={handleGenerate} 
            className="w-full"
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Generate Image'}
          </Button>
          
          {prompt && !generating && (
            <div className="flex justify-center pt-4">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-md h-48 w-full flex items-center justify-center">
                <Image className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const HandyTools = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Handy Tools</h1>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <URLShortener />
          <QRCodeGenerator />
          <AIImageGenerator />
        </div>
      </ScrollArea>
    </div>
  );
};

export default HandyTools;
