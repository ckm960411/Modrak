import { Autocomplete, Chip, TextField } from "@mui/material";
import { FC } from "react";
import { mainColor } from "styles/GlobalStyles";

type TagInputProps = {
  value: string[]
  onChange: (e: React.SyntheticEvent<Element, Event>, value: string[]) => void
}

const options = [
  "맛집",
  "숙소",
]

const TagInput: FC<TagInputProps> = ({ value, onChange }) => {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={options}
      freeSolo
      value={value}
      onChange={onChange}
      clearOnEscape={true}
      renderTags={(value: readonly string[], getTagProps) => {
        return value.map((option: string, index: number) =>  (
          <div key={index}>
            <Chip variant="outlined" label={option} {...getTagProps({ index })} sx={{ border: `1px solid ${mainColor}` }} />
          </div>
        ))
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="태그"
          placeholder="피드에 태그를 추가하세요!"
          sx={{ marginTop: '14px' }}
        />
      )}
    />
  )
}

export default TagInput