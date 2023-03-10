import tw from "tailwind-styled-components";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { saveAs } from "file-saver";
import JSZip from "jszip";

import MobileApp from "./mobile";
import Dependencies from "./components/input/dependencies";
import RouteForm from "./components/input/routeForm";
import Output from "./components/output/output";
import GenerateFilesContents from "./utils/generateFiles";
import ContactModal from "./components/modals/contactModal";
import HelpModal from "./components/modals/helpModal";

const Main = tw.div`h-screen flex flex-col`;
const UserInputArea = tw.div`grid grid-cols-12`;

const App = () => {
  const dependencies = useSelector((state) => state.dependencies);
  const routes = useSelector((state) => state.routes);

  const [selectedRoute, setSelectedRoute] = useState({});
  const [selectedMethod, setSelectedMethod] = useState({});

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [helpModalState, setHelpModalState] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [projectFiles, setFiles] = useState({
    defaults: [
      {
        id: "root_file_0",
        name: "app",
        ext: "js",
        contents:
          'const { errors } = require("celebrate");\n\nconst cors = require("cors");\nconst express = require("express");\nconst app = express();\n\n\napp.use(cors());\napp.use(express.json());\n\n\napp.use(errors());\nmodule.exports = app;\n',
      },
      {
        id: "root_file_1",
        name: "package",
        ext: "json",
        contents:
          ' {\n\t\t"name": "express-api",\n\t\t"version": "1.0.0",\n\t\t"private": "true",\n\t\t"description": "",\n\t\t"author": "",\n\t\t"main": "server.js",\n\t\t"scripts": { \n\t\t"devStart": "node server.js --watch"\n\t\t},\n\t\t"dependencies": {\n\t\t"express": "4.18.2","cors": "2.8.5","celebrate": "15.0.1"\n\t\t},\n\t\t"license": "",\n\t\t"devDependencies": {}\n}\n',
      },
      {
        id: "root_file_2",
        name: "server",
        ext: "js",
        contents:
          // eslint-disable-next-line no-template-curly-in-string
          'const app = require("./app");\nconst port = process.env.PORT || 3001;\napp.listen(port, () => console.log(`Listening on port ${port}`));\n',
      },
    ],
    routes: [],
    middleware: [],
  });

  const handleSelectRoute = (id) => {
    setSelectedRoute(routes.find((route) => route.id === id));
    setSelectedMethod({});
  };

  const handleSelectMethod = (methodId, routeId) => {
    handleSelectRoute(routeId);

    setSelectedMethod(
      routes
        .find((route) => route.id === routeId)
        .methods.find((method) => method.id === methodId)
    );
  };

  const handleOpenContact = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  const handleGenerateFiles = () => {
    setFiles(GenerateFilesContents(dependencies, routes));
    setSelectedFile({}); // Reset selectedFile
  };

  const handleOpenHelp = () => {
    setHelpModalState(!helpModalState);
  };

  const handleDownloadFiles = async () => {
    const zip = new JSZip();

    // Default Files
    projectFiles.defaults.forEach((file) =>
      zip.file(`${file.name}.${file.ext}`, file.contents)
    );

    // Middleware Files
    const middlewareFolder = zip.folder("middleware");
    projectFiles.middleware.forEach((file) =>
      middlewareFolder.file(`${file.name}.${file.ext}`, file.contents)
    );

    // Routes Files
    const routesFolder = zip.folder("routes");
    projectFiles.routes.forEach((file) =>
      routesFolder.file(`${file.name}.${file.ext}`, file.contents)
    );

    const result = await zip.generateAsync({ type: "blob" });
    saveAs(result, "project.zip");
  };

  const screenWidth = useWindowSize();
  if (screenWidth <= 1024) return <MobileApp />;

  return (
    <Main>
      <ContactModal
        isOpen={isContactModalOpen}
        handleOpenContact={handleOpenContact}
      />
      <HelpModal isOpen={helpModalState} handleOpenHelp={handleOpenHelp} />
      <UserInputArea>
        <Dependencies dependencies={dependencies} />
        <RouteForm
          handleSelectRoute={handleSelectRoute}
          handleSelectMethod={handleSelectMethod}
          selectedRoute={selectedRoute}
          selectedMethod={selectedMethod}
        />
      </UserInputArea>

      <Output
        projectFiles={projectFiles}
        handleGenerateFiles={handleGenerateFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleOpenContact={handleOpenContact}
        handleOpenHelp={handleOpenHelp}
        handleDownloadFiles={handleDownloadFiles}
      />
    </Main>
  );
};

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowWidth, setWindowWidth] = useState(undefined);
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowWidth(window.innerWidth);
    };
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowWidth;
};

export default App;
