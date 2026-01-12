# Data dictionary

## 1️⃣ users
| Colonne       | Type         | Description             |
| ------------- | ------------ | ----------------------- |
| id            | UUID (PK)    | Identifiant utilisateur |
| username      | TEXT         | Nom d'utilisateur       |
| email         | TEXT         | Email unique            |
| password      | TEXT         | Mot de passe hashé      |
| role          | ENUM         | `ADMIN` / `USER`        |
| is_active     | BOOLEAN      | Compte actif            |
| created_at    | TIMESTAMP    | Création                |
| updated_at    | TIMESTAMP    | Mise à jour             |

## 2️⃣ projects
| Colonne     | Type         | Description              |
| ----------- | ------------ | ------------------------ |
| id          | UUID (PK)    | Identifiant projet       |
| name        | TEXT         | Nom                      |
| description | TEXT         | Description              |
| owner_id    | UUID (FK)    | Utilisateur propriétaire |
| is_active   | BOOLEAN      | Statut                   |
| created_at  | TIMESTAMP    | Création                 |
| updated_at  | TIMESTAMP    | Mise à jour              |

- 🔗 **Relation** → projects.owner_id → users.id

## 3️⃣ tasks
| Colonne     | Type         | Description                     |
| ----------- | ------------ | ------------------------------- |
| id          | UUID (PK)    | Identifiant tâche               |
| project_id  | UUID (FK)    | Projet associé                  |
| title       | TEXT         | Titre                           |
| description | TEXT         | Description                     |
| status      | ENUM         | `TODO` / `IN_PROGRESS` / `DONE` |
| created_at  | TIMESTAMP    | Création                        |
| updated_at  | TIMESTAMP    | Mise à jour                     |

- 🔗 **Relation** → tasks.project_id → projects.id

## 4️⃣ audit_logs
| Colonne    | Type         | Description       |
| ---------- | ------------ | ----------------- |
| id         | UUID (PK)    | Identifiant log   |
| user_id    | UUID (FK)    | Utilisateur       |
| action     | TEXT         | Action            |
| entity     | ENUM         | `PROJECT`, `TASK` |
| entity_id  | UUID         | ID concerné       |
| created_at | TIMESTAMP    | Date              |

- 🔗 **Relation** → audit_logs.user_id → users.id