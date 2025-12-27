# PhoneLab

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

## API Documentation

- Local: `http://localhost:3000` (common default)

| Endpoint         | HTTP     | Description       | Available |
| ---------------- | -------- | ----------------- | --------- |
| `/phones`        | `GET`    | Get all phones    | ✅        |
| `/phones/{slug}` | `GET`    | Get item by id    | ✅        |
| `/phones`        | `POST`   | Add new item      | ✅        |
| `/phones`        | `DELETE` | Delete all phones | ✅        |
| `/phones/{id}`   | `DELETE` | Delete item by id | ✅        |
| `/phones/{id}`   | `PATCH`  | Patch item by id  |           |
| `/phones/{id}`   | `PUT`    | Update item by id | ✅        |
