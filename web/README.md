# <p align="center">![College Resources](https://raw.githubusercontent.com/college-resources/static/master/cores_logo_512.png)</p>

# The website of College Resources

The go-to place for all your college needs. From course notes and previous exams to grades and feeding schedules.

_See [college-resources/api](https://github.com/college-resources/api) for the API of this website._

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites (Windows)

1. [NodeJS 14.X](https://nodejs.org/dist/latest-v14.x)
   (Recommended version: [NodeJS 14.17.2 x64](https://nodejs.org/dist/v14.17.2/node-v14.17.2-x64.msi))

2. [Git for Windows](https://git-scm.com/download/win)

### Prerequisites (Linux)

1. [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating)

2. [Git for Linux](https://git-scm.com/download/linux)

### Downloading

Navigate to the folder where you want the project to be saved and run the following command:

```bash
git clone https://github.com/college-resources/web.git
```

### Preparing

1. Navigate to the root of the project.

2. **(Linux)** Run `nvm use`.

3. Run `npm install`.

4. Copy the `.env.example` file, rename it to `.env` and fill in your environment variables.

### Running

#### Development

1. In the root of the project run `npm run dev`.

2. Wait for it to compile and click the `http://localhost:3000` link when it appears.

#### Production

1. In the root of the project run

```bash
npm run build
npm start
```

2. When the server starts, go to `http://localhost:3000`
