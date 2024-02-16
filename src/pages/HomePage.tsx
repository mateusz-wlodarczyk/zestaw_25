import React from "react";
import GenericComponent from "../components/GenericComponent";
import { SelectData, selectData } from "../utils/data";
//przekazywanie selectData celowo!
export default function HomePage() {
  return <GenericComponent<SelectData> selectData={selectData} />;
}
