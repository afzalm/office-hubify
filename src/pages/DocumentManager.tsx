
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, FolderOpen, Upload, Download, RefreshCw, Search, Cloud, Filter } from 'lucide-react';

const DocumentManager = () => {
  const [activeTab, setActiveTab] = useState('my-files');
  
  const documents = [
    { id: 1, name: 'Project Proposal.docx', type: 'Document', size: '2.4 MB', modified: '2 hours ago', owner: 'You' },
    { id: 2, name: 'Financial Report.xlsx', type: 'Spreadsheet', size: '4.8 MB', modified: '1 day ago', owner: 'Jane Smith' },
    { id: 3, name: 'Meeting Notes.pdf', type: 'PDF', size: '1.2 MB', modified: '3 days ago', owner: 'You' },
    { id: 4, name: 'Design Assets.zip', type: 'Archive', size: '24.5 MB', modified: '1 week ago', owner: 'Design Team' },
    { id: 5, name: 'Client Presentation.pptx', type: 'Presentation', size: '8.7 MB', modified: '2 weeks ago', owner: 'You' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Document Management System</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Card className="w-64 h-[calc(100vh-12rem)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  My Files
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Shared with Me
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Recent
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <CardTitle className="text-sm mb-2">Cloud Storage</CardTitle>
                <Button variant="outline" className="w-full justify-start mb-2">
                  <Cloud className="mr-2 h-4 w-4 text-blue-500" />
                  Google Drive
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Cloud className="mr-2 h-4 w-4 text-blue-600" />
                  OneDrive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Files</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search files..." className="pl-8 w-64" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Manage your documents and files</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Modified</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            {doc.name}
                          </div>
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.modified}</TableCell>
                        <TableCell>{doc.owner}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
