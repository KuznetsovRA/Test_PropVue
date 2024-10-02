"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import styles from "./Table.module.scss";

export default function DataTable({ data, onChange }) {

  const tableHeads = Object.keys(data[0]);

  function handleChangeCell(e, rowIndex, key) {

  }
  return (
    <Table className={styles.table}>
      <TableHeader>
        <TableRow>
          {tableHeads.map(head => (<TableHead key={head}>{head}</TableHead>))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {Object.keys(item).map((key) => (
              <TableCell onClick={(e)=>handleChangeCell(e, item, key)} key={key}>
                <input
                  type="text"
                  value={item[key]}
                  onChange={(e) => onChange(e, rowIndex, key)}
                  className={styles.input}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
