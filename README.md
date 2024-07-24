`playwright-cleanup-queue` simplifies resource cleanup in [Playwright](https://playwright.dev/) tests by allowing you to register cleanup tasks for individual tests. This is beneficial for complex test setups, enabling you to teardown only the resources that were created in case a test fails. Cleanup tasks are executed in reverse order of their registration, ensuring that interdependent resources can be cleaned up correctly.

## Features

Register cleanup tasks specific to individual tests.
Ensures cleanup tasks are executed in the correct order.
Independent of test success or failure.

## Installation

You can install `playwright-cleanup-queue` using npm:

```bash
npm install playwright-cleanup-queue --save-dev
```

Or with yarn:

```bash
yarn add playwright-cleanup-queue --dev
```

## Usage

Import the `cleanup` fixture and the `CleanupQueue` type from the `playwright-cleanup-queue` package.

```typescript
import { cleanup, CleanupQueue } from 'playwright-cleanup-queue'
```

Extend Playwright's base test to include the `cleanup` fixture and add the `CleanupQueue` type as a type parameter.

```typescript
export const test = base.extend<CleanupQueue>({
  cleanup
})
```

Write your tests and use the `cleanup` fixture to register cleanup tasks. Each task will be executed after the test completes, in reverse order of their registration.

```typescript
import { test } from './fixtures'

test('should create todo and comment', async ({ page, cleanup }, testInfo) => {
  const todo = await createTodo()
  cleanup(() => todo.delete())

  comment = todo.addComment()
  cleanup(() => comment.delete())

  /* ... */
})
```

## Typescript support

Typescript is supported for this plugin.
