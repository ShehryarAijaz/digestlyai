import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'BackendQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // 1. Define Lambda (bundle TypeScript entry)
    const sendEmailLambda = new lambdaNode.NodejsFunction(this, 'SendEmailLambda', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      entry: path.join(__dirname, '..', 'lambda', 'sendEmail.ts'),
      handler: 'handler',
    });

    // 2. EventBridge Rule (cron job every minute for testing)
    const rule = new events.Rule(this, "SendEmailSchedule", {
      schedule: events.Schedule.expression("cron(* * * * ? *)")
    });

    // 3. Attach Lambda as Target
    rule.addTarget(new targets.LambdaFunction(sendEmailLambda))
  }
}
