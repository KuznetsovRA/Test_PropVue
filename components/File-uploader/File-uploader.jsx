"use client";

import React, {useCallback, useState} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import * as XLSX from "xlsx";

function FileUploader({ onDataUpload }) {
  const [file, setFile] = useState(null);
  const handleFileChange = useCallback((event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        onDataUpload(jsonData);
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  }, [onDataUpload]);

  return (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="picture" className="h-4">{file && `Файл загружен: ${file.name}`}</Label>
      <Input id="picture" type="file" onChange={handleFileChange} accept=".csv, .xlsx"/>
    </div>
);
}

export default React.memo(FileUploader);
