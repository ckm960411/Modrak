import { forwardRef } from "react";
import { BaseTextFieldProps, TextField } from "@mui/material";


const TextInput = forwardRef<HTMLInputElement, BaseTextFieldProps>((props, ref) => {
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
