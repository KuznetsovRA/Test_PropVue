"use client";

import { Button } from "@/components/ui/button";


export default function NavigationBar({ onFileUploadClick }) {
  return (
      <Button onClick={onFileUploadClick}>Загрузить файл</Button>
  );
}
