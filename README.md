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
    - [Step 4: Set Up Custom Domain with GoDaddy and Route 53](#step-4-set-up-custom-domain-with-godaddy-and-route-53)
    - [Step 5: Request SSL Certificate with AWS Certificate Manager](#step-5-request-ssl-certificate-with-aws-certificate-manager)
  - [Testing](#testing)
  - [Future Improvements](#future-improvements)
  - [Resources](#resources)

## Project Overview

This project is my implementation of the Cloud Resume Hosting, a hands-on project designed to help learn and showcase cloud skills, particularly with AWS. The challenge involves creating a personal resume website hosted entirely on AWS, incorporating various services to create a static website with content delivery capabilities, using a custom domain registered with GoDaddy.

## Architecture

The project uses the following AWS services and external components:

- **S3**: Hosts the static website files (HTML, CSS, JavaScript)
- **CloudFront**: Provides content delivery and HTTPS
- **Route 53**: Manages DNS settings
- **AWS Certificate Manager**: Provides SSL/TLS certificate
- **GoDaddy**: Domain registrar [ This is what i used . You can also get your domain from Route 53 at prices starting from $15 ]

## Prerequisites

- An AWS account
- Basic knowledge of HTML, CSS, and JavaScript
- A domain name registered with GoDaddy/NameCheap etc [ or Route 53]

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
        <p>&copy; 2024 Your Name</p>
    </footer>
</body>
</html>
```
You can also download and edit templates from https://nicepage.com/html-templates

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

### Step 4: Set Up Custom Domain with GoDaddy and Route 53

1. In Route 53, create a public hosted zone for your domain
2. Note the NS (Name Server) records provided by Route 53
3. Log in to your GoDaddy account and update the domain's nameservers to use the ones provided by Route 53
4. In Route 53, create an A record that points to your CloudFront distribution using "Alias to CloudFront distribution"

### Step 5: Request SSL Certificate with AWS Certificate Manager

1. Open the AWS Certificate Manager console
2. Click "Request a certificate"
3. Enter your domain name (and optionally, www subdomain)
4. Choose DNS validation method
5. Create the required CNAME records in Route 53 to validate domain ownership
6. Wait for the certificate to be issued
7. In your CloudFront distribution settings, update the SSL certificate to use the newly issued ACM certificate

## Testing

- Manually test your website by accessing it through your custom domain
- Ensure that HTTPS is working correctly
- Use browser developer tools to ensure all resources are loading correctly
- Test your website on different devices and browsers to ensure responsiveness

## Future Improvements

- Implement CI/CD pipeline for automatic deployments
- Use Terraform or CloudFormation for infrastructure as code
- Add more interactive elements to the resume
- Implement a blog section using a serverless CMS
- Add a visitor counter using API Gateway, Lambda, and DynamoDB

## Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
- [S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/index.html)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/index.html)
- [AWS Certificate Manager Documentation](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
- [GoDaddy Help: Changing Nameservers](https://www.godaddy.com/help/change-nameservers-for-my-domains-664)
