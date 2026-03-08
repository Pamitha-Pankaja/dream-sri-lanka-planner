import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export function useTours() {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["tours", language],
    queryFn: () => api.getTours(language),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTour(id: string | undefined) {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["tour", id, language],
    queryFn: () => api.getTour(id!, language),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubPackages(parentTourName: string | null) {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["subPackages", parentTourName, language],
    queryFn: () => api.getSubPackages(parentTourName!, language),
    enabled: !!parentTourName,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDayTours() {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["dayTours", language],
    queryFn: () => api.getDayTours(language),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDayTour(id: string | undefined) {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["dayTour", id, language],
    queryFn: () => api.getDayTour(id!, language),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
