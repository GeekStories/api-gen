import tw from "tailwind-styled-components";
import { useState } from "react";
import axios from "axios";

const Main = tw.div`${(p) => (p.$state ? "block" : "hidden")}
    border-2
    border-gray-400
    bg-gray-200
    rounded-lg
    shadow-inner-lg
    fixed
    top-[50%]
    left-[50%]
    -translate-x-1/2
    -translate-y-1/2
    z-10
    h-auto
    w-[60%]
    p-2`;

const MainForm = tw.form`flex flex-col gap-2 p-2 max-w-[90%] m-auto`;
const FormInput = tw.input`p-2 border-2 border-gray-400 rounded-lg text-black`;
const InputHidden = tw.input`opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1]`;
const MessageInput = tw.textarea`p-2 border-2 border-gray-400 rounded-lg`;
const SubmitButton = tw.button`border-2 bg-gray-400 text-lg w-[80%] mx-auto font-medium transition-all ease-in-out delay-150 hover:bg-gray-300 hover:border-gray-400 rounded`;
const ErrorMessageText = tw.p`text-red-700`;

const ContactModal = ({ isOpen, handleOpenContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body =
      secondaryEmail !== ""
        ? {
            name,
            email,
            message,
            secondaryEmail,
          }
        : {
            name,
            email,
            message,
          };

    const response = await axios.postForm(
      "https://app.headlessforms.cloud/api/v1/form-submission/XLO19fnsBW",
      body
    );

    if (response.status === 200) {
      handleOpenContact();
      setErrorMessage("");
      setName("");
      setEmail("");
      setSecondaryEmail("");
      setMessage("");
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <Main $state={isOpen}>
      <MainForm onSubmit={handleSubmit}>
        <ErrorMessageText>{errorMessage}</ErrorMessageText>
        <FormInput
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputHidden
          type="email"
          placeholder="secondary email"
          onChange={(e) => setSecondaryEmail(e.target.value)}
        />
        <MessageInput
          type="text"
          placeholder="message"
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </MainForm>
    </Main>
  );
};

export default ContactModal;
