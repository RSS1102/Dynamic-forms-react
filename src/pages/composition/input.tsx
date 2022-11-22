import { FieldErrorsImpl, useController } from "react-hook-form"
import type { Control } from "react-hook-form"
import { FormError } from "../../types";
interface Props {
    control: Control<{ input: string; }, any>,
    name: 'input',
    errors: Partial<FieldErrorsImpl<{
        input: string;
    }>>
}

export const FormInput = ({ control, name, errors }: Props) => {
    const { field, fieldState } = useController({ control, name });
    return (
        <div>
            <input {...field} placeholder={name} />
            {errors?.input && <p>{errors.input.message}</p>}
            <p>{fieldState.error ? "不允许提交" : "允许提交"}</p>
        </div>
    )
}
