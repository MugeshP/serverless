# Employee Management System

A serverless employee management system with React frontend and Hapi.js backend.

## Architecture
- **Backend**: Hapi.js on AWS Lambda with DynamoDB
- **Frontend**: React app deployed to S3
- **Infrastructure**: Serverless Framework

## Deployment

### 1. Deploy Backend
```bash
cd back-end
npm install
npx serverless deploy
```

### 2. Update Frontend API URL
After backend deployment, update the API_URL in `front-end/src/App.js` with your API Gateway URL.

### 3. Deploy Frontend
```bash
./deploy-frontend.sh
```

## API Endpoints
- `GET /employees` - Get all employees
- `GET /employees/{id}` - Get employee by ID
- `POST /employees` - Create employee
- `PUT /employees/{id}` - Update employee
- `DELETE /employees/{id}` - Delete employee

## Employee Schema
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "position": "string",
  "salary": "number"
}
```

## Prerequisites
- AWS CLI configured
- Node.js 18+
- Serverless Framework