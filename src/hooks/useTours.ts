import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: api.getTours,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTour(id: string | undefined) {
  return useQuery({
    queryKey: ["tour", id],
    queryFn: () => api.getTour(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubPackages(parentTourName: string | null) {
  return useQuery({
    queryKey: ["subPackages", parentTourName],
    queryFn: () => api.getSubPackages(parentTourName!),
    enabled: !!parentTourName,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDayTours() {
  return useQuery({
    queryKey: ["dayTours"],
    queryFn: api.getDayTours,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDayTour(id: string | undefined) {
  return useQuery({
    queryKey: ["dayTour", id],
    queryFn: () => api.getDayTour(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
