import React, { useState } from "react";
import PropTypes from "prop-types";

const errorArea = ({ errors }) => {
  if (errors) {
    return (
      <div className="error-area">
        {errors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
      </div>
    );
  }
};

// Helper component for text and email inputs
const TextInput = ({ field, value, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    <input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      required={field.required}
      onChange={onChange}
    />
    {errorArea}
  </div>
);

// Helper component for group inputs
const GroupInput = ({ field, value, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    {field.options.map((option, i) => (
      <label key={i}>
        {option.label}
        <input
          type="radio"
          name={field.name}
          value={option.value}
          checked={value === option.value}
          required={field.required}
          onChange={onChange}
        />
      </label>
    ))}
    {errorArea}
  </div>
);

// Helper component for checkbox inputs
const CheckboxInput = ({ field, value, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    <input type="checkbox" name={field.name} checked={value} />
    {errorArea}
  </div>
);

// Helper component for textarea inputs
const TextAreaInput = ({ field, value, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    <textarea
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      required={field.required}
      onChange={onChange}
    />
    {errorArea}
  </div>
);

// Helper component for button inputs
const Button = ({ button }) => (
  <button type={button.type} onClick={button.onClick}>
    {button.label}
  </button>
);

// Main component
const FormComponent = ({ formConfig, changeHandlers, errors, values }) => {
  console.log("formConfig", formConfig);
  const { formFields, buttons } = formConfig;

  // TODO apply field validation
  return (
    <form name={formConfig.formName} className="form-component-container">
      {formFields.map((field) => {
        const fieldValue = values[field.name];
        const fieldErrors = errors[field.name];
        const onChange = changeHandlers[field.onChange];
        if (field.type === "text" || field.type === "email") {
          return (
            <TextInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        } else if (field.type === "group") {
          return (
            <GroupInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        } else if (field.type === "checkbox") {
          return (
            <CheckboxInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
            />
          );
        } else if (field.type === "textArea") {
          return (
            <TextAreaInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
            />
          );
        }
        return null;
      })}
      {buttons &&
        buttons.map((button, i) => <Button key={i} button={button} />)}
    </form>
  );
};

// Set prop types
FormComponent.propTypes = {
  // The elements of the form and their configuration
  formConfig: PropTypes.object.isRequired,
  // The functions that will be called on change of the corresponding input
  changeHandlers: PropTypes.object.isRequired,
  // The values of the form inputs
  values: PropTypes.object.isRequired,
  // The errors of the form inputs
  errors: PropTypes.object.isRequired,
  // The functions that will be called on click of the corresponding button
  buttonHandlers: PropTypes.object.isRequired,
};

export default FormComponent;
