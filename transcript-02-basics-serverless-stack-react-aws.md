# Part I - The Basics

## Intro

### What is serverless?

Traditionally, we’ve built and deployed web applications where we have some degree of control over the HTTP requests that are made to our server. Our application runs on that server and we are responsible for provisioning and managing the resources for it. There are a few issues with this.

1.  We are charged for keeping the server up even when we are not serving out any requests.
2.  We are responsible for uptime and maintenance of the server and all its resources.
3.  We are also responsible for applying the appropriate security updates to the server.
4.  As our usage scales we need to manage scaling up our server as well. And as a result manage scaling it down when we don’t have as much usage.

For smaller companies and individual developers this can be a lot to handle. This ends up distracting from the more important job that we have; building and maintaining the actual application. At larger organisations this is handled by the infrastructure team and usually it is not the responsibility of the individual developer. However, the processes necessary to support this can end up slowing down development times. As you cannot just go ahead and build your application without working with the infrastructure team to help you get up and running.

As developers we’ve been looking for a solution to these problems and this is where serverless comes in. Serverless allows us to build applications where we simply hand the cloud provider (AWS, Azure, or Google Cloud) our code and it runs it for us. It also allocates the appropriate amount of resources to respond to the usage. On our end we only get charged for the time it took our code to execute and the resources it consumed. If we are undergoing a spike of usage, the cloud provider simply creates more instances of our code to respond to the requests. Additionally, our code runs in a secured environment where the cloud provider takes care of keeping the server up to date and secure.

#### AWS Lambada

In serverless applications we are not responsible for handling the requests that come in to our server. Instead the cloud provider handles the requests and sends us an object that contains the relevant info and asks us how we want to respond to it. The request is treated as an event and our code is simply a function that takes this as the input. As a result we are writing functions that are meant to respond to these events. So when a user makes a request, the cloud provider creates a container and runs our function inside it. If there are two concurrent requests, then two separate containers are created to respond to the requests.

