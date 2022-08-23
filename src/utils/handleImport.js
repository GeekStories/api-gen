import {
    createRoute,
    createMethod,
    createParam,
    createQuery,
    updateMethodBody,
    GetLatestID,
} from "../store/api/routes";
import yaml from "js-yaml";

const handleImport = (e, dispatch) => {
  const fileReader = new FileReader();
  fileReader.readAsText(e.target.files[0], "UTF-8");

  fileReader.onload = (e) => {
    yaml.loadAll(e.target.result, (doc) => {
      const paths_keys = Object.keys(doc.paths);

      paths_keys.forEach((key) => {
        const path = doc.paths[key];
        dispatch(createRoute({ name: key }));
        const routeId = GetLatestID();

        console.log(routeId);

        const methods_keys = Object.keys(path);
        methods_keys.forEach((method_key) => {
          const method = path[method_key];
          dispatch(createMethod({ type: method_key, routeId }));
          const methodId = GetLatestID();

          if (method.parameters) {
            method.parameters.forEach((parameter) => {
              switch (parameter.in) {
                case "query":
                  dispatch(
                    createQuery({
                      routeId,
                      methodId,
                      newQuery: {
                        type: parameter.schema.type,
                        name: parameter.name,
                        options: Object.keys(parameter.schema)
                          .filter((t) => t !== "type")
                          .map((option) => {
                            return {
                              key: option,
                              value: parameter.schema[option],
                            };
                          }),
                      },
                    })
                  );
                  break;
                case "path":
                  dispatch(
                    createParam({
                      routeId,
                      methodId,
                      newParam: {
                        type: parameter.schema.type,
                        name: parameter.name,
                        options: Object.keys(parameter.schema)
                          .filter((t) => t !== "type")
                          .map((option) => {
                            return {
                              key: option,
                              value: parameter.schema[option],
                            };
                          }),
                      },
                    })
                  );
                  break;
                default:
                  break;
              }
            });
          }
          if (method.requestBody) {
            dispatch(
              updateMethodBody({
                routeId,
                methodId,
                newValue: `{${Object.keys(
                  method.requestBody.content["application/json"].schema
                    .properties
                ).map((key) => {
                  const type =
                    method.requestBody.content["application/json"].schema
                      .properties[key].type;
                  return `"${key}": "${type === "integer" ? "number" : type}"`;
                })}}`,
              })
            );
          }
        });
      });
    });
  };
};

export default handleImport;
