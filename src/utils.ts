import { useCallback, useState } from "react";

export type TypeMapping = {
  string: string;
  number: number;
  boolean: boolean;
  date: Date;
};

// Utility type to infer TypeScript types from the schema
export type TypeInference<T extends Record<string, keyof TypeMapping>> = {
  [K in keyof T]: TypeMapping[T[K]];
};

export type ValidationResult<Schema extends Record<string, keyof TypeMapping>> =
  {
    error?: string;
    data?: TypeInference<Schema>[];
  };

export type SchemaType = Record<string, keyof TypeMapping>;

export function infer<Schema extends SchemaType>(
  schema: Schema,
  data?: unknown
): TypeInference<Schema> {
  return data as TypeInference<Schema>;
}

export type ErrorType = "ValidationError" | "APIError" | "JavaScriptError";

export type CustomError = {
  type: ErrorType;
  message: string;
};

export const apiErrorMap = {
  APIError: "API Error",
  ValidationError: "Validation Error",
  JavaScriptError: "JavaScript Error",
};

function mapBuiltInErrorType(error: Error): ErrorType {
  if (error instanceof TypeError) {
    return "JavaScriptError";
  } else if (error instanceof ReferenceError) {
    return "JavaScriptError";
  } else if (error instanceof SyntaxError) {
    return "JavaScriptError";
  } else {
    return "JavaScriptError";
  }
}

export const getErrorType = (error: Error | CustomError): ErrorType => {
  return "type" in error ? error.type : mapBuiltInErrorType(error);
};

export function handleError(
  error: Error | CustomError,
  throwError = false
): CustomError | undefined {
  const handledError: CustomError =
    "type" in error
      ? error
      : {
          type: getErrorType(error),
          message: error.message,
        };

  if (throwError) {
    throw handledError;
  } else {
    return handledError;
  }
}

export function createValidator<Schema extends SchemaType>(schema: Schema) {
  function validateItem(item: unknown): TypeInference<Schema> {
    if (typeof item !== "object" || item === null) {
      throw handleError(
        { type: "invalid-type", message: "Invalid data type" },
        true
      );
    }

    const validateSchema: TypeInference<Schema> = {} as TypeInference<Schema>;

    const isValid = Object.keys(schema).every((key) => {
      const expectedType = schema[key];
      const actualType = typeof item[key];

      if (actualType !== expectedType) {
        return false;
      }

      validateSchema[key] = item[key] as TypeInference<Schema>[keyof Schema];
      return true;
    });

    if (!isValid) {
      throw handleError(
        { type: "invalid-type", message: "Invalid data type" },
        true
      );
    }

    return validateSchema;
  }

  function validateAgainstArraySchema(
    schema: Schema,
    data: unknown[]
  ): ValidationResult<Schema> {
    try {
      const validatedData = data.map((item) => validateItem(schema, item));
      return { data: validatedData as TypeInference<Schema>[] };
    } catch (error) {
      const handledError = handleError(error as Error);
      if (handledError.type === "ValidationError") {
        return { error: handledError.message };
      } else {
        throw error;
      }
    }
  }

  return {
    validateAgainstArraySchema,
    validateItem,
  };
}

// One export per file
export default createValidator;

// fetcher.ts
export type FetchOptions = {
  url: string;
};

export function createFetcher({ url }: FetchOptions) {
  async function get<Type>(endpoint: string): Promise<Type> {
    const response = await fetch(url + endpoint);
    return await handleResponse<Type>(response);
  }

  async function post<Type>(endpoint: string, params: any): Promise<Type> {
    const response = await fetch(url + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return await handleResponse<Type>(response);
  }

  async function getStatus<Type>(endpoint: string): Promise<Type> {
    const response = await fetch(url + endpoint, { method: "HEAD" });
    return await handleResponse<Type>(response);
  }

  async function handleResponse<Type>(response: Response): Promise<Type> {
    if (!response.ok) {
      throw handleError({ type: "APIError", message: response.statusText });
    }
    const result = (await response.json()) as Type;
    return result;
  }

  return { get, post, getStatus };
}

export function useFetcher(options: FetchOptions) {
  const fetcher = createFetcher(options);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function get<Type>(endpoint: string): Promise<void> {
    setStatus("loading");
    try {
      const result = await fetcher.get<Type>(endpoint);
      setData(result);
      setStatus("success");
    } catch (error) {
      setError(error);
      setStatus("error");
      throw error;
    }
  }

  async function post<Type>(endpoint: string, params: any): Promise<void> {
    setStatus("loading");
    try {
      const result = await fetcher.post<Type>(endpoint, params);
      setData(result);
      setStatus("success");
    } catch (error) {
      setError(error);
      setStatus("error");
      throw error;
    }
  }

  async function getStatus<Type>(endpoint: string): Promise<void> {
    setStatus("loading");
    try {
      const result = await fetcher.getStatus<Type>(endpoint);
      setData(result);
      setStatus("success");
    } catch (error) {
      setError(error);
      setStatus("error");
      throw error;
    }
  }

  const getData = useCallback(() => {
    return data;
  }, [data]);

  return { get, post, getStatus, getData, error, status };
}
