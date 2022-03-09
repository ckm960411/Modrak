import { forwardRef } from "react";
import { BaseTextFieldProps, TextField } from "@mui/material";

interface TextInputProps extends BaseTextFieldProps {
  [key: string]: any
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <TextField
      multiline
      rows={2}
      fullWidth
      variant="outlined"
      ref={ref}
      {...props}
    />
  )
})
TextInput.displayName = 'TextInput'

export default TextInput;
