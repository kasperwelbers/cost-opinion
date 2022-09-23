const GridTable = ({ data, columns }) => {
  return (
    <div className="GridTable" style={{ "--columns": columns.length }}>
      <div className="GTHeader">
        {columns.map((column) => (
          <div className="GTCell" key={column.name} style={column.style}>
            {column.label}
          </div>
        ))}
      </div>
      <div className="GTBody">
        {data.map((row) => (
          <GridRow row={row} columns={columns} />
        ))}
      </div>
    </div>
  );
};

const GridRow = ({ row, columns }) => {
  return (
    <div key={row.name} className="GTRow">
      {columns.map((column) => (
        <GridCell row={row} column={column} />
      ))}
    </div>
  );
};

const GridCell = ({ row, column }) => {
  let content = row[column.name];
  if (column.href && row[column.href])
    content = <a href={row[column.href]}>{content}</a>;
  return (
    <div key={column.name} className="GTCell" style={{ ...column.style }}>
      {content}
    </div>
  );
};

export default GridTable;
