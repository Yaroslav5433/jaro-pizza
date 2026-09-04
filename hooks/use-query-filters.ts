import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const params = {
      ...filters.price,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });

    const currentQuery = searchParams.toString();

    if (query !== currentQuery) {
      router.push(`?${query}`, {
        scroll: false,
      });
    }
  }, [filters, router, searchParams]);
};