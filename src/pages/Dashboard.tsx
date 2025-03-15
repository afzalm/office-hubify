
import React from 'react';
import { Clock, FileInvoice, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import QuickActions from '@/components/dashboard/QuickActions';
import StatCard from '@/components/dashboard/StatCard';
import ProjectList from '@/components/dashboard/ProjectList';
import TimesheetSummary from '@/components/dashboard/TimesheetSummary';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';

const Dashboard = () => {
  const stats = [
    { 
      icon: Clock, 
      title: 'Hours This Week', 
      value: '35.5h', 
      change: { value: '4.5h', positive: false },
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    { 
      icon: FileInvoice, 
      title: 'Pending Invoices', 
      value: '$12,450', 
      change: { value: '10.5%', positive: true },
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
    },
    { 
      icon: Briefcase, 
      title: 'Active Projects', 
      value: '8', 
      change: { value: '2', positive: true },
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    },
    { 
      icon: Users, 
      title: 'Team Utilization', 
      value: '92%', 
      change: { value: '3%', positive: true },
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <h1 className="text-3xl font-bold mt-1">Welcome back, John</h1>
        </div>
        
        <QuickActions />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.title} 
              icon={stat.icon} 
              title={stat.title} 
              value={stat.value} 
              change={stat.change} 
              color={stat.color}
              index={index}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TimesheetSummary />
          <UpcomingEvents />
        </div>
        
        <div className="mb-6">
          <ProjectList />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
