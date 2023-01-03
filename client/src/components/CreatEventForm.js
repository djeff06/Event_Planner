import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import useFormikForm from "../hooks/useFormikForm";
import { Auth } from "../contexts/Auth";


export const CreatEventForm = ({ setShowModal, setEvents }) => {
  const { MyTextInput, MySelect, MyCheckbox } = useFormikForm();
  const { user } = useContext(Auth);

  const fetchEvents = async (event) => {
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

    
  };

  const fetchAllEvents = async () => {
    const response = await fetch("/api/events", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const events = await response.json();
    console.log(events)
    setEvents(events);
  };



  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-bold">Subscribe!</h1>
      <Formik
        initialValues={{
          title: "",
          // date: "",
          duration: "",
          description: "",
          role: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(30, "Must be 15 characters or less")
            .required("Required"),
          duration: Yup.number()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          description: Yup.string()
            .min(20, "Must be 20 characters or more")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          role: Yup.string()
            .oneOf(["designer", "costumer"])
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const event = { ...values };
        
          fetchEvents(event);
          fetchAllEvents()
          setShowModal(false)

          /* await signup(user);
            setSubmitting(false); */
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
          <MySelect
            className="bg-slate-100 border-2 rounded-lg py-2.5 px-2 border-slate-200"
            label="Role"
            name="role"
          >
            <option value="">Select a Role</option>
            <option value="designer">Designer</option>
            <option value="development">Costumer</option>
          </MySelect>
          <MyCheckbox className="checkbox checkbox-sm" name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>
          {/* {error ? (
              <div className="alert p-2 alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            ) : null} */}
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
