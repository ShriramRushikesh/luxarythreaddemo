"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import qs from "query-string";

export const useProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentFilters = useMemo(() => {
    return qs.parse(searchParams.toString(), {
      arrayFormat: "comma",
    });
  }, [searchParams]);

  const updateFilters = useCallback((newFilters: Record<string, any>) => {
    const updated = { ...currentFilters, ...newFilters };
    
    // Remove empty filters
    Object.keys(updated).forEach(key => {
      if (updated[key] === null || updated[key] === undefined || updated[key] === "" || (Array.isArray(updated[key]) && updated[key].length === 0)) {
        delete updated[key];
      }
    });

    const url = qs.stringifyUrl({
      url: pathname,
      query: updated,
    }, { arrayFormat: "comma", skipNull: true });

    router.push(url, { scroll: false });
  }, [currentFilters, pathname, router]);

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    filters: currentFilters,
    updateFilters,
    clearFilters,
  };
};
