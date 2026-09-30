import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Cloud, 
  PlayCircle,
  HelpCircle,
  Lock
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  useCloudFallback: boolean;
  onToggleCloudFallback: () => void;
  onLaunchPresentation: () => void;
  isPresentationActive: boolean;
  onOpenPrivacyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isDemoMode,
  onToggleDemoMode,
  useCloudFallback,
  onToggleCloudFallback,
  onLaunchPresentation,
  isPresentationActive,
  onOpenPrivacyModal
}) => {
  const navItems = [
    { id: 'workspace', label: 'Workspace' },
    { id: 'documents', label: 'Documents' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'vision', label: 'Vision Lab' },
    { id: 'performance', label: 'Snapdragon AI' },
    { id: 'models', label: 'Model Center' },
    { id: 'architecture', label: 'Architecture' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Zone 1: Wordmark / Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectTab('landing')}
            className="flex items-center gap-2.5 text-left text-neutral-100 hover:text-white transition-colors group cursor-pointer"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 group-hover:border-red-500/40 transition-colors">
              <Cpu className="h-4 w-4 text-red-500" />
            </div>
            <span className="text-base font-bold tracking-tight">NEXUS</span>
          </button>

          {/* Privacy Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-neutral-800 text-xs">
            {useCloudFallback ? (
              <button
                onClick={onToggleCloudFallback}
                title="Click to switch back to local-first on-device AI"
                className="flex items-center gap-1.5 px-2 py-0.5 rounded text-amber-400 bg-amber-950/30 border border-amber-800/50 hover:bg-amber-950/50 transition-colors cursor-pointer"
              >
                <Cloud className="h-3 w-3" />
                <span className="font-semibold tracking-wide text-[11px]">CLOUD FALLBACK ACTIVE</span>
              </button>
            ) : (
              <button
                onClick={onToggleCloudFallback}
                title="Click to toggle optional cloud fallback for comparison"
                className="flex items-center gap-1.5 px-2 py-0.5 rounded text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 hover:bg-emerald-950/50 transition-colors cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <ShieldCheck className="h-3 w-3" />
                <span className="font-semibold tracking-wide text-[11px]">LOCAL AI ACTIVE</span>
              </button>
            )}

            <button
              onClick={onOpenPrivacyModal}
              title="View Local-First Architecture and Privacy Details"
              className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer p-0.5"
            >
              <HelpCircle className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800/80 text-white font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Mode Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Toggle: Live vs Demo */}
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-md p-0.5 text-xs">
            <button
              onClick={() => isDemoMode && onToggleDemoMode()}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                !isDemoMode 
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              LIVE MODE
            </button>
            <button
              onClick={() => !isDemoMode && onToggleDemoMode()}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                isDemoMode 
                  ? 'bg-red-950/80 text-red-200 border border-red-800/50 font-bold' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              DEMO MODE
            </button>
          </div>

          {/* Presentation Mode Button */}
          <button
            onClick={onLaunchPresentation}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              isPresentationActive
                ? 'bg-red-600 text-white shadow-sm ring-1 ring-red-400'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <PlayCircle className="h-3.5 w-3.5 text-red-400" />
            <span className="whitespace-nowrap">Judging Demo (10 Steps)</span>
          </button>
        </div>
      </div>
      
      {/* Mobile nav drawer */}
      <div className="flex lg:hidden overflow-x-auto border-t border-neutral-900 px-3 py-1.5 gap-1 text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-2.5 py-1 rounded whitespace-nowrap text-xs ${
              currentTab === item.id ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
