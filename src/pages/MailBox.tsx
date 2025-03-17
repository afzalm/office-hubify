import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Search, Star, Inbox, Send, Archive, Trash2, AlertCircle, 
  MailPlus, RefreshCcw, MoreVertical, ChevronDown, Tag, User, 
  Clock, Paperclip, Bold, Italic, Underline, List, ListOrdered, 
  Trash, Link, Image, AlignLeft, AlignCenter, AlignRight, Sparkles,
  FileText, Download
} from 'lucide-react';

const MailBox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = useIsMobile();
  
  const emails = [
    {
      id: 1,
      from: 'Alex Johnson',
      subject: 'Project Update: Q3 Goals',
      preview: 'I wanted to provide an update on our progress towards the Q3 goals we discussed last week...',
      time: '10:23 AM',
      unread: true,
      starred: false,
      avatar: 'A',
      hasAttachment: true,
    },
    {
      id: 2,
      from: 'Sarah Miller',
      subject: 'Re: Meeting Notes - Product Team',
      preview: 'Here are the meeting notes from yesterday\'s session. Let me know if you have any questions...',
      time: 'Yesterday',
      unread: false,
      starred: true,
      avatar: 'S',
      hasAttachment: false,
    },
    {
      id: 3,
      from: 'David Wilson',
      subject: 'Client Presentation Draft',
      preview: 'I\'ve attached the draft for the upcoming client presentation. Please review when you get a chance...',
      time: 'Jul 10',
      unread: false,
      starred: false,
      avatar: 'D',
      hasAttachment: true,
    },
    {
      id: 4,
      from: 'Emily Chen',
      subject: 'Quick Question About Budget',
      preview: 'I was looking at the budget for the marketing campaign and noticed there might be a discrepancy...',
      time: 'Jul 9',
      unread: true,
      starred: false,
      avatar: 'E',
      hasAttachment: false,
    },
    {
      id: 5,
      from: 'Michael Brown',
      subject: 'Team Lunch Next Week',
      preview: 'I\'m organizing a team lunch for next Wednesday at 12:30 PM. Please let me know if you can join...',
      time: 'Jul 8',
      unread: false,
      starred: false,
      avatar: 'M',
      hasAttachment: false,
    },
    {
      id: 6,
      from: 'Olivia Martinez',
      subject: 'Updated Design Assets',
      preview: 'I\'ve uploaded the updated design assets to the shared folder. The new color palette is now available...',
      time: 'Jul 7',
      unread: false,
      starred: true,
      avatar: 'O',
      hasAttachment: true,
    },
  ];
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
    if (isMobile) {
      setShowSidebar(true);
    }
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search mail..." className="pl-8 w-full" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Drawer open={composeOpen} onOpenChange={setComposeOpen}>
            <DrawerTrigger asChild>
              <Button className="hidden sm:flex items-center gap-2">
                <MailPlus className="h-4 w-4" />
                <span>Compose</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh] sm:h-[70vh]">
              <DrawerHeader className="border-b px-4 py-3">
                <DrawerTitle>New Message</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col">
                <div className="p-4 border-b">
                  <Input placeholder="To" className="border-0 focus-visible:ring-0 px-0 py-1.5" />
                </div>
                <div className="p-4 border-b">
                  <Input placeholder="Subject" className="border-0 focus-visible:ring-0 px-0 py-1.5" />
                </div>
                <div className="p-4 flex-1 overflow-auto min-h-[200px]">
                  <textarea 
                    className="w-full h-full outline-none resize-none" 
                    placeholder="Compose email..."
                  />
                </div>
                <div className="p-3 border-t flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 hidden sm:flex">
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 hidden sm:flex">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 hidden md:flex">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 hidden md:flex">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 hidden md:flex">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setComposeOpen(false)}>
                      <Trash className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Discard</span>
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Send</span>
                    </Button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          
          {/* Mobile compose button */}
          <Button variant="outline" size="icon" className="sm:hidden" onClick={() => setComposeOpen(true)}>
            <MailPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar/Category List */}
        <div className={`border-r overflow-hidden ${showSidebar ? 'w-60' : 'w-0'} 
          ${isMobile ? (showSidebar ? 'block' : 'hidden') : 'block'} 
          transition-all duration-300`}>
          <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="h-full flex flex-col">
            <div className="p-2">
              <Button className="w-full justify-start" onClick={() => setComposeOpen(true)}>
                <MailPlus className="mr-2 h-4 w-4" />
                Compose
              </Button>
            </div>
            <TabsList className="flex flex-col h-auto justify-start w-full p-1 bg-transparent">
              <TabsTrigger 
                value="inbox" 
                className="justify-start px-3 py-2 w-full"
              >
                <Inbox className="mr-2 h-4 w-4" />
                Inbox
                <Badge className="ml-auto" variant="secondary">4</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="starred" 
                className="justify-start px-3 py-2 w-full"
              >
                <Star className="mr-2 h-4 w-4" />
                Starred
              </TabsTrigger>
              <TabsTrigger 
                value="sent" 
                className="justify-start px-3 py-2 w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Sent
              </TabsTrigger>
              <TabsTrigger 
                value="drafts" 
                className="justify-start px-3 py-2 w-full"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Drafts
                <Badge className="ml-auto" variant="secondary">2</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="archive" 
                className="justify-start px-3 py-2 w-full"
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </TabsTrigger>
              <TabsTrigger 
                value="trash" 
                className="justify-start px-3 py-2 w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Trash
              </TabsTrigger>
            </TabsList>
            
            <Separator className="my-2" />
            
            <div className="px-3 py-2">
              <h3 className="text-sm font-medium flex items-center justify-between">
                Labels
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </h3>
              <div className="mt-2 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-xs h-7">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                  Important
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs h-7">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                  Personal
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs h-7">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                  Work
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs h-7">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                  Project X
                </Button>
              </div>
            </div>
            
            {/* Tab content section */}
            <TabsContent value="inbox" className="m-0 flex-1 overflow-auto">
              <div className="divide-y">
                {emails.map((email) => (
                  <div 
                    key={email.id}
                    className={`p-3 flex gap-3 cursor-pointer hover:bg-muted/50 ${email.unread ? 'bg-muted/30 font-medium' : ''}`}
                    onClick={() => handleEmailSelect(email)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Checkbox checked={false} />
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Star className={`h-4 w-4 ${email.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 truncate">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{email.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{email.from}</span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{email.time}</span>
                      </div>
                      <h4 className="text-sm truncate mt-1">{email.subject}</h4>
                      <p className="text-xs text-muted-foreground truncate mt-1">{email.preview}</p>
                      {email.hasAttachment && (
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Paperclip className="h-3 w-3 mr-1" />
                            Attachment
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="starred" className="m-0 p-4 text-center">
              <h3 className="text-lg font-medium">Starred Messages</h3>
              <p className="text-sm text-muted-foreground mt-1">Messages you've marked with a star</p>
            </TabsContent>
            <TabsContent value="sent" className="m-0 p-4 text-center">
              <h3 className="text-lg font-medium">Sent Messages</h3>
              <p className="text-sm text-muted-foreground mt-1">Messages you've sent to others</p>
            </TabsContent>
            <TabsContent value="drafts" className="m-0 p-4 text-center">
              <h3 className="text-lg font-medium">Drafts</h3>
              <p className="text-sm text-muted-foreground mt-1">Messages you've saved for later</p>
            </TabsContent>
            <TabsContent value="archive" className="m-0 p-4 text-center">
              <h3 className="text-lg font-medium">Archive</h3>
              <p className="text-sm text-muted-foreground mt-1">Messages you've archived</p>
            </TabsContent>
            <TabsContent value="trash" className="m-0 p-4 text-center">
              <h3 className="text-lg font-medium">Trash</h3>
              <p className="text-sm text-muted-foreground mt-1">Deleted messages</p>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Email Content */}
        <div 
          className={`flex-1 flex flex-col overflow-hidden ${isMobile && !selectedEmail ? 'hidden' : 'block'}`}
        >
          {selectedEmail ? (
            <div className="flex-1 flex flex-col overflow-auto">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={handleBackToList}>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Label</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 sm:p-6 overflow-auto flex-1">
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-xl sm:text-2xl font-bold">{selectedEmail.subject}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{selectedEmail.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedEmail.from}</div>
                        <div className="text-sm text-muted-foreground">to me</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 sm:mt-0">
                      <time>{selectedEmail.time}</time>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className={`h-4 w-4 ${selectedEmail.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="prose prose-sm max-w-none">
                    <p>Hello,</p>
                    <p>
                      {selectedEmail.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>Best regards,<br/>{selectedEmail.from}</p>
                  </div>
                  
                  {selectedEmail.hasAttachment && (
                    <>
                      <Separator className="my-6" />
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Attachments (2)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Card>
                            <CardContent className="p-3 flex items-center gap-3">
                              <div className="bg-muted rounded p-2">
                                <FileText className="h-6 w-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">Presentation.pdf</div>
                                <div className="text-xs text-muted-foreground">2.4 MB</div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-3 flex items-center gap-3">
                              <div className="bg-muted rounded p-2">
                                <Image className="h-6 w-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">Screenshot.png</div>
                                <div className="text-xs text-muted-foreground">1.8 MB</div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Separator className="my-6" />
                  
                  <div className="mt-6 flex items-center gap-4">
                    <Button className="gap-2">
                      <Send className="h-4 w-4" />
                      <span>Reply</span>
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Send className="h-4 w-4 rotate-180" />
                      <span>Forward</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center p-8 text-center">
              <div>
                <Inbox className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Select an email to read</h3>
                <p className="mt-2 text-sm text-muted-foreground">Choose an email from the list to view its contents.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailBox;
