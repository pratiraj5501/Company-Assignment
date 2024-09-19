import React, { useMemo } from "react";
import { useTable, useFilters } from "react-table";

// A simple default filter UI
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search...`}
      style={{ width: "100%" }}
    />
  );
};

const TableWithFilters = () => {
  // Define columns
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Count",
        accessor: "count",
      },
    ],
    []
  );

  // Define data
  const data = useMemo(
    () => [
      { id: 1, title: "Task 1", count: 10 },
      { id: 2, title: "Task 2", count: 20 },
      { id: 3, title: "Task 3", count: 30 },
    ],
    []
  );

  // Default column settings
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the useTable and useFilters hooks
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
      },
      useFilters // Use the useFilters plugin hook
    );

  return (
    <table
      {...getTableProps()}
      style={{ border: "1px solid black", width: "100%" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ padding: "10px", borderBottom: "2px solid black" }}
              >
                {column.render("Header")}
                {/* Render the filter UI */}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{ padding: "10px", border: "1px solid black" }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableWithFilters;
