import tw from "tailwind-styled-components";
import { useState } from "react";
import axios from "axios";

const Main = tw.div`${(p) => (p.$state ? "block" : "hidden")}
    border-2
    border-gray-400
    bg-gray-200
    rounded
    fixed
    top-[50%]
    left-[50%]
    -translate-x-1/2
    -translate-y-1/2
    z-10
    h-auto
    w-[70%]
    p-5`;

const Tutorial = tw.div`flex flex-col mx-auto gap-2 p-5`;
const TutorialTitle = tw.h1`text-center font-bold text-2xl`;
const TutorialList = tw.ol`list-decimal text-lg`;
const TutorialFinal = tw.p`text-md font-medium text-center w-2/3 mx-auto`;
const Code = tw.span`bg-[#ffeff0] p-1 text-lg font-thin font-mono`;

const ContactModal = ({ isOpen }) => {
  return (
    <Main $state={isOpen}>
      <Tutorial>
        <TutorialTitle>How do I use this tool?</TutorialTitle>
        <TutorialList>
          <li>
            To get started, click the 'New Route' button. This will add a new
            route the list. You can then click on the name of the route to
            select it, and rename it.
          </li>
          <li>
            You can click the '+' button inline with the route's name to add a
            new 'Method'. This will add a new method to the list and a couple of
            options. Adding a new method will preselect an avaliable method
            type. But you can change this by simply selecting a different one
            using the dropdown option.
          </li>

          <li>
            Clicking the 'Edit' icon to the left of the method type, you can
            start editing it's Params/Queries/Body information. The editing is
            fairly free, so don't go adding a body to a get method, it just
            doesn't make sense. You do you though!
          </li>

          <li>
            Once you are happy with your API, simply click the 'Generate File
            Contents' button in the bottom left of the screen, this will
            generate the code for your project! Navigate the generated files
            using the box above the generate files button and check you are
            happy with the code. Note: You can't make changes to the code here,
            you'll have to download the project and manually changes these
            values.
          </li>

          <li>
            If you're happy with how the code looks, click the 'Download
            Project!' button and a zip file will be generated. Simply extract
            this to a folder, open the project in a terminal and type{" "}
            <Code>npm i</Code> to install the packages, then{" "}
            <Code>npm run devStart</Code>
            to start your server!
          </li>
        </TutorialList>

        <TutorialFinal>
          And that's it! You can start working on your project without having to
          manually create all the basic routes and parameters, even validation!
          Instead, you can begin working on your core functionality, whatever it
          may be :)
        </TutorialFinal>
      </Tutorial>
    </Main>
  );
};

export default ContactModal;
