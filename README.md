# SelectComponent

A simple, typed, controlled React select used in HRnet. It renders a native HTML and exposes a straightforward API with options, a selected option, and a change callback.

## Import

```tsx
import { SelectComponent, type SelectOption } from "select-module-kihak12";
```

## Basic Usage

```tsx
const options: SelectOption[] = [
  { key: "AL", label: "Alabama" },
  { key: "AK", label: "Alaska" },
  // ...
];

const [selected, setSelected] = useState<SelectOption>(options[0]);

<SelectComponent name="state" options={options} selectedOption={selected} onSelect={setSelected} />;
```

## Props

- name?: string (optional)
  - Used for the select name/id attribute for forms and labels.
- options: SelectOption[] (required)
  - Array of options to render. Each option has a stable `key` (string) and a `label` (string).
- selectedOption: SelectOption (required)
  - The currently selected option (controlled component).
- onSelect: (selectedOption: SelectOption) => void (required)
  - Callback fired when the user chooses a different option.

Type definition of SelectOption:

```ts
interface SelectOption {
  key: string;
  label: string;
}
```

## Behavior

- Controlled component: you must keep `selectedOption` in your state and pass it back.
- The underlying native element is `<select>`, ensuring accessibility and keyboard support by default.
- The `value` is bound to `selectedOption.key`. Changes map back to the matching option object and are passed to `onSelect`.

## Variations and Examples

1. Initialize from a string key

```tsx
const options = [
  { key: "FR", label: "France" },
  { key: "DE", label: "Germany" },
];
const [countryKey, setCountryKey] = useState("FR");
const selected = options.find((o) => o.key === countryKey)!;

<SelectComponent
  name="country"
  options={options}
  selectedOption={selected}
  onSelect={(opt) => setCountryKey(opt.key)}
/>;
```

2. Derive another field from the selection

```tsx
<SelectComponent
  name="country"
  options={options}
  selectedOption={selected}
  onSelect={(opt) => {
    setCountryKey(opt.key);
    setCountryLabel(opt.label);
  }}
/>
```

3. With a label element

```tsx
<label htmlFor="department">Department</label>
<SelectComponent
  name="department"
  options={[{ key: "Sales", label: "Sales" }, { key: "HR", label: "HR" }]}
  selectedOption={{ key: "Sales", label: "Sales" }}
  onSelect={() => {}}
/>
```

## Styling

- The library ships a compiled CSS file at `dist/select-react.css`. In most bundlers, importing the component will also include the CSS if CSS handling is enabled.
- If your setup does not automatically load library CSS, import it once in your app entry:

```ts
import "select-module-kihak12/dist/select-react.css";
```

- Styles live in `SelectComponent.module.css`.
- The `<select>` element uses the `select` class:

```css
.select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}
.select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}
```

You can override or extend these styles as needed.

## Utility Tips

- Keep option keys stable to avoid unnecessary re-renders.
- When mapping from domain data, build `SelectOption[]` once and memoize when appropriate.
- For form libraries, use `name` to integrate with labels and submissions; the selected value can be `selectedOption.key`.

## Example in context

Used in `src/pages/home/Home.tsx` to select a US state:

```tsx
const addressStatesListAsSelectOptions: SelectOption[] = addressStates.map((s) => ({
  key: s.abbreviation,
  label: s.name,
}));

<SelectComponent
  name={"state"}
  options={addressStatesListAsSelectOptions}
  selectedOption={addressStatesListAsSelectOptions.find((e) => e.key === state)!}
  onSelect={(option) => setState(getIsoCodeFromState(option.label))}
/>;
```
