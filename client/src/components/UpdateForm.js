import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import useFormikForm from "../hooks/useFormikForm";
import { Auth } from "../contexts/Auth";

import Select from "react-select";

export const UpdateForm = ({ setShowModal, setEvents, users, event }) => {
  console.log("event", event);
  const id = event._id;
  const array = [];
  users.map((user) => {
    return array.push({ value: `${user.id}`, label: `${user.username}` });
  });

  const { MyTextInput } = useFormikForm();
  const { user } = useContext(Auth);

  const array2 = [];
  array.map((ar) => {
    if (user.username !== ar.label) {
      return array2.push({ value: `${ar.value}`, label: `${ar.label}` });
    } else {
      return array2;
    }
  });
  const fetchAllEvents = async () => {
    try {
      const response = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const events = await response.json();

      setEvents(events);
    } catch (error) {
      console.log("get error", error);
    }
  };

  const fetchEvents = async (event) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify(event),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // send invitations
  async function handleSendInvitations(part) {
    const response = await fetch("/api/send-invitations", {
      method: "POST",
      body: JSON.stringify({ invitations: part }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log("response from the fetch", response);
  }
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

    // `${event.participants.map(user=>console.log("user.username",user.username))}`

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
          className="react-select-container text-black bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200 "
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
          title: `${event.title}`,
          date: `${event.date}`,
          duration: `${event.duration}`,
          description: `${event.description}`,
          participants: `${event.participants.map((user) => user.id)}`,
        }}
        validationSchema={Yup.object({
          title: Yup.string().max(30, "Must be 15 characters or less"),
          date: Yup.date(),
          duration: Yup.number(),
          description: Yup.string().min(20, "Must be 20 characters or more"),
          participants: Yup.array().of(Yup.string()).nullable(),
        })}
        onSubmit={async (values) => {
          const event = { ...values };
          const part = values.participants;
          await fetchEvents(event);
          await fetchAllEvents();
          setShowModal(false);
          handleSendInvitations(part);
        }}
      >
        <Form>
          <MyTextInput
            className="textLeft text-black bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Title"
            name="title"
            type="text"
            placeholder="title of event"
          />
          <MyTextInput
            className="textLeft text-black bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Date"
            name="date"
            type="date"
            placeholder="date of event"
          />

          <MyTextInput
            className="textLeft text-black bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Duration"
            name="duration"
            type="number"
            placeholder="number of days"
          />
          <MyTextInput
            className="textLeft text-black bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200 mb-10"
            label="Description"
            name="description"
            type="text"
            placeholder="description of the event"
          />

          <Field
            className="textLeft text-black bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200 "
            name="participants"
            id="multiSelectCustom"
            placeholder="Participants"
            isMulti={true}
            component={MultiSelect}
            options={array2}
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
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
