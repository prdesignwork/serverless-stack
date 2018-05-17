# Introduction

## Who is this guide for?

This guide is meant for full-stack developers or developers that would like to build full stack serverless applications. By providing a step-by-step guide for both the frontend and the backend we hope that it addresses all the different aspects of building serverless applications. There are quite a few other tutorials on the web but we think it would be useful to have a single point of reference for the entire process. This guide is meant to serve as a resource for learning about how to build and deploy serverless applications, as opposed to laying out the best possible way of doing so.

So you might be a backend developer who would like to learn more about the frontend portion of building serverless apps or a frontend developer that would like to learn more about the backend; this guide should have you covered.

We are also catering this solely towards JavaScript developers for now. We might target other languages and environments in the future. But we think this is a good starting point because it can be really beneficial as a full-stack developer to use a single language (JavaScript) and environment (Node.js) to build your entire application.

On a personal note, the serverless approach has been a giant revelation for us and we wanted to create a resource where we could share what we’ve learned. You can read more about us [here](https://serverless-stack.com/about.html).

Let’s start by looking at what we’ll be covering.

## What Does This Guide Cover?

To step through the major concepts involved in building web applications, we are going to be building a simple note taking app called [Scratch](https://demo.serverless-stack.com/).

![Scratch App Desktop Screen](https://d33wubrfki0l68.cloudfront.net/eca32e964868dbb2222cae5523fe548eccb91168/c4838/assets/completed-app-desktop.png)

![Scratch Mobile App Screen](https://d33wubrfki0l68.cloudfront.net/26e33d36d0d9b7358fb78c3a0d3ed437c8ba9e32/c6a66/assets/completed-app-mobile.png)

It is a single page application powered by a serverless API written completely in JavaScript. Here is the complete source for the [backend](https://github.com/AnomalyInnovations/serverless-stack-demo-api) and the [frontend](https://github.com/AnomalyInnovations/serverless-stack-demo-client). It is a relatively simple application but we are going to address the following requirements.

* Should allow users to signup and login to their accounts
* Users should be able to create notes with some content
* Each note can also have an uploaded file as an attachment
* Allow users to modify their note and the attachment
* Users can also delete their notes
* App should be served over HTTPS on a custom domain
* The backend APIs need to be secure
* The app needs to be responsive

We’ll be using the AWS Platform to build it. We might expand further and cover a few other platforms but we figured the AWS Platform would be a good place to start.

### Technologies & Services

We’ll be using the following set of technologies to build our serverless application.

* [Lambda](https://aws.amazon.com/lambda/) & [API Gateway](https://aws.amazon.com/api-gateway/) for our serverless API
* [DynamoDB](https://aws.amazon.com/dynamodb/) for our database
* [Cognito](https://aws.amazon.com/cognito/) for user authentication and securing our APIs
* [S3](https://aws.amazon.com/s3/) for hosting our app and file uploads
* [CloudFront](https://aws.amazon.com/cloudfront/) for serving out our app
* [Route](https://aws.amazon.com/route53/) 53 for our domain
* [Certificate Manager](https://aws.amazon.com/certificate-manager) for SSL
* [React.js](https://facebook.github.io/react/) for our single page app
* [React Router](https://github.com/ReactTraining/react-router) for routing
* [Bootstrap](http://getbootstrap.com/http://getbootstrap.com/) for the UI Kit
* [Stripe](https://stripe.com/) for processing credit card payments
* [Seed](https://seed.run/) for automating Serverless deployments
* [Netlify](https://netlify.com/) for automating React deployments
* [GitHub](https://github.com/) for hosting our project repos.

While the list above might look daunting, we are trying to ensure that upon completing the guide you’ll be ready to build **real-world**, secure, and **fully-functional** web apps. And don’t worry we’ll be around to help!

### Requirements

You need Node v8.10+ and NPM v5.5+. You als need to have basic knowledge of how to use the command line. And a GitHub account.

The services that we are going to be using for the purpose of the tutorial should fall in their respective free tiers. This of course does not apply to purchasing a new domain to host your app. Also for AWS, you are required to put in a credit card while creating an account. So if you happen to be creating resources above and beyond what we cover in this tutorial, you might end up getting charged.

### How This Guide Is Structured

The guide is split into two separate parts. They are both relatively standalone. The first part covers the basics while the covers a couple of adnvaced topis along with a way to automate the setup. We launched this guide in early 2017 with just the first part. The Serverless Stack community has grown and many of our readers have used the setup described in this guide to build apps that power thedir businesses.

So we decided to extend the guide and add a second part to it. This is targeting folks that are intending to use this setup for their projects. It automates all the manual steps from part 1 and helps you create a production ready workflow that you can use for all your serverless projects. Here is what we cover in the two parts.

#### Part I

Create the notes application and deploy it. We cover all the basics. Each service is created by hand. Here is what is covered in order.

For the backend:

* Configure your AWS account
* Create your database using DynamoDB
* Set up S3 for file uploads
* Set up Cognito User Pools to manage user accounts
* Set up Cognito Identity Pool to secure our file uploads
* Set up the Serverless Framework to work with Lambda & API Gateway
* Write the various backend APIs

For the frontend:

* Set up our project with Create React App
* Add favicons, fonts, and a UI Kit using Bootstrap
* Set up routes using React-Router
* Use AWS Cognito SDK to login and signup users
* Plugin to the backend APIs to manage our notes
* Use the AWS JS SDK to upload files
* Create an S3 bucket to upload our app
* Configure CloudFront to serve out our app
* Point our domain with Route 53 to CloudFront
* Set up SSL to serve our app over HTTPS

#### Part II

Aimed at folks who are looking to use the Serverless Stack for their day-to-day projects. We automate all the steps from the first part. Here is what is covered in order.

For the backend:

* Configure DynamoDB through code
* Configure S3 through code
* Configure Cognito User Pool through code
* Configure Cognito Identity Pool through code
* Environment variables in Serverless Framework
* Working with the Stripe API
* Working with secrets in Serverless Framework
* Unit tests in Serverless
* Automating deployments using Seed
* Configuring custom domains through Seed
* Monitoring deployments through Seed

For the frontend

* Environments in Create React App
* Accepting credit card payments in React
* Automating deployments using Netlify
* Configure custom domains through Netlify

We think this will give you a good foundation on building full-stack production ready serverless applications. If there are any other concepts or technologies you’d like us to cover, feel free to let us know on our [forums](https://discourse.serverless-stack.com/).

## How to Get Help?

In case you find yourself having problems with a certain step, we want to make sure that we are around to help you fix it and figure it out. There are a few ways to get help.

* We use [Discourse forum topics](https://discourse.serverless-stack.com/) as our comments and we’ve helped resolve quite a few issues in the past. So make sure to check the comments under each chapter to see if somebody else has run into the same issue as you have.
* Post in the comments for the specific chapter detailing your issue and one of us will respond.

![Discourse forum screenshot](https://d33wubrfki0l68.cloudfront.net/f58bb408cfb9b9372df3c7fd578e814b5ec173c9/e9a78/assets/serverless-stack-discourse-forums.png)

This entire guide is hosted on [GitHub](https://github.com/AnomalyInnovations/serverless-stack-com). So if you find an error you can always:

* Open a [new issue](https://github.com/AnomalyInnovations/serverless-stack-com/issues/new)
* Or if you've found a typo, edit the page and submit a pull request
