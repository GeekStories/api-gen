import Coder from "@littlethings/coder";

const GenerateFilesContents = (dependencies, routes) => {
  const dir = {
    defaults: [
      { id: "root_file_0", name: "app", ext: "js", contents: "" },
      { id: "root_file_1", name: "package", ext: "json", contents: "" },
    ],
    routes: routes.map((route, index) => ({
      id: `route_file_${index}`,
      name: route.name,
      ext: "js",
      contents: "",
    })),
    middleware: routes.map((route, index) => ({
      id: `middleware_file_${index}`,
      name: route.name,
      ext: "js",
      contents: "",
    })),
  };

  // Package.json
  dir.defaults[1].contents = GeneratePackageContents(dependencies);

  // App.js
  dir.defaults[0].contents = GenerateAppContents(routes);

  // Route Files
  dir.routes.forEach((route, index) => {
    route.contents = GenerateRouteFile(routes[index]);
  });

  // Middleware Files
  dir.middleware.forEach((middleware, index) => {
    middleware.contents = GenerateMiddlewareFile(routes[index]);
  });

  console.log(dir);

  return dir;
};

const GenerateAppContents = (routes) => {
  const coder = new Coder({
    indentAmount: 2,
  });

  coder.line('const { errors } = require("celebrate");');
  coder.line(""); // Blank line

  coder.line('const cors = require("cors");');
  coder.line('const express = require("express");');
  coder.line("const app = express();");
  coder.line(""); // Blank line

  // Import required routes
  routes.map((route) =>
    coder.line(
      `const ${route.name}Route = require("./routes/${route.name}.js");`
    )
  );
  coder.line(""); // Blank line

  coder.line("app.use(cors());");
  coder.line("app.use(express.json());");
  coder.line(""); // Blank line

  // Use all the imported routes
  routes.map((route) =>
    coder.line(`app.use("/${route.name}", ${route.name}Route);`)
  );
  coder.line(""); // Blank line

  coder.line("app.use(errors());");
  coder.line("module.exports = app;");

  return coder.code;
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
  const coder = new Coder();

  coder.line('const express = require("express");');
  coder.line("const router = express.Router();");
  coder.line(""); // Blank line

  coder.line(
    `const ${route.name}Validation = require("../middleware/${route.name}.js");`
  );
  coder.line(""); // Blank line

  methods.forEach((method) => {
    const { type, body } = method;

    if (method.params.length > 0) {
      method.params.forEach((param) => {
        coder.openBlock(
          `router.${type}("/:${param.name}", ${route.name}Validation.${type}, (req, res, next) =>`
        );
        coder.line(`try {`);
        coder.line(`const { ${param.name} } = req.params;`);
        coder.line(""); // Blank line
        coder.line("/* ROUTE LOGIC GOES HERE */");
        coder.line(`return res.send(\`${param.name}: \${${param.name}}\`);`);
        coder.line(`} catch (error) {`);
        coder.line("next(error);");
        coder.line("}");
        coder.closeBlock(");");
        coder.line(""); // Blank line
      });
    }

    coder.openBlock(
      `router.${type}("/", ${route.name}Validation.${type}, (req, res, next) =>`
    );
    coder.line("try {");
    const keys = body ? [...Object.keys(JSON.parse(body))] : [];
    if (!body) {
      coder.line(
        `const { ${keys.map((key) => `${key}`).join(", ")} } = req.body;`
      );
    }
    coder.line("/* ROUTE LOGIC GOES HERE */");
    if (!body) {
      const response = keys.map((key) => `${key}`).join(", ");
      coder.line(`return res.send({${response}})`);
    } else {
      coder.line('return res.send("Route Hit!")');
    }
    coder.line("} catch (error) {");
    coder.line("next(error);");
    coder.line("}");
    coder.closeBlock(");");
    coder.line(""); // Blank line
  });

  coder.line("module.exports = router;");
  return coder.code;
};

const GenerateMiddlewareFile = (middleware) => {
  const coder = new Coder({
    indentAmount: 2,
  });

  const GenerateParams = (params, type) => {
    coder.line(`[Segments.${type}]: Joi.object().keys({`);
    params.forEach((param) => {
      const { name, type, options } = param;
      coder.line(
        `${name}: Joi.${type}()${options.forEach((option) => {
          const { key, value } = option;
          const keyName =
            key === "minLength" ? "min" : key === "maxLength" ? "max" : key;
          const keyValue = typeof value === "boolean" ? "" : value;
          return `.${keyName}(${keyValue}),`;
        })}`
      );
    });
    coder.line("}),");
  };

  const GenerateBody = (body) => {
    const keys = [...Object.keys(body)];
    coder.line(`[Segments.BODY]: Joi.object().keys({`);
    keys.forEach((key) => coder.line(`${key}: Joi.${body[[key]]}(),`));
    coder.line("}),");
  };

  coder.line('const { celebrate, Joi, Segments } = require("celebrate");');
  coder.line(""); // Line Break;

  coder.openBlock(`const ${middleware.name}Validation = {`);
  middleware.methods.forEach((method) => {
    const { params, queries, body, type } = method;
    if (params.length > 0 || queries.length > 0 || body) {
      coder.line(`${type.toUpperCase()}: celebrate({`);

      if (params.length > 0) GenerateParams(params, "PARAMS");
      if (queries.length > 0) GenerateParams(queries, "QUERY");
      if (body) GenerateBody(JSON.parse(body));

      coder.line("}),");
    }
  });
  coder.closeBlock("};");
  coder.line(""); // Line Break;
  coder.line(`module.exports = ${middleware.name}Validation;`);
  return coder.code;
};

export default GenerateFilesContents;
