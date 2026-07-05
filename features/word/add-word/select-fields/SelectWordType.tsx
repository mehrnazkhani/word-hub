import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { PARTS_OF_SPEECH } from "@/schemas/word/word.shared";

export const SelectWordType = () => {
  return (
    <FormSelect name="partOfSpeech" label="Word type" placeholder="Select type">
      {PARTS_OF_SPEECH &&
        PARTS_OF_SPEECH.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
    </FormSelect>
  );
};
