import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      {/* <div className="flex min-h-14 flex-row items-center gap-3 rounded-md border border-gray-100 bg-light-600 p-4 text-base font-semibold text-dark-400"> */}
      <div className="flex flex-row items-center my-4">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="h-full flex-1 bg-transparent font-ibm-plex-sans outline-none"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
      {/* </div> */}
    </div>
  );
};

export default ColorPicker;
