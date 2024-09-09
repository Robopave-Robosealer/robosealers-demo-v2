# robosealers-demo-v2
the fullstack demo version of robosealers (client + server) to be ready for deploy on AWS EC2

#Install and Configure CodeDeploy Agent on EC2

Connect to your EC2 instance and run the following commands to install the CodeDeploy agent:
sudo apt-get update
sudo apt-get install ruby-full
cd /home/ubuntu
wget https://aws-codedeploy-us-west-2.s3.us-west-2.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent start

Replace us-west-2 with our appropriate AWS region (us-east-1).

2. Create an Application and Deployment Group in CodeDeploy

Go to the AWS CodeDeploy console.

Create a new application.

Create a new deployment group within this application, specifying your EC2 instance and the service role.

3. Configure GitHub Actions

Create a .github/workflows/deploy.yml file in your GitHub repository to define the workflow for automatic deployment. Here's an example configuration:

name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20" # Specify your Node.js version

      - name: Install server dependencies
        run: |
          cd server
          npm install

      - name: Install client dependencies and build
        run: |
          cd client
          yarn install
          yarn build

      - name: Move build files to server public directory
        run: |
          mv client/build/* server/public/

      # - name: Archive production artifacts
      #   run: zip -r production.zip server # Adjust the files to be archived as needed

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1 # Replace with your AWS region

      # - name: Upload artifact to S3
      #   run: aws s3 cp production.zip s3://my-bucket-name/production.zip # Replace with your S3 bucket name

      - name: Deploy to EC2 via CodeDeploy
        run:
          aws deploy create-deployment \
          --application-name RobosealersApp \ --deployment-group-name RobosealersAppDeploymentGroup \ # Replace with your App name and deployment group name
          # --s3-location bucket=my-bucket-name,key=production.zip,bundleType=zip # Replace with your S3 bucket name and key


Make sure to replace placeholders like my-bucket-name, MyApplicationName, and MyDeploymentGroupName with your actual AWS resources.

4. Store Secrets in GitHub

Add your AWS credentials and other necessary secrets to your GitHub repository settings:

Go to your repository on GitHub.

Click on Settings.

Go to Secrets > Actions.

Add the following secrets:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

5. Create Deployment Scripts

Here’s an example of what your install_dependencies.sh and start_server.sh might look like:

install_dependencies.sh:

#!/bin/bash
cd /home/ubuntu/apps/robosealers-demo-v2/server
npm install


start_server.sh:


#!/bin/bash
pm2 stop all
pm2 start /home/ubuntu/apps/robosealers-demo-v2/server/configs/server.js --name robosealers # Adjust the start command as needed


Ensure these scripts are executable:

chmod +x scripts/install_dependencies.sh
chmod +x scripts/start_server.sh

Commit and push your changes to GitHub.
