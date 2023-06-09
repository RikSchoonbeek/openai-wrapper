import React, { useState } from "react";

import FormComponent from "./common/form/FormComponent";
import { chatFormConfig } from "../configs";

const ChatComponent = () => {
  // TODO on component mount we may want to wait with rendering the form
  // until we have the data (porential) initial values. Which may require
  // a request to the backend.
  const [formValues, setFieldValues] = useState(
    chatFormConfig.formFields.reduce(
      (values, field) => ({
        ...values,
        [field.name]: field.initialValue || "",
      }),
      {}
    )
  );
  const [formErrors, setFormErrors] = useState({});

  const setFieldValue = (name, value) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  };
  const handlePromptChange = (event) => {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    setFieldValue(name, value);
  };

  return (
    <div className="chat-component-container">
      <h1>Main chat</h1>
      <FormComponent
        formConfig={chatFormConfig}
        changeHandlers={{
          handlePromptChange,
        }}
        values={formValues}
        errors={formErrors}
      />
    </div>
  );
};

export default ChatComponent;
