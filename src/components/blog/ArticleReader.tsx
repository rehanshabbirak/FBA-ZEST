"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type ArticleReaderValue = {
  expanded: boolean;
  expand: () => void;
};

const ArticleReaderContext = createContext<ArticleReaderValue | null>(null);

export function ArticleReaderProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  const value = useMemo(
    () => ({ expanded, expand: () => setExpanded(true) }),
    [expanded],
  );

  return (
    <ArticleReaderContext.Provider value={value}>
      {children}
    </ArticleReaderContext.Provider>
  );
}

export function useArticleReader(): ArticleReaderValue {
  const value = useContext(ArticleReaderContext);
  if (!value) {
    throw new Error("useArticleReader must be used inside ArticleReaderProvider");
  }
  return value;
}
