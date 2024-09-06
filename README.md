# Cloud Resume Hosting

## Table of Contents
- [Cloud Resume Hosting](#cloud-resume-hosting)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Architecture](#architecture)
  - [Prerequisites](#prerequisites)
  - [Implementation Steps](#implementation-steps)
    - [Step 1: Create and Style Your Resume](#step-1-create-and-style-your-resume)
    - [Step 2: Set Up S3 Static Website Hosting](#step-2-set-up-s3-static-website-hosting)
    - [Step 3: Configure CloudFront](#step-3-configure-cloudfront)
    - [Step 4: Set Up Custom Domain with Route 53](#step-4-set-up-custom-domain-with-route-53)
    - [Step 5: Create DynamoDB Table](#step-5-create-dynamodb-table)
    - [Step 6: Create Lambda Function](#step-6-create-lambda-function)
    - [Step 7: Set Up API Gateway](#step-7-set-up-api-gateway)
    - [Step 8: Add Visitor Counter to Your Resume](#step-8-add-visitor-counter-to-your-resume)
  - [Testing](#testing)
  - [Future Improvements](#future-improvements)
  - [Resources](#resources)

## Project Overview

This project is my implementation of the Cloud Resume Hosting, a hands-on project designed to help learn and showcase cloud skills, particularly with AWS. The challenge involves creating a personal resume website hosted entirely on AWS, incorporating various services to create a full-stack serverless application.

## Architecture

![Cloud Resume Hosting](https://github.com/user-attachments/assets/4f1eb0f3-397a-41bd-801c-167b0d10a31c)

The project uses the following AWS services:

- **S3**: Hosts the static website files (HTML, CSS, JavaScript)
- **CloudFront**: Provides content delivery and HTTPS
- **Route 53**: Manages the domain and DNS
- **API Gateway**: Creates a RESTful API
- **Lambda**: Runs serverless functions
- **DynamoDB**: Stores the visitor counter data

## Prerequisites

- An AWS account
- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with Python
- A domain name (for the custom domain setup)

## Implementation Steps

### Step 1: Create and Style Your Resume

Create your resume using HTML and CSS. Here's a basic structure to get you started:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Resume</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Your Name</h1>
        <p>Web Developer | Cloud Enthusiast</p>
    </header>
    <main>
        <!-- Add your resume sections here -->
    </main>
    <footer>
        <p>Visitor Count: <span id="visitor-count">0</span></p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
```
You can also download and edit the sites from https://nicepage.com/html-templates

### Step 2: Set Up S3 Static Website Hosting

1. Create an S3 bucket with a unique name (e.g., "your-name-resume")
2. Enable static website hosting in the bucket properties
3. Upload your HTML, CSS, and JavaScript files to the bucket
4. Set the bucket policy to allow public read access:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

### Step 3: Configure CloudFront

1. Create a CloudFront distribution
2. Set the S3 bucket as the origin
3. Configure HTTPS settings
4. Set the default root object to "index.html"

### Step 4: Set Up Custom Domain with Route 53

1. Register a domain in Route 53 (or transfer an existing domain)
2. Create an A record that points to your CloudFront distribution
3. Request an SSL certificate using AWS Certificate Manager
4. Associate the SSL certificate with your CloudFront distribution

### Step 5: Create DynamoDB Table

1. Create a new DynamoDB table named "visitor-count"
2. Set the partition key to "id" (String)
3. Add an item with id "visitors" and a number attribute "count" set to 0

### Step 6: Create Lambda Function

Create a new Lambda function with the following Python code:

```python
import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-count')

def lambda_handler(event, context):
    response = table.get_item(Key={'id': 'visitors'})
    count = response['Item']['count']
    count += 1
    
    table.put_item(Item={'id': 'visitors', 'count': count})
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'count': count})
    }
```

Ensure the Lambda function has the necessary permissions to read and write to the DynamoDB table.

### Step 7: Set Up API Gateway

1. Create a new REST API
2. Create a GET method and integrate it with your Lambda function
3. Enable CORS
4. Deploy the API

### Step 8: Add Visitor Counter to Your Resume

Update your `script.js` file to fetch the visitor count from your API:

```javascript
async function getVisitorCount() {
  const response = await fetch('YOUR_API_GATEWAY_URL');
  const data = await response.json();
  document.getElementById('visitor-count').innerText = data.count;
}

getVisitorCount();
```

Replace `'YOUR_API_GATEWAY_URL'` with the actual URL of your deployed API.

## Testing

- Manually test your website by accessing it through your custom domain
- Use browser developer tools to ensure the visitor count is being fetched correctly
- Test your Lambda function using the AWS Console

## Future Improvements

- Implement CI/CD pipeline for automatic deployments
- Use Terraform for provisioning
- Add more interactive elements to the resume
- Implement a blog section using a serverless CMS

## Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
