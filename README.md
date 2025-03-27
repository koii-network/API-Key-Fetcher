# Koii Task Template 🚀

## Project Overview

This repository is a template for developing decentralized tasks on the Koii Network, providing a comprehensive framework for creating blockchain-powered distributed computing applications. The Koii Task Template enables developers to build, test, and deploy tasks that can be executed across multiple nodes in a decentralized environment.

### Key Features

- Modular task development structure
- Built-in task lifecycle management
- Supports complex distributed computing scenarios
- Easy testing and simulation of task rounds
- Robust error handling and audit mechanisms

### Typical Use Cases

- Distributed data processing
- Decentralized web scraping
- Computation offloading
- Consensus-driven task execution
- Incentivized computing tasks

## Getting Started

### Prerequisites

- **Node.js** (version >=20.0.0, LTS Versions only)
- _(Optional)_ Docker Compose for containerized deployments

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/koii-network/task-template.git
   cd task-template
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Copy the developer environment file:
   ```bash
   cp .env.developer.example .env
   ```

### Development Commands

- Run tests: `yarn test`
- Simulate full task cycle: `yarn simulate`
- Start development server: `yarn start`
- Webpack build: `yarn webpack`
- Production debug: `yarn prod-debug`

## API and Task Structure

The task is organized into multiple modular files, each handling a specific aspect of the task lifecycle:

- `src/task/0-setup.js`: Initial setup steps
- `src/task/1-task.js`: Core task logic
- `src/task/2-submission.js`: Result submission mechanism
- `src/task/3-audit.js`: Work auditing functions
- `src/task/4-distribution.js`: Rewards distribution logic
- `src/task/5-routes.js`: Custom API routes

### Task Round Flow

Each task operates in periodic rounds with the following stages:
1. **Task Execution**: Perform the primary task logic
2. **Work Submission**: Submit computational results
3. **Auditing**: Verify work across nodes
4. **Reward Distribution**: Allocate rewards based on performance

## Authentication and Security

The Koii Task Template integrates with Koii's decentralized authentication:
- Uses wallet-based authentication
- Supports secure transaction signing
- Implements gradual consensus mechanisms

## Technologies Used

- **Runtime**: Node.js (ESM)
- **Blockchain**: Koii Network
- **Package Management**: Yarn
- **Build Tools**: Webpack
- **Testing**: Jest
- **Key Libraries**:
  - `@_koii/task-manager`
  - `@_koii/web3.js`
  - Axios
  - Puppeteer

## Deployment

### Local Testing
1. Build executable: `yarn webpack`
2. Use Koii Desktop Node for testing
3. Add task using Task ID

### Production Deployment
1. Configure `config-task.yml`
2. Use Koii Create Task CLI: `npx @_koii/create-task-cli@latest`

## Environment Configuration

Supports multiple environment configurations:
- `.env.developer.example`: Development settings
- `.env.local.example`: Local testing configuration
- Configurable global timers for task synchronization

## Contribution

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

## Support

- [Koii Network Discord](https://discord.gg/koii-network)
- [Documentation](https://docs.koii.network)

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Disclaimer

This is a template and should be customized according to specific task requirements. Always thoroughly test your implementation before production deployment.