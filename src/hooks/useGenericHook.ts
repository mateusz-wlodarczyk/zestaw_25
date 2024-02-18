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

    // const newArrayWithSelectedOption = optionData.filter((el) => {
    //   return el.option === optionOnChange;
    // });

    // const newArrayWithoutSelectedOption = optionData.filter((el) => {
    //   return el.option !== optionOnChange;
    // });

    // console.log(newArrayWithSelectedOption, "newArrayWithSelectedOption");
    // console.log(newArrayWithoutSelectedOption, "newArrayWithoutSelectedOption");

    const { newArrayWithSelectedOption, newArrayWithoutSelectedOption } =
      optionData.reduce(
        (acc, el) => {
          el.option === optionOnChange
            ? acc.newArrayWithSelectedOption.push(el)
            : acc.newArrayWithoutSelectedOption.push(el);
          return acc;
        },
        {
          newArrayWithSelectedOption: [] as { option: string }[],
          newArrayWithoutSelectedOption: [] as { option: string }[],
        }
      );
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
