const GenerateFilesContents = (formData) => {
  let newDir = { ...formData.dir };
  let routes = { ...formData.routes };

  // Package.json
  newDir.defaults[2].contents = GeneratePackageContents(formData.dependencies);

  // App.js
  newDir.defaults[0].contents = GenerateAppContents(formData.routes);

  // Route Files
  newDir.routes.forEach((route, index) => {
    route.contents = GenerateRouteFile(routes[index]);
  });

  return newDir;
};

const GenerateRouteFile = (route) => {
  const { methods } = route;
  return `
    const { 
      errors,
      next
    } = require("celebrate");

    const cors = require("cors");
    const express = require("express");
    const router = express.Router();

    const ${route.name}Validation = require("../middleware/${route.name}.js");
    const ${route.name}Repository = require("../repositories/${route.name}.js");

    ${methods
      .map(
        (method) =>
          `router.${method.type.toLowerCase()}("/", celebrate(${
            route.name
          }Validation.${method.type}), req, res, next) => {
              try {
                /* ROUTE LOGIC GOES HERE */
              ${
                method.body !== null
                  ? `const { ${[...Object.keys(method.body)]
                      .map((key) => `${key}`)
                      .join(", ")} } = req.body; \n`
                  : ""
              }
              return res.send("Route Hit!");
            } catch (error) {
              next(error);
            }
          }`
      )
      .join("\n\n")}

    router.use(errors());
    module.exports = router;
  `;
};

const GenerateAppContents = (routes) => {
  return `
    const { 
      errors
    } = require("celebrate");

    const cors = require("cors");
    const express = require("express");
    const app = express();

    /* Import Routes */
    ${routes
      .map(
        (route) =>
          `const ${route.name}Route = require("./routes/${route.name}.js");`
      )
      .join("\n")}

    app.use(cors());
    app.use(express.json());

    ${routes
      .map((route) => `app.use("/${route.name}", ${route.name}Route);`)
      .join("\n")}

    module.exports = app;
    `;
};

const GeneratePackageContents = (dependencies) => {
  return `{
    "name": "express",
    "version": "1.0.0",
    "description": "An Express Server - Template Generated @ api-gen.com",
    "main": "server.js",
    "scripts": {
      "devStart": "nodemon server.js"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {${dependencies
      .map((dependency) => `"${dependency.name}": "^${dependency.version}"`)
      .join("\n")}
    },
  }`;
};

export default GenerateFilesContents;
