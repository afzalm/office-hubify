
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Clock, Briefcase, Receipt, Users, 
  Heart, UserPlus, CreditCard, BarChart, Settings, ChevronRight, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Clock, label: 'Timesheet', path: '/timesheet' },
  { icon: Briefcase, label: 'Projects', path: '/projects' },
  { icon: Receipt, label: 'Invoicing', path: '/invoicing' },
  { icon: Users, label: 'HR Portal', path: '/hr' },
  { icon: Heart, label: 'Wellness', path: '/wellness' },
  { icon: UserPlus, label: 'Referrals', path: '/referrals' },
  { icon: CreditCard, label: 'Benefits', path: '/benefits' },
  { icon: BarChart, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const AppSidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Close sidebar automatically on mobile when navigating
  const handleNavigation = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] bg-white dark:bg-gray-900 border-r shadow-sm",
          "flex flex-col transition-all duration-300",
          collapsed && (isMobile ? "-translate-x-full" : "translate-x-[-200px]")
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="white" />
              </svg>
            </div>
            <span className="font-display text-lg font-semibold">Office Hub</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex-1 overflow-y-auto py-3 px-3">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    "hover:bg-accent group relative",
                    isActive ? "bg-accent text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto border-t p-3">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Product Manager</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      {isMobile && collapsed && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50 rounded-full shadow-md"
          onClick={() => setCollapsed(false)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default AppSidebar;
