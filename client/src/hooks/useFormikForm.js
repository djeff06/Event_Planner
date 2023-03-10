import React from "react";
import { useField } from "formik";

const useFormikForm = () => {
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col ">
        <label
          className="text-gray-800 mt-4 textLeft"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <input className="text-input " {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-500  ">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <>
        <label className="flex flex-row gap-3 mt-4">
          <input className="checkbox" {...field} {...props} type="checkbox" />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="text-red-500">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex flex-col">
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-500">{meta.error}</div>
        ) : null}
      </div>
    );
  };
  return { MySelect, MyCheckbox, MyTextInput };
};

export default useFormikForm;
