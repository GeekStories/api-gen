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

  // Middleware Files
  newDir.middleware.forEach((middleware, index) => {
    middleware.contents = GenerateMiddlewareFile(routes[index]);
  });

  return newDir;
};

const GenerateAppContents = (routes) => {
  return `
    const { errors } = require("celebrate");

    const cors = require("cors");
    const express = require("express");
    const app = express();

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

    app.use(errors());
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
    "dependencies": {
      ${dependencies
        .map((dependency) => `"${dependency.name}": "^${dependency.version}"`)
        .join(",")}
    }
  }`;
};

const GenerateRouteFile = (route) => {
  const { methods } = route;
  return `
const express = require("express");
const router = express.Router();

const ${route.name}Validation = require("../middleware/${route.name}.js");
const ${route.name}Repository = require("../repositories/${route.name}.js");

${methods.map((method) => {
    let paramRoutes = "";

    if (method.params.length > 0) {
      paramRoutes = method.params.map((param) =>
`router.${method.type.toLowerCase()}("/:${param.name}", ${route.name}Validation.${method.type}, (req, res, next) => {
  try {
    const { ${param.name} } = req.params;

    /* ROUTE LOGIC GOES HERE */

    return res.send(\`${param.name}: \${${param.name}}\`);
  } catch (error) {
    next(error);
  }
});`
    );
    }

    let otherRoutes = 
`router.${method.type.toLowerCase()}("/", ${route.name}Validation.${method.type}, (req, res, next) => {
  try {
    /* ROUTE LOGIC GOES HERE */

    ${method.body !== null ? `const { ${[...Object.keys(JSON.parse(method.body))].map((key) => `${key}`).join(", ")} } = req.body;\n` : "" }

    return res.send(${method.body !== null ? `{${[...Object.keys(JSON.parse(method.body))].map((key) => `${key}`).join(", ")}}`: '"Route Hit!"'});
  } catch (error) {
    next(error);
  }
});`;

    return `${paramRoutes}${otherRoutes}`;
  })
  .join("\n\n")}

module.exports = router;
`;
};

const GenerateMiddlewareFile = (middleware) => {
  const GenerateParams = (params, type) => {
    return `
    [Segments.${type}]: Joi.object().keys({
      ${params.map((param) =>
        `${param.name}: Joi.${param.type}()${param.options.map((option) => {
            return `.${option.key === "minLength" ? "min" : option.key === 'maxLength' ? "max" : option.key}(${typeof option.value === "boolean" ? "" : option.value})`;
          }).join("")}`
      )}
    }),`;
  };

  const GenerateBody = (body) => {
    return `
    [Segments.BODY]: Joi.object().keys({
      ${[...Object.keys(body)].map((key) => `${key}: Joi.${body[[key]]}()`).join(",\n")}
    }),`;
  };

  return `
const { celebrate, Joi, Segments } = require("celebrate");
const ${middleware.name}Validation = {
  ${middleware.methods.map((method) => {
  const params = method.params.length > 0 ? GenerateParams(method.params, "PARAMS") : "";
  const queries = method.queries.length > 0 ? GenerateParams(method.queries, "QUERY") : "";
  const body = method.body !== null ? GenerateBody(JSON.parse(method.body)) : "";

  return params !== "" || queries !== "" || body !== ""
    ? `${method.type.toUpperCase()}: celebrate({
        ${params}${queries}${body}
      })`
    : "";
  }).join(",\n")}
}

module.exports = ${middleware.name}Validation;`;
};

export default GenerateFilesContents;
