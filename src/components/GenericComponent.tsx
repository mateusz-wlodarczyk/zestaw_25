import { Button, Select, Text } from "@chakra-ui/react";
import { SelectData } from "../utils/data";
import { useGenericHook } from "../hooks/useGenericHook";

//ten generic jest poprawny?
export default function GenericComponent<T>({
  selectData,
}: {
  selectData: SelectData;
}) {
  const { handleSubmit, handleOnChange, optionData, showSelectedOptionData } =
    useGenericHook(selectData);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select
          placeholder="Select option"
          name="zestaw_25"
          id="zestaw25"
          onChange={handleOnChange}
          defaultValue=""
        >
          {optionData.map((el, index) => {
            return (
              <option key={index} value={el.option}>
                {el.option}
              </option>
            );
          })}
        </Select>
        <Button type="submit">add</Button>
      </form>

      {showSelectedOptionData.length !== 0 &&
        showSelectedOptionData.map((el, index) => {
          return <Text key={index}>- {el.option}</Text>;
        })}
    </>
  );
}
