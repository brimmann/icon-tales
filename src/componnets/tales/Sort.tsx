import type React from "react";
import { useState } from "react";

type SortValue = "asc" | "desc";

interface SortOption {
  label: string;
  value: SortValue;
}

function Sort() {
  const sortOptions: SortOption[] = [
    { label: "Sort by Name (A-Z)", value: "asc" },
    { label: "Sort by Name (Z-A)", value: "desc" },
  ];

  const [selectedSort, setSelectedSort] = useState<SortValue>("asc");

  const currentSortLabel = sortOptions.find(
    (option) => option.value === selectedSort
  )?.label;

  return (
    <div className="">
      <button
        className="btn"
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
      >
        {currentSortLabel}
      </button>

      <ul
        className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
      >
        {sortOptions.map((option) => (
          <li key={option.value} onClick={() => setSelectedSort(option.value)}>
            <button className="btn btn-ghost">{option.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sort;
