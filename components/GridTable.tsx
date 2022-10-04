import { NextPage } from "next";
import { CSSProperties } from "react";
import { ColumnSpec } from "../types";

interface Props {
  data: Record<string, any>[];
  columns: ColumnSpec[];
  /** Backgroundcolor needs to be set within the gridtable css, to make
   * the sticky header work
   */
  backgroundColor: string;
}

const GridTable: NextPage<Props> = ({ data, columns, backgroundColor }) => {
  const style = {
    "--columns": columns.length,
    "--background-color": backgroundColor || "white",
  } as CSSProperties;

  return (
    <div className="GridTable" style={style}>
      <div className="GTHeader">
        {columns.map((column) => (
          <div className="GTCell" key={column.name} style={column.style}>
            {column.label}
          </div>
        ))}
      </div>
      <div className="GTBody">
        {data.map((row) => (
          <GridRow key={row.name} row={row} columns={columns} />
        ))}
      </div>
    </div>
  );
};

interface RowProps {
  row: Record<string, string | number>;
  columns: ColumnSpec[];
}

const GridRow: NextPage<RowProps> = ({ row, columns }) => {
  return (
    <div className="GTRow">
      {columns.map((column) => (
        <GridCell key={column.name} row={row} column={column} />
      ))}
    </div>
  );
};

interface CellProps {
  row: Record<string, string | number>;
  column: ColumnSpec;
}

const GridCell: NextPage<CellProps> = ({ row, column }) => {
  let content = <span>{row[column.name]}</span>;

  if (column.href && row[column.href])
    content = <a href={String(row[column.href])}>{content}</a>;

  if (column.func) content = column.func(row);

  return (
    <div className="GTCell" style={{ ...column.style }}>
      {content}
    </div>
  );
};

export default GridTable;
