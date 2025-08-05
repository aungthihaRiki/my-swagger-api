"use client"

import "swagger-ui-react/swagger-ui.css";
import { swaggerSpec } from "@/lib/swagger";
import SwaggerUI from "swagger-ui-react";
import { useEffect, useState } from "react";

export default function SwaggerPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/swagger")
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) return <div>Loading Swagger...</div>;

  return <SwaggerUI spec={spec} />;
}
