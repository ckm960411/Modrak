import { FC } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Button, FormControl, FormHelperText, Stack, TextField } from "@mui/material";

type HookFormInputPropTypes = {
  type: string
  placeholder: string
  errors: FieldErrors
  attributes?: UseFormRegisterReturn
  buttonHandler?: () => void
  [key: string]: any
}

const HookFormInput: FC<HookFormInputPropTypes> = ({ 
  type, placeholder, errors, attributes, children, buttonHandler, ...props
}) => {
  return (
    <div>
      <FormControl fullWidth>
        <Stack direction="row">
          <TextField
            type={type}
            placeholder={placeholder}
            error={errors[`${type}`] && true}
            fullWidth
            sx={{ flexGrow: 1 }}
            {...attributes}
            {...props}
          />
          {buttonHandler && (
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: 1, boxSizing: 'content-box', p: '3px' }}
              onClick={buttonHandler}
            >
              중복 확인
            </Button>
          )}
        </Stack>
        <FormHelperText component="div">{children}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default HookFormInput;
