# Database Setup

## Overview

The project uses PostgreSQL as its primary relational database.
All database structure and seed data are defined via version-controlled SQL scripts to ensure reproducibility.

```
morpheus/
└── database/
    ├── schema.sql
    └── seed.sql
```

---

## schema.sql

Defines the complete relational schema, including:

* UUID extension setup
* Core domain tables (users, tutors, students, sessions, chat, forum, AI, reviews, etc.)
* Foreign key relationships
* Constraints and indexes for data integrity and performance

The schema supports authentication, live tutoring sessions, messaging, shadow learning, forums, and AI-assisted features.

---

## seed.sql

Provides development sample data:

* Initial subjects
* Sample student and tutor accounts
* Associated profiles

The file is idempotent and safe to re-run using:

```
ON CONFLICT DO NOTHING
```

---

## Execution

Create database:

```
CREATE DATABASE morpheus_db;
```

Run schema:

```
"/c/Program Files/PostgreSQL/18/bin/psql.exe" -U postgres -p 5433 -d morpheus_db -f database/schema.sql
```

Run seed:

```
"/c/Program Files/PostgreSQL/18/bin/psql.exe" -U postgres -p 5433 -d morpheus_db -f database/seed.sql
```

---

## Status

* Database created
* Full schema applied
* Seed data applied
* All SQL scripts committed

The database layer is ready for backend integration.
