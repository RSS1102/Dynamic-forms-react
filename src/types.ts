import { FieldErrorsImpl } from "react-hook-form";

export type FormError<T> = Partial<FieldErrorsImpl<{
    (arg0: T): string;
}>>
