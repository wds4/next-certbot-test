This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Used: 

- https://dev.to/j3rry320/deploy-your-nextjs-app-like-a-pro-a-step-by-step-guide-using-nginx-pm2-certbot-and-git-on-your-linux-server-3286

create .github/workflows/deploy.yml: 

```
name: Deploy Next.js App to AWS EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm install

      - name: Build Next.js app
        run: npm run build

      - name: Build & Deploy
        env:
            PRIVATE_KEY: ${{ secrets.AWS_EC2_KEY }}
            HOSTNAME: ${{secrets.AWS_EC2_HOST}}
            USER_NAME: ${{secrets.AWS_EC2_USER}}

        run: |
          echo "$PRIVATE_KEY" > private_key && chmod 600 private_key
          ssh -o StrictHostKeyChecking=no -i private_key ${USER_NAME}@${HOSTNAME} '

              # Now we have got the access of EC2 and we will start the deploy .
              cd /home/ubuntu/next-certbot-test &&
              git pull origin main &&
              npm install &&
              npm run build &&
              pm2 restart all 
              '
```

where AWS_EC2_USER = ubuntu, AWS_EC2_KEY is my pem key, and AWS_EC2_HOST was ec2-44-220-137-243.compute-1.amazonaws.com; these are in github repo, settings, secrets and variables, actions, repository secrets 

## neo4j

https://neo4j.com/docs/operations-manual/current/installation/linux/debian/

Add the official OpenJDK package repository to apt:

```
sudo add-apt-repository -y ppa:openjdk-r/ppa
sudo apt-get update
```

install neo4j

```
wget -O - https://debian.neo4j.com/neotechnology.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/neotechnology.gpg
echo 'deb [signed-by=/etc/apt/keyrings/neotechnology.gpg] https://debian.neo4j.com stable latest' | sudo tee -a /etc/apt/sources.list.d/neo4j.list
sudo apt-get update
```

```
sudo apt-get install neo4j=1:5.25.1
```

npm i neo4j-driver

sudo systemctl enable neo4j

cat /etc/neo4j/neo4j.conf
sudo systemctl edit neo4j.service


