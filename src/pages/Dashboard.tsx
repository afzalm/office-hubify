
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuickActions from "@/components/dashboard/QuickActions";
import StatCard from "@/components/dashboard/StatCard";
import TimesheetSummary from "@/components/dashboard/TimesheetSummary";
import ProjectList from "@/components/dashboard/ProjectList";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Welcome, John!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects and tasks today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Hours this week" 
          value="32.5" 
          change="+2.5" 
          trend="up" 
          description="from last week" 
        />
        <StatCard 
          title="Tasks completed" 
          value="24" 
          change="+5" 
          trend="up" 
          description="from yesterday" 
        />
        <StatCard 
          title="Active projects" 
          value="7" 
          change="+1" 
          trend="up" 
          description="from last month" 
        />
        <StatCard 
          title="Pending approvals" 
          value="3" 
          change="-2" 
          trend="down" 
          description="from yesterday" 
        />
      </div>

      <QuickActions />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimesheetSummary />
        <ProjectList />
      </div>
      
      <UpcomingEvents />
    </div>
  );
};

export default Dashboard;
