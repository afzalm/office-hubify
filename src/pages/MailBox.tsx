import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ChevronDown, 
  Mail, 
  Inbox, 
  Send, 
  Archive, 
  Trash2, 
  Star, 
  Search, 
  Plus, 
  Image, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon, 
  Sparkles,
  Paperclip,
  Minimize,
  MailPlus
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

type Email = {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: {
    name: string;
    email: string;
  }[];
  subject: string;
  body: string;
  date: Date;
  read: boolean;
  starred: boolean;
  labels: string[];
  attachments: {
    name: string;
    size: string;
    type: string;
  }[];
};

const mockEmails: Email[] = [
  {
    id: '1',
    from: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    to: [{ name: 'John Doe', email: 'john.doe@company.com' }],
    subject: 'Project Update - Q3 Roadmap',
    body: '<p>Hi John,</p><p>I wanted to share the latest updates on our Q3 roadmap. We\'ve made significant progress on the key initiatives we discussed last month.</p><p>Can we schedule a quick call tomorrow to go over the details?</p><p>Best regards,<br>Alex</p>',
    date: new Date('2023-09-01T10:30:00'),
    read: false,
    starred: true,
    labels: ['Work', 'Important'],
    attachments: [
      { name: 'Q3_Roadmap.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Project_Timeline.xlsx', size: '1.8 MB', type: 'xlsx' },
    ],
  },
  {
    id: '2',
    from: {
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    to: [{ name: 'John Doe', email: 'john.doe@company.com' }],
    subject: 'Team Lunch Next Week',
    body: '<p>Hey everyone,</p><p>I\'d like to organize a team lunch next week to celebrate our recent launch. Please let me know which day works best for you.</p><p>Thanks!<br>Sarah</p>',
    date: new Date('2023-08-30T14:15:00'),
    read: true,
    starred: false,
    labels: ['Social'],
    attachments: [],
  },
  {
    id: '3',
    from: {
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    to: [{ name: 'John Doe', email: 'john.doe@company.com' }],
    subject: 'Client Presentation Feedback',
    body: '<p>Hi John,</p><p>The client was very impressed with our presentation yesterday. They\'ve requested a few minor changes to the proposal, which I\'ve outlined in the attached document.</p><p>Let\'s discuss these changes in our next meeting.</p><p>Regards,<br>Michael</p>',
    date: new Date('2023-08-29T09:45:00'),
    read: true,
    starred: true,
    labels: ['Client', 'Work'],
    attachments: [
      { name: 'Client_Feedback.docx', size: '1.2 MB', type: 'docx' },
    ],
  },
  {
    id: '4',
    from: {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    to: [{ name: 'John Doe', email: 'john.doe@company.com' }],
    subject: 'Vacation Photos',
    body: '<p>Hi everyone,</p><p>I\'ve uploaded the vacation photos to our shared drive. Feel free to check them out and download any you\'d like to keep.</p><p>Had a great time with you all!</p><p>Cheers,<br>Emily</p>',
    date: new Date('2023-08-28T16:30:00'),
    read: false,
    starred: false,
    labels: ['Personal'],
    attachments: [],
  },
  {
    id: '5',
    from: {
      name: 'David Kim',
      email: 'david.kim@example.com',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    to: [{ name: 'John Doe', email: 'john.doe@company.com' }],
    subject: 'Budget Approval Needed',
    body: '<p>John,</p><p>I need your approval for the updated marketing budget for Q4. We\'ve made some adjustments based on the performance of our recent campaigns.</p><p>Please review and approve at your earliest convenience.</p><p>Thanks,<br>David</p>',
    date: new Date('2023-08-27T11:20:00'),
    read: true,
    starred: true,
    labels: ['Work', 'Urgent'],
    attachments: [
      { name: 'Q4_Marketing_Budget.pdf', size: '3.1 MB', type: 'pdf' },
    ],
  }
];

const MailBox = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isComposeMinimized, setIsComposeMinimized] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: "Your email has been sent successfully.",
    });
    setIsComposeOpen(false);
  };

  const handleStarEmail = (emailId: string) => {
    console.log("Star email:", emailId);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="h-full max-h-[calc(100vh-220px)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mail Box</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => {
            setIsComposeOpen(true);
            setIsComposeMinimized(false);
          }}>
            <MailPlus className="mr-2 h-4 w-4" />
            Compose
          </Button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 w-[250px]" placeholder="Search emails..." />
          </div>
        </div>
      </div>
      
      <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"} className="flex-1 min-h-0 glass-panel border rounded-lg">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="p-4 h-full flex flex-col overflow-hidden">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="flagged" className="flex-1">Flagged</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="mt-4 space-y-1 flex-1 overflow-y-auto">
              <Button 
                variant={activeFolder === 'inbox' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveFolder('inbox')}
              >
                <Inbox className="mr-2 h-4 w-4" />
                <span>Inbox</span>
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2">
                  3
                </span>
              </Button>
              
              <Button 
                variant={activeFolder === 'sent' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveFolder('sent')}
              >
                <Send className="mr-2 h-4 w-4" />
                <span>Sent</span>
              </Button>
              
              <Button 
                variant={activeFolder === 'archive' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveFolder('archive')}
              >
                <Archive className="mr-2 h-4 w-4" />
                <span>Archive</span>
              </Button>
              
              <Button 
                variant={activeFolder === 'trash' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveFolder('trash')}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Trash</span>
              </Button>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Labels</span>
                <Button variant="ghost" size="sm">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm">Work</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  <span className="text-sm">Personal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                  <span className="text-sm">Important</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
                  <span className="text-sm">Client</span>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={80}>
          <div className="h-full flex flex-col overflow-hidden">
            {selectedEmail ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center mb-4">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                      <ChevronDown className="mr-1 h-4 w-4 rotate-90" />
                      Back
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleStarEmail(selectedEmail.id)}>
                        <Star className={`h-4 w-4 ${selectedEmail.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-4">{selectedEmail.subject}</h2>
                  
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {selectedEmail.from.avatar ? (
                        <AvatarImage src={selectedEmail.from.avatar} alt={selectedEmail.from.name} />
                      ) : (
                        <AvatarFallback>{selectedEmail.from.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{selectedEmail.from.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">&lt;{selectedEmail.from.email}&gt;</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(selectedEmail.date)}
                        </span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        to {selectedEmail.to.map(recipient => recipient.name).join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
                  
                  {selectedEmail.attachments.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                      <h3 className="text-sm font-medium mb-3">Attachments ({selectedEmail.attachments.length})</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedEmail.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center p-3 border rounded-lg">
                            <div className="bg-muted w-10 h-10 rounded flex items-center justify-center mr-3">
                              <span className="uppercase text-xs font-bold">{attachment.type}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="truncate font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.size}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t">
                  <Button className="w-full" onClick={() => {
                    setIsComposeOpen(true);
                    setIsComposeMinimized(false);
                  }}>
                    Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="font-medium">{activeFolder.charAt(0).toUpperCase() + activeFolder.slice(1)}</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {mockEmails.map((email) => (
                    <div 
                      key={email.id}
                      className={`p-4 border-b cursor-pointer hover:bg-white/20 transition-colors ${
                        !email.read ? 'bg-white/10' : ''
                      }`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStarEmail(email.id);
                          }}
                        >
                          <Star className={`h-4 w-4 ${email.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                        
                        <Avatar className="h-9 w-9">
                          {email.from.avatar ? (
                            <AvatarImage src={email.from.avatar} alt={email.from.name} />
                          ) : (
                            <AvatarFallback>{email.from.name.charAt(0)}</AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <span className={`font-medium ${!email.read ? 'font-semibold' : ''}`}>
                              {email.from.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(email.date)}
                            </span>
                          </div>
                          
                          <div className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                            {email.subject}
                          </div>
                          
                          <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                            {email.body.replace(/<[^>]*>/g, '')}
                          </div>
                          
                          {(email.labels.length > 0 || email.attachments.length > 0) && (
                            <div className="flex gap-2 mt-1">
                              {email.labels.map((label, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary"
                                >
                                  {label}
                                </span>
                              ))}
                              
                              {email.attachments.length > 0 && (
                                <span className="flex items-center text-xs text-muted-foreground">
                                  <Paperclip className="h-3 w-3 mr-1" />
                                  {email.attachments.length}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <Drawer open={isComposeOpen && !isComposeMinimized} onOpenChange={setIsComposeOpen}>
        <DrawerContent className="max-h-[85vh]">
          <div className="p-4 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
              <DrawerHeader className="p-0">
                <DrawerTitle>New Message</DrawerTitle>
              </DrawerHeader>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsComposeMinimized(true)}
                >
                  <Minimize className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsComposeOpen(false)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center border-b pb-2">
                <span className="w-20 text-sm text-muted-foreground">To:</span>
                <Input className="border-none shadow-none" placeholder="recipients" />
              </div>
              
              <div className="flex items-center border-b pb-2">
                <span className="w-20 text-sm text-muted-foreground">Subject:</span>
                <Input className="border-none shadow-none" placeholder="Subject" />
              </div>
              
              <div className="p-3 bg-white/20 rounded-md">
                <div className="flex items-center gap-1 mb-3 flex-wrap">
                  <Button variant="ghost" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button variant="ghost" size="sm">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1 ml-auto">
                        <Sparkles className="h-4 w-4" />
                        AI Assist
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>AI Writing Assistant</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          What would you like the AI to help you with?
                        </p>
                        <Textarea 
                          placeholder="e.g. Write a professional response to this client inquiry"
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Generate</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea className="min-h-[300px] border-none" placeholder="Compose your message..." />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-1" />
                  Attach
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                    Discard
                  </Button>
                  <Button onClick={handleSendEmail}>Send</Button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      {isComposeMinimized && (
        <div className="fixed bottom-0 right-6 z-50 w-80 glass-panel rounded-t-lg shadow-lg">
          <div className="flex items-center justify-between p-3 cursor-pointer" 
            onClick={() => setIsComposeMinimized(false)}>
            <span className="font-medium">New Message</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => {
                e.stopPropagation();
                setIsComposeMinimized(false);
                setIsComposeOpen(true);
              }}>
                <Minimize className="h-3 w-3 rotate-180" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => {
                e.stopPropagation();
                setIsComposeOpen(false);
              }}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailBox;
