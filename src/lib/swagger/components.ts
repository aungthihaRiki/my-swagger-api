export const swaggerComponents = {
  schemas: {
    Contact: {
      type: "object",
      properties: {
        id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
      },
    },
    ContactInput: {
      type: "object",
      required: ["firstName", "lastName", "phone", "email"],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};
