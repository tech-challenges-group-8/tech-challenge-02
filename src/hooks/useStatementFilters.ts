import { useState, useCallback } from "react";

export const getDefaultDateRange = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const todayAdjusted = new Date(today.getTime() + (4 * 60 * 60 * 1000));

  return {
    from: thirtyDaysAgo.toISOString().split("T")[0],
    to: todayAdjusted.toISOString().split("T")[0],
  };
};

export const useStatementFilters = () => {
  const defaultRange = getDefaultDateRange();
  
  const [filterType, setFilterType] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>(defaultRange.from);
  const [dateTo, setDateTo] = useState<string>(defaultRange.to);
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);

  const clearFilters = useCallback(() => {
    const newDefaultRange = getDefaultDateRange();
    setFilterType("all");
    setDateFrom(newDefaultRange.from);
    setDateTo(newDefaultRange.to);
    setMinValue("");
    setMaxValue("");
    setDescription("");
  }, []);

  return {
    filterType,
    setFilterType,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    description,
    setDescription,
    filterOpen,
    setFilterOpen,
    clearFilters,
  };
};
