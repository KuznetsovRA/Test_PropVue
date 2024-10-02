"use client";

import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button"
import styles from "./File-export.module.scss";

function FileExport({ data }) {

  const exportToExcel = () => {
    // Создаем рабочую книгу
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    // Добавляем рабочий лист в книгу
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Экспортируем файл
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div className="grid w-full items-center gap-1">
      <Button variant="secondary"  onClick={exportToExcel}>Экспортировать в Excel</Button>
    </div>

  );
}

export default React.memo(FileExport);
