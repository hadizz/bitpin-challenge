import { Fragment } from 'react/jsx-runtime';

export interface Column {
  field: string;
  headerName: string;
  renderCell?: (value: any) => string;
}

export interface TableProps<T> {
  data?: T[];
  columns: Column[];
  type?: 'buy' | 'sell';
}

function Table<T extends Record<string, any>>({ data, columns, type }: TableProps<T>) {
  return (
    <div className={`grid grid-cols-${columns.length} gap-1 w-full text-xs`}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="p-1 font-bold">
          {column.headerName}
        </div>
      ))}

      {data?.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          {columns.map((column, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`p-1 ${type ? (type === 'buy' ? 'text-green-600' : 'text-red-600') : ''}`}
            >
              {column.renderCell ? column.renderCell(row[column.field]) : row[column.field]}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Table;
