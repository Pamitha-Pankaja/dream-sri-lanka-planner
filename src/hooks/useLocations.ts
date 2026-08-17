import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => api.getLocations(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLocation(idOrSlug: string | undefined) {
  return useQuery({
    queryKey: ["location", idOrSlug],
    queryFn: () => api.getLocation(idOrSlug!),
    enabled: !!idOrSlug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLocationByName(name: string | undefined) {
  return useQuery({
    queryKey: ["locationByName", name],
    queryFn: () => api.getLocationByName(name!),
    enabled: !!name,
    staleTime: 5 * 60 * 1000,
  });
}
