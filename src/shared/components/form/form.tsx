'use client';

import * as React from 'react';
import {
  FormProvider,
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from 'react-hook-form';

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/components/ui/field';

/**
 * Modern Form Composition Wrapper
 *
 * Provides a clean, declarative API for building forms using compound components.
 * Works as a layer above shadcn/ui components without modifying them.
 */

interface FormProps<T extends FieldValues> extends React.ComponentProps<'form'> {
  form: UseFormReturn<T>;
}

export function Form<T extends FieldValues>({ form, children, ...props }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
}

interface SmartFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  children: React.ReactElement;
}

/**
 * Form.Field
 * Automatically connects an input to the form context and handles errors/accessibility.
 */
Form.Field = function SmartField<T extends FieldValues>({
  name,
  label,
  description,
  children,
}: SmartFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <FieldControl>
            {React.cloneElement(children, {
              ...field,
              id: name,
              'aria-invalid': fieldState.invalid,
            } as React.HTMLAttributes<HTMLInputElement>)}
          </FieldControl>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
};
