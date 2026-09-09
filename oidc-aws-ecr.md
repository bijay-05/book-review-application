# OIDC Protocol to Push Docker Image to AWS ECR

We will use OIDC protocol for Identity Providers to authenticate Github Action workflow job (Pushing Docker Image Job) to AWS.

## Steps

1. Create **IAM OIDC Identity Provider** in **AWS** for **Github Actions**

```bash
# provider_url: https://token.actions.githubusercontent.com
# audience: sts.amazonaws.com

aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
```

2. Create IAM Role with Trust Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          // Check Default Subject Claim Prefix in Settings: Settings > Actions > OIDC
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_ORG/YOUR_REPO_NAME:*"
        }
      }
    }
  ]
}
```

Create the role using Trust Policy

```bash
aws iam create-role \
  --role-name GitHubActionsOIDCRole \
  --assume-role-policy-document file://trust-policy.json \
  --description "Role assumed by GitHub Actions via OIDC"
```

> [!Important]
> Keep note of the ARN of the above created Role to pass as variable/secrets in Github Actions workflow.

3. Create Policy for the Role and attach to the Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

```bash
aws iam create-policy \
  --policy-name GitHubActionsS3DeployPolicy \
  --policy-document file://s3-deploy-policy.json

aws iam attach-role-policy \
  --role-name GitHubActionsOIDCRole \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsS3DeployPolicy
```
