import Coder from "@littlethings/coder";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

const GenerateFilesContents = (dependencies, routes) => {
  const dir = {
    defaults: [
      { id: "root_file_0", name: "app", ext: "js", contents: "" },
      { id: "root_file_1", name: "package", ext: "json", contents: "" },
      { id: "root_file_2", name: "server", ext: "js", contents: "" },
    ],
    routes: routes.map((route, index) => ({
      id: `route_file_${index}`,
      name: route.name,
      ext: "js",
      contents: "",
    })),
    middleware: routes
      .filter((r) => Object.keys(r.methods).length > 0)
      .map((route, index) => {
        return {
          id: `middleware_file_${index}`,
          name: route.name,
          ext: "js",
          contents: "",
        };
      }),
  };

  // Package.json
  dir.defaults[1].contents = GeneratePackageContents(dependencies);

  // App.js
  dir.defaults[0].contents = GenerateAppContents(routes);

  // Server.js
  dir.defaults[2].contents = GenerateServerFileContents();

  // Route Files
  dir.routes.forEach((route, index) => {
    route.contents = GenerateRouteFile(routes[index]);
  });

  // Middleware Files
  dir.middleware.forEach((middleware, index) => {
    middleware.contents = GenerateMiddlewareFile(routes[index]);
  });

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
    coder.line(`app.use("/api/${route.name}", ${route.name}Route);`)
  );
  coder.line(""); // Blank line
  coder.line("app.use(errors());");
  coder.line("module.exports = app;");

  return coder.code;
};

const GenerateServerFileContents = () => {
  const coder = new Coder({
    indentAmount: 2,
  });

  coder.line('const app = require("./app");');
  coder.line("const port = process.env.PORT || 3001;");
  coder.line(
    // eslint-disable-next-line no-template-curly-in-string
    "app.listen(port, () => console.log(`Listening on port ${port}`));"
  );

  return coder.code;
};

const GeneratePackageContents = (dependencies) => {
  const coder = new Coder({
    indentAmount: 2,
  });

  coder.openBlock();
  coder.line('"name": "express-api",');
  coder.line('"version": "1.0.0",');
  coder.line('"private": "true",');
  coder.line('"description": "",');
  coder.line('"author": "",');
  coder.line('"main": "server.js",');
  coder.line('"scripts": { ');
  coder.line('"devStart": "nodemon server.js"');
  coder.line("},");
  coder.line('"dependencies": {');
  coder.line(
    dependencies
      .map((dependency) => `"${dependency.name}": "${dependency.version}"`)
      .join(",")
  );
  coder.line("},");
  coder.line('"license": "",');
  coder.line('"devDependencies": {}');
  coder.closeBlock();

  return coder.code;
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
    const { type, body, params, queries } = method;

    if (method.type !== "post") {
      coder.line(`router.${type.toLowerCase()}("/", (req, res) => {`);
      if (queries.length > 0) {
        coder.line(
          `const { ${queries
            .map((item) => item.name)
            .join(", ")} } = req.query;`
        );
      }
      coder.line('res.send("Hello World");');
      coder.line("});");
      coder.line(""); // Blank line
    }

    if (params.length > 0) {
      params.forEach((param) => {
        coder.openBlock(
          `router.${type.toLowerCase()}("/:${param.name}", ${
            route.name
          }Validation.${type.toLowerCase()}, (req, res, next) =>`
        );
        coder.line(`try {`);
        coder.line(
          `const { ${params
            .map((item) => item.name)
            .join(", ")} } = req.params;`
        );
        coder.line("/* ROUTE LOGIC GOES HERE */");
        coder.line(`return res.send("Hello, world!");`);
        coder.line(`} catch (error) {`);
        coder.line("next(error);");
        coder.line("}");
        coder.closeBlock(");");
        coder.line(""); // Blank line
      });
    }

    const keys = body ? [...Object.keys(JSON.parse(body))] : [];
    if (body) {
      coder.openBlock(
        `router.${type.toLowerCase()}("/", ${
          route.name
        }Validation.${type.toLowerCase()}, (req, res, next) =>`
      );
      coder.line(`try {`);
      coder.line(
        `const { ${keys.map((key) => `${key}`).join(", ")} } = req.body;`
      );
      coder.line("/* ROUTE LOGIC GOES HERE */");
      coder.line(`return res.send("Hello, world!");`);
      coder.line(`} catch (error) {`);
      coder.line("next(error);");
      coder.line("}");
      coder.closeBlock(");");
      coder.line(""); // Blank line
    }
  });

  coder.line("module.exports = router;");
  return coder.code;
};

const GenerateMiddlewareFile = (middleware) => {
  const coder = new Coder({
    indentAmount: 2,
  });

  const GenerateParams = (params, type) => {
    const GetKeyValue = (option) => {
      const { key, value } = option;
      const keyName =
        key === "minLength" ||
        key === "maxLength" ||
        key === "minimum" ||
        key === "maximum"
          ? key.slice(0, 3)
          : key;
      const keyValue = typeof value === "boolean" ? "" : value;
      return { keyName, keyValue };
    };

    coder.line(`[Segments.${type}]: Joi.object().keys({`);
    params.forEach((param) => {
      const { name, type, options } = param;

      const left = `${name.toLowerCase()}: Joi.${
        type === "integer" ? "number" : type
      }()`;
      const right = options.map((option) => {
        const { keyName, keyValue } = GetKeyValue(option);
        return `${keyName}(${keyValue})`;
      });

      coder.line(`${left}.${right.join(".")},`);
    });
    coder.line("}),");
  };

  const GenerateBody = (body) => {
    const keys = [...Object.keys(body)];
    coder.line(`[Segments.BODY]: Joi.object().keys({`);
    keys.forEach((key) =>
      coder.line(
        `${key}: Joi.${body[[key]] === "integer" ? "number" : body[[key]]}(),`
      )
    );
    coder.line("}),");
  };

  coder.line('const { celebrate, Joi, Segments } = require("celebrate");');
  coder.line(""); // Line Break;

  coder.openBlock(`const ${middleware.name}Validation =`);
  middleware.methods.forEach((method) => {
    const { params, queries, body, type } = method;
    if (params.length > 0 || queries.length > 0 || body) {
      coder.line(`${type}: celebrate({`);

      if (params.length > 0) GenerateParams(params, "PARAMS");
      if (queries.length > 0) GenerateParams(queries, "QUERY");
      if (body) GenerateBody(JSON.parse(body));

      coder.line("}),");
    }
  });
  coder.closeBlock();
  coder.line(""); // Line Break;
  coder.line(`module.exports = ${middleware.name}Validation;`);
  return coder.code;
};

export default GenerateFilesContents;
