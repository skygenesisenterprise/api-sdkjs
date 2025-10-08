
# Sky Genesis Enterprise API SDK

The **Sky Genesis Enterprise API SDK** provides a unified, developer-friendly interface to interact with all Sky Genesis Enterprise services, including domains, DNS, mail, data, and more. This SDK acts as a central client that manages authentication, requests, logging, and configuration while exposing all core modules in a single import.

---

## 📦 Installation

```bash
npm install @skygenesisenterprise/api-sdk
# or
yarn add @skygenesisenterprise/api-sdk
```

---

## ⚡ Quick Start

```ts
import { SGEClient, DNS, Mail, Domain } from "@skygenesisenterprise/api-sdk";

// Initialize the central client
const client = new SGEClient({ apiKey: process.env.SGE_TOKEN });

// Instantiate modules
const dns = new DNS(client);
const mail = new Mail(client);
const domain = new Domain(client);

// Example usage
await domain.register("example.com");
await dns.addRecord("example.com", { type: "A", value: "192.168.1.1" });
await mail.createMailbox("contact@example.com");
```

---

## 🧩 Modules

* **SGEClient** – Core client for managing authentication, requests, and configuration.
* **DNS** – Add, remove, and manage DNS records for your domains.
* **Domain** – Register, transfer, or manage domains.
* **Mail** – Create and manage mailboxes within your domains.

> More modules can be added in the future, all integrated through the central SDK.

---

## 🔑 Authentication

All requests require a valid API key. The `SGEClient` handles token usage automatically, ensuring that all modules share the same authentication context.

```ts
const client = new SGEClient({ apiKey: process.env.SGE_TOKEN });
```

---

## 📚 Features

* Unified SDK for multiple services
* Modular architecture with a single import
* Centralized authentication and request handling
* TypeScript support and autocompletion
* Extendable with specialized modules

---

## 🛠 Usage Tips

* Always instantiate modules with the **central client**.
* Avoid using modules independently outside the SDK — the client ensures secure, consistent API requests.
* Check the module documentation for advanced usage and options.

---

## 🚀 Contribution

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

[MIT License](LICENSE)
