import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { SelectData } from "../utils/data";

//pamietam o regule 1hook = 1czynnosc ale tu jest ok :)

export function useGenericHook(selectData: SelectData) {
  const [optionData, setOptionData] = useState<SelectData>(selectData);
  const [showSelectedOptionData, setSelectedShowOptionData] =
    useState<SelectData>([]);
  const [optionOnChange, setOptionOnChange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (optionOnChange === "" || optionData.length === 0) return;

    const newArrayWithSelectedOption = optionData.filter((el) => {
      return el.option === optionOnChange;
    });

    const newArrayWithoutSelectedOption = optionData.filter((el) => {
      return el.option !== optionOnChange;
    });

    setOptionData(newArrayWithoutSelectedOption);

    setSelectedShowOptionData((state) => [
      ...state,
      ...newArrayWithSelectedOption,
    ]);

    newArrayWithoutSelectedOption.length !== 0 &&
      setOptionOnChange(newArrayWithoutSelectedOption[0].option);
  };

  const handleOnChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setOptionOnChange(e.target.value);
  };

  return { handleSubmit, handleOnChange, optionData, showSelectedOptionData };
}
