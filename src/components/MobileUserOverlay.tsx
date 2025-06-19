
import React from 'react';
import { Button } from '@/components/ui/button';
import OnlineUsers from './OnlineUsers';

interface MobileUserOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileUserOverlay: React.FC<MobileUserOverlayProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 bg-black/20 z-50 flex">
      <div className="ml-auto w-72 h-full bg-white shadow-xl">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Team Members</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-900"
          >
            ×
          </Button>
        </div>
        <OnlineUsers />
      </div>
      <div 
        className="flex-1" 
        onClick={onClose}
      />
    </div>
  );
};

export default MobileUserOverlay;
