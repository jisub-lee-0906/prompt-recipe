"use client";

import * as React from "react";

import { SearchModal } from "@/components/search/search-modal";
import type { SearchRecord } from "@/lib/mdx";

type SearchContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const SearchContext = React.createContext<SearchContextValue | null>(null);

type SearchProviderProps = {
  searchIndex: SearchRecord[];
  children: React.ReactNode;
};

export function SearchProvider({
  searchIndex,
  children,
}: SearchProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      isOpen,
    }),
    [isOpen],
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchModal
        open={isOpen}
        onOpenChange={setIsOpen}
        items={searchIndex}
      />
    </SearchContext.Provider>
  );
}

export function useSearchModal() {
  const context = React.useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchModal은 SearchProvider 안에서만 사용할 수 있습니다.");
  }

  return context;
}