In the AWS world the serverless function is called [AWS Lambda](https://aws.amazon.com/lambda/) and our serverless backend is simply a collection of Lambdas. Here is what a Lambda function looks like.

![Lambda looks like](https://d33wubrfki0l68.cloudfront.net/431b4864a64ada20df9ccccc8a4f4b2e8274b9f8/40bad/assets/anatomy-of-a-lambda-function.png)

Here **myHandler** is the name of our Lambda function. The **event** object contains all the information about hte event that triggered this Lambda. In our case it'll be inofrmation about the HTTP request. The **context** object contains info about the runtime our Lambda function is executing in. After we do all the work inside our Lambda function, we simply call the **callback** function with the results (or the error) and AWS will respond to the HTTP request with it.

While this example is in JavaScript (or Node.js), AWS Lambda supports Python, Java, and C# as well. Lambda functions are charged for every 100ms that it uses and as mentioned above they automatically scale to respond to the usage. The Lambda runtime also comes with 512MB of ephemeral disk space and up to 3008MB of memory.

Next, let's take a deeper look into the advantages of serverless including the cost running our demo app.

### Why create serverless apps?

It is important to address why it is worth learning how to create serverless apps. There are a couple of reasons why serverless apps are favored over traditional server hosted apps.

1.  Low maintenance
2.  Low cost
3.  Easy to scale

The biggest benefit by far is that you only need to worry about your code and nothing else. And the low maintenance is a result of not having any servers to manage. You don't need to actively ensure thart your server is running properly or that you have the right security updates on it. You deal with your own application code and nothing else.

The main reason it's cheaper to run serverless applications is that you are effectively only paying per request. So when your application is not being used, you are not being charged for it. Let's do a quick breakdown of what it would cost for us to run our note taking application. We'll assume that we have 1000 daily active user making 20 requests per day to our API and soring around 10MB of files on S3. Here is a very rough calculation of our costs.

Service Rate Cost
Cognito Free[1] $0.00
API Gateway $3.5/M reqs + $0.09/GB transfer $2.20
Lambda Free[2] $0.00
DynamoDB $0.0065/hr 10 write units, $0.0065/hr 50 read units[3] $2.80
S3 $0.023/GB storage, $0.005/K PUT, $0.004/10K GET, $0.0025/M objects[4] $0.24
CloudFront $0.085/GB transfer + $0.01/10K reqs $0.86
Route53 $0.50 per hosted zone + $0.40/M queries $0.50
Certificate Manager Free $0.00
Total $6.10
[1] Cognito is free for < 50K MAUs and $0.00550/MAU onwards.
[2] Lambda is free for < 1M requests and 400000GB-secs of compute.
[3] DynamoDB gives 25GB of free storage.
[4] S3 gives 1GB of free transfer.

So that comes out to $6.10 per month. Additonally, a .com domain would cost us $12 per year, making that the biggest up from cost for us. But just keep in mind that these are very rough estimates. Real-world usage pattterns are going to be very different. However, these rates should give you a sense of how the cost of running a serverless application is calculated.

Finally, the ease of scaling is thanks in part to DynamoDB which gives us near infinite scale and Lambda that simply scales up to mee the demand. And of ccourse our frontend is a simple static single page app that is almost guaranteed to always respond instantly thanks to CloudFront.

Great! now that you are convinced on why you should jbuild serverless apps; let's get started.

## Set up your AWS Account

### Create an AWS account

Let's first get started by creating an AWS (Amazon Web Services) account. Of course you can skip this if you already have one. Head over the [AWS homepage](https://aws.amazon.com/) and hit the **Create a Free Account** and follow the steps to create your account.

![AWS Login](https://d33wubrfki0l68.cloudfront.net/95863dd1718f385fa8e563fcfbf969008c53129b/42dc3/assets/create-an-aws-account.png)

### Create an IAM user

Amazon IAM (Identity and Access Management) enables you to manage users and user permission in AWS. You can create one or more IAM users in your AWS account. You might create an IAM user for someone who needs access to your AWS console, or when you have a new application that needs to make API calls to AWS. This is to add an extra layer of security to your AWS account.

In this chapter, we are going to create a new IAM user for a couple of the AWS related tools we are going to be using later.

##### Create User

First, log in to your [AWS Console](https://console.aws.amazon.com/) and select IAM from the list of services.

![AIM Screenshoot](https://d33wubrfki0l68.cloudfront.net/2cc2854ec2266c61eefd5669659a0095f83fc46a/ab671/assets/iam-user/select-iam-service.png)

Select **Users**

![Select Users Screenshot](https://d33wubrfki0l68.cloudfront.net/4c2766065b39aeeac766f46cdb2538bad9fbdce8/5c978/assets/iam-user/select-iam-users.png)

Select **Add User**.

![Add User Screenshot](https://d33wubrfki0l68.cloudfront.net/de5fa16c1b15b229629d7af7a5a6603f63356780/2a7ea/assets/iam-user/add-iam-user.png)

Enter a **User name** and check **Programmatic access**, then select **Next: Permissions**.

This account will be used by our [AWS CLI](https://aws.amazon.com/cli/) and [Serverless Framework](https://serverless.com/). They'll be connecting to the AWS API directly and will not be using the Management Console.

![User Permissions SS](https://d33wubrfki0l68.cloudfront.net/9a42c97feca4f90c37c8bd270216b24392bdf306/50b58/assets/iam-user/fill-in-iam-user-info.png)

Select **Attach existing policies directly**.

![Policies SS](https://d33wubrfki0l68.cloudfront.net/6afa9e4c6697d3708bcefbdbcb69339bc33eec1e/3d53b/assets/iam-user/add-iam-user-policy.png)

Search for **AdministratorAccess** and select the policy, then select **Next: Review**.

We can provide a more fine-grained policy here and we cover this later in the [Customize the Serverless IAM Policy](https://serverless-stack.com/chapters/customize-the-serverless-iam-policy.html) chapter. But for now, let's continue with this.

Select **Create user**

![Create User](https://d33wubrfki0l68.cloudfront.net/a98dcdcef6a52e1978d5b37e2dd1d13a39df7fe0/8f886/assets/iam-user/review-iam-user.png)

#### What is IAM

#### What is an ARN

### Configure the AWS CLI

## Setting up the serverless backend

### Create a DynamoDB table

### Create an S3 bucket for file uploads

### Create a Cognito user pool

#### Create a Cognito test user

### Set up the Serverless Framework

#### Add support for ES6/ES7 JavaScript
