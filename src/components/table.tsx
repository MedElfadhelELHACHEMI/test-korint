import { ReactNode } from "react";

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded border">
      <table className="min-w-full">{children}</table>
    </div>
  );
};

export const TableHead = ({ children }: { children: ReactNode }) => {
  return (
    <thead className="bg-gray-50 w-full border-b rounded">{children}</thead>
  );
};

export const TableBody = ({ children }: { children: ReactNode }) => {
  return <tbody className="divide-y">{children}</tbody>;
};

export const TableRow = ({ children }: { children: ReactNode }) => {
  return <tr className="divide-x">{children}</tr>;
};

export const TableCell = ({ children }: { children: ReactNode }) => {
  return <td className="p-1">{children}</td>;
};

export const TableHeader = ({
  children,
  sortBy,
  order,
  setOrder,
}: {
  children: ReactNode;
  sortBy?: string;
  order?: string;
  setOrder?: (order: string) => void;
}) => {
  return (
    <th className="p-2">
      {!!sortBy ? (
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {
            if (setOrder) {
              setOrder(order === sortBy ? "" : sortBy);
            }
          }}
        >
          <h3>{children}</h3>
          <div>{order === sortBy ? "V" : "^"}</div>
        </div>
      ) : (
        <div className="flex">
          <h3>{children}</h3>
        </div>
      )}
    </th>
  );
};
