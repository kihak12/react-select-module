import styles from "./SelectComponent.module.css";
import { SelectOption } from "./SelectOption";

export const SelectComponent = (props: SelectProps) => {
  const getSelectOptionFromKey = (key: string): SelectOption =>
    props.options.find((option) => option.key === key)!;

  return (
    <>
      <select
        className={styles.select}
        name={props.name}
        id={props.name}
        onChange={(e) => props.onSelect(getSelectOptionFromKey(e.target.value))}
        value={props.selectedOption.key}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.key}>
            {" "}
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

interface SelectProps {
  name?: string;
  options: SelectOption[];
  selectedOption: SelectOption;
  onSelect: (selectedOption: SelectOption) => void;
}
