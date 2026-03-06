"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type Audience = "investor" | "developer";

interface AudienceContextValue {
  audience: Audience;
  toggleAudience: () => void;
  setAudience: (a: Audience) => void;
}

const AudienceContext = createContext<AudienceContextValue>({
  audience: "investor",
  toggleAudience: () => {},
  setAudience: () => {},
});

const STORAGE_KEY = "pitch-audience";

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("investor");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Audience | null;
    if (stored === "investor" || stored === "developer") {
      setAudienceState(stored);
    }
  }, []);

  const setAudience = useCallback((a: Audience) => {
    setAudienceState(a);
    localStorage.setItem(STORAGE_KEY, a);
  }, []);

  const toggleAudience = useCallback(() => {
    setAudience(audience === "investor" ? "developer" : "investor");
  }, [audience, setAudience]);

  return (
    <AudienceContext.Provider value={{ audience, toggleAudience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  return useContext(AudienceContext);
}
