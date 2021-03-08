exports.handler = async function (event) {
  const body = JSON.parse(event.body ?? "null");

  return {
    statusCode: 200,
    body: JSON.stringify({
      foo: "bar",
      echo: body,
      __dirname,
    }),
  };
};
