import { ReactNode } from "react";

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import { Input } from "../ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";

import type { LucideIcon } from "lucide-react";

export type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  control?: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & {
      "aria-invalid": boolean;
      id: string;
    },
  ) => ReactNode;
};

export type FormControlFunc<ExtraProps = {}> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps,
) => ReactNode;

export type InputProps = React.ComponentProps<typeof Input> & {
  icon?: LucideIcon;
  endAdornment?: React.ReactNode;
};

export function createFormField<ExtraProps extends object = {}>(
  render: (
    field: Parameters<Parameters<typeof FormBase>[0]["children"]>[0],
    extraProps: ExtraProps,
  ) => ReactNode,
  options?: { horizontal?: boolean; controlFirst?: boolean },
): FormControlFunc<ExtraProps> {
  return function FormField(props) {
    const { control, name, label, description, ...rest } = props;

    return (
      <FormBase
        control={control}
        name={name}
        label={label}
        description={description}
        horizontal={options?.horizontal}
        controlFirst={options?.controlFirst}
      >
        {(field) => render(field, rest as unknown as ExtraProps)}
      </FormBase>
    );
  };
}

export function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control: controlProp,
  label,
  name,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  const context = useFormContext<TFieldValues, unknown, TTransformedValues>();
  const control = controlProp ?? context?.control;

  if (!control) {
    throw new Error(
      `FormBase: "control" not found for field "${name}". Either pass it directly or wrap this component in a <FormProvider>.`,
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel htmlFor={field.name} className="sr-only">
              {label}
            </FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </>
        );
        const controlElement = children({
          ...field,
          id: field.name,
          "aria-invalid": fieldState.invalid,
        });
        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        );

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? "horizontal" : undefined}
          >
            {controlFirst ? (
              <>
                {controlElement}
                <FieldContent>
                  {labelElement}
                  {errorElem}
                </FieldContent>
              </>
            ) : (
              <>
                <FieldContent>{labelElement}</FieldContent>
                {controlElement}
                {errorElem}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}
