"use client"
import styles from "./page.module.css";
import {useCallback, useState} from 'react';
import FileUploader from '../components/File-uploader/File-uploader';
import DataTable from '../components/Table/Table';
import Chart from '../components/Chart/chart';
import FileExport from "@/components/File-export/File-export";
import { property} from "@/const/options";

export default function Home() {
  const [data, setData] = useState(null);

  const handleFileData = useCallback((parsedData) => {
    setData(parsedData);
  }, []);

  const handleChangeData = useCallback((e, rowIndex, key) => {
    const newData = [...data];

    if (key=== `Value` || key=== `Qty`) {
      newData[rowIndex][key] = Number(e.target.value);
    } else {
      newData[rowIndex][key] = e.target.value;
    }
    setData([...newData]);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <FileUploader onDataUpload={handleFileData}/>
        {data && <FileExport data={data}/>}
      </div>

      {data && (
        <div className={styles.dataContainer}>
          <DataTable data={data} onChange={handleChangeData}/>
          <div className={styles.chartContainer}>
            <Chart data={data} view={property.price}/>
            <Chart data={data} view={property.status}/>
            <Chart data={data} view={property.quantityByFulfillment}/>
          </div>
        </div>
      )}
    </div>
  );
}
