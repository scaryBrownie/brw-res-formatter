# Response Formatter

This project, named **brw-res-formatter**, provides a simple response formatter for Express.js applications, allowing you to easily send standardized JSON responses for both success and error cases. It includes both JavaScript and TypeScript implementations.

## Installation

To install the package, run:

```
npm install brw-res-formatter
```

## Usage

### JavaScript

You can use the JavaScript version by importing the functions from `file-formatter.js`:

```javascript
import { sendResponse, sendErrorResponse, sendSuccessResponse } from 'brw-res-formatter/src/file-formatter.js';

// Example usage in an Express route
app.get('/example', (req, res) => {
  sendSuccessResponse(res, 200, "Data retrieved successfully", { data: "example data" });
});
```

### TypeScript

For TypeScript users, you can import the functions from `file-formatter.ts`:

```typescript
import { sendResponse, sendErrorResponse, sendSuccessResponse } from 'brw-res-formatter/src/file-formatter.ts';

// Example usage in an Express route
app.get('/example', (req, res) => {
  sendSuccessResponse(res, 200, "Data retrieved successfully", { data: "example data" });
});
```

## Functions

### `sendResponse(res, statusCode, success, message, data)`

- **res**: The response object from Express.
- **statusCode**: The HTTP status code to send.
- **success**: A boolean indicating the success of the operation.
- **message**: A message to include in the response.
- **data**: Optional data to include in the response.

### `sendErrorResponse(res, statusCode, message)`

- **res**: The response object from Express.
- **statusCode**: The HTTP status code (default is 500).
- **message**: The error message (default is "Server error").

### `sendSuccessResponse(res, statusCode, message, data)`

- **res**: The response object from Express.
- **statusCode**: The HTTP status code (default is 200).
- **message**: A success message (default is "Operation successful").
- **data**: Optional data to include in the response.

## License

This project is licensed under the MIT License.