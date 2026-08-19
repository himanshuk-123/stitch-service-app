import React from 'react';
import { ArrowLeft, Search, Share2, Heart, SlidersHorizontal, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showShare?: boolean;
  showHeart?: boolean;
  showFilter?: boolean;
  showCustomizer?: boolean;
  onBackClick?: () => void;
  onSearchClick?: () => void;
  onShareClick?: () => void;
  onHeartClick?: () => void;
  onFilterClick?: () => void;
  isFavorited?: boolean;
  transparent?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = true,
  showSearch = false,
  showShare = false,
  showHeart = false,
  showFilter = false,
  showCustomizer = true,
  onBackClick,
  onSearchClick,
  onShareClick,
  onHeartClick,
  onFilterClick,
  isFavorited = false,
  transparent = false,
}) => {
  const { goBack, setIsSearchOpen, setIsCustomizerOpen, brandConfig, showToast } = useApp();

  const handleBack = () => {
    if (onBackClick) onBackClick();
    else goBack();
  };

  const handleShare = () => {
    if (onShareClick) onShareClick();
    else {
      if (navigator.share) {
        navigator.share({
          title: title || 'Home Services',
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(window.location.href);
        showToast('Service link copied to clipboard');
      }
    }
  };

  const handleHeart = () => {
    if (onHeartClick) onHeartClick();
    else {
      showToast('Saved to your favorites');
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between px-4 py-3.5 transition-colors ${
        transparent
          ? 'bg-transparent text-slate-900'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            id="btn-header-back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200 active:scale-95 transition-all text-slate-800"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        {title && (
          <h1 className="text-lg font-bold tracking-tight text-slate-900 truncate max-w-[200px] sm:max-w-[260px]">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showCustomizer && (
          <button
            onClick={() => setIsCustomizerOpen(true)}
            id="btn-header-palette-customizer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200 active:scale-95 transition-all text-slate-700"
            aria-label="Customize Brand"
            title="Customize Brand & Theme"
          >
            <Palette className="h-4.5 w-4.5" style={{ color: brandConfig.primaryColor }} />
          </button>
        )}

        {showShare && (
          <button
            onClick={handleShare}
            id="btn-header-share"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200 active:scale-95 transition-all text-slate-700"
            aria-label="Share service"
          >
            <Share2 className="h-4 w-4" />
          </button>
        )}

        {showHeart && (
          <button
            onClick={handleHeart}
            id="btn-header-heart"
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200 active:scale-95 transition-all ${
              isFavorited ? 'text-red-500 fill-red-500' : 'text-slate-700'
            }`}
            aria-label="Favorite"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500' : ''}`} />
          </button>
        )}

        {showSearch && (
          <button
            onClick={onSearchClick || (() => setIsSearchOpen(true))}
            id="btn-header-search"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200 active:scale-95 transition-all text-slate-700"
            aria-label="Search"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
        )}

        {showFilter && (
          <button
            onClick={onFilterClick}
            id="btn-header-filter"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200 active:scale-95 transition-all text-slate-700"
            aria-label="Filter"
          >
            <SlidersHorizontal className="h-4.5 w-4.5" />
          </button>
        )}
      </div>
    </header>
  );
};
