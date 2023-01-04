import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import useFormikForm from "../hooks/useFormikForm";
import { Auth } from "../contexts/Auth";

import Select from "react-select";

export const CreatEventForm = ({ setShowModal, setEvents, users }) => {
  const array = [];
  users.map((user) => {
    return array.push({ value: `${user.username}`, label: `${user.username}` });
  });

  const { MyTextInput } = useFormikForm();
  const { user } = useContext(Auth);

  const fetchEvents = async (event) => {
    try {
      console.log("event", event);
      const response = await fetch("/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify(event),
      });
      const backRes = await response.json();
      console.log("back rees;", backRes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const events = await response.json();
      console.log(events);
      setEvents(events);
    } catch (error) {
      console.log("get error", error)
    }
  };
  // multi select

  const MultiSelect = ({
    field,
    form,
    options,
    isMulti = false,
    placeholder = "Select",
  }) => {
    function onChange(option) {
      form.setFieldValue(
        field.name,
        option ? option.map((item) => item.value) : []
      );
    }

    const getValue = () => {
      if (options) {
        return isMulti
          ? options.filter((option) => field.value.indexOf(option.value) >= 0)
          : options.find((option) => option.value === field.value);
      } else {
        return isMulti ? [] : "";
      }
    };

    if (!isMulti) {
      return (
        <Select
          options={options}
          name={field.name}
          value={
            options
              ? options.find((option) => option.value === field.value)
              : ""
          }
          onChange={(option) => form.setFieldValue(field.name, option.value)}
          onBlur={field.onBlur}
          placeholder={placeholder}
        />
      );
    } else {
      return (
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          name={field.name}
          value={getValue()}
          onChange={onChange}
          options={options}
          isMulti={true}
          placeholder={placeholder}
        />
      );
    }
  };
  // end

  return (
    <div className="flex flex-col w-full">
      <Formik
        initialValues={{
          title: "",
          date: "",
          duration: "",
          description: "",
          participants: [],
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(30, "Must be 15 characters or less")
            .required("Required"),
          date: Yup.date().required("Required"),
          duration: Yup.number().required("Required"),
          description: Yup.string()
            .min(20, "Must be 20 characters or more")
            .required("Required"),
          participants: Yup.array()
            .of(Yup.string())
            .required("Required")
            .nullable(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const event = { ...values };
          fetchEvents(event);
          fetchAllEvents();
          setShowModal(false);
          console.log(event);
        }}
      >
        <Form>
          <MyTextInput
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Title"
            name="title"
            type="text"
            placeholder="title of event"
          />
          <MyTextInput
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Date"
            name="date"
            type="date"
            placeholder="date of event"
          />

          <MyTextInput
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Duration"
            name="duration"
            type="number"
            placeholder="number of days"
          />
          <MyTextInput
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Description"
            name="description"
            type="text"
            placeholder="description of the event"
          />
      

          <Field
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            name="participants"
            id="multiSelectCustom"
            placeholder="Participants"
            isMulti={true}
            component={MultiSelect}
            options={array}
          />

         
          <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={() => setShowModal(false)}
            >
              no
            </button>

            <button
              className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
