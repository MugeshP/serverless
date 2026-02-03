#!/bin/bash

# Configuration
BUCKET_NAME="employee-management-frontend-$(date +%s)"
REGION="us-east-1"

echo "Creating S3 bucket: $BUCKET_NAME"

# Create S3 bucket
aws s3 mb s3://$BUCKET_NAME --region $REGION

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set bucket policy for public read access
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Upload build files to S3
aws s3 sync front-end/build/ s3://$BUCKET_NAME --delete

echo "Frontend deployed successfully!"
echo "Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "Bucket name: $BUCKET_NAME"

# Clean up
rm bucket-policy.json