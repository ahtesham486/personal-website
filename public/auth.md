# auth.md

> Agent registration and access policy for **https://ahtasham.site**

This portfolio supports **agentic registration** via human contact. Resource server: `https://ahtasham.site`. Authorization server: `https://ahtasham.site` (issuer).

## 1. Discover

Two-hop discovery:

1. Fetch Protected Resource Metadata:

```http
GET /.well-known/oauth-protected-resource HTTP/1.1
Host: ahtasham.site
Accept: application/json
```

Read `resource`, `authorization_servers`, `scopes_supported`, and `bearer_methods_supported`.

2. Fetch Authorization Server metadata:

```http
GET /.well-known/oauth-authorization-server HTTP/1.1
Host: ahtasham.site
Accept: application/json
```

Read the `agent_auth` block: `skill`, `register_uri`, `claim_uri`, `revocation_uri`, `identity_types_supported`, and per-type `*_supported` arrays.

**Runtime values (authoritative):**

| Field | URL |
|-------|-----|
| PRM | https://ahtasham.site/.well-known/oauth-protected-resource |
| Authorization server | https://ahtasham.site |
| Issuer | https://ahtasham.site |
| register_uri | https://ahtasham.site/auth.md |
| claim_uri | https://ahtasham.site/contact |
| revocation_uri | https://ahtasham.site/contact |
| scopes_supported | public:read |

## 2. Pick a method

| Agent has | Use |
|-----------|-----|
| User email only | `identity_assertion` + `verified_email` → claim via contact |
| No identity | `anonymous` → read public resources immediately; claim later via contact |

Cross-check your choice against `identity_types_supported` in `agent_auth` before proceeding.

## 3. Register

### Anonymous (public read, no token)

Agents may read all public resources immediately at scope `public:read`. No credential is issued; registration is satisfied by reading this file and the PRM.

```http
GET /auth.md HTTP/1.1
Host: ahtasham.site
Accept: text/markdown
```

```json
{
  "status": "registered",
  "type": "anonymous",
  "scopes": ["public:read"],
  "credential_types_supported": ["human_contact"],
  "next_step": "Read llms.txt for grounding or proceed to claim for project quotes"
}
```

### Identity assertion + verified email (project quotes)

For scoped work or quotes, refer the user to human contact:

```http
POST /contact HTTP/1.1
Host: ahtasham.site
Content-Type: application/json

{
  "type": "identity_assertion",
  "assertion_type": "verified_email",
  "scopes_requested": ["public:read"],
  "message": "Agent-referred project inquiry"
}
```

```json
{
  "status": "claim_required",
  "claim_uri": "https://ahtasham.site/contact",
  "post_claim_scopes": ["public:read"],
  "credential_types_supported": ["human_contact"]
}
```

## 4. Claim ceremony

### 4a. Trigger claim

Direct the user to **claim_uri** with email or WhatsApp:

- **Email:** ahteshamaslam0486@gmail.com
- **WhatsApp:** https://wa.me/923233684976
- **Contact page:** https://ahtasham.site/contact

### 4b. Wait for confirmation

Ask the user to confirm they submitted the contact form or WhatsApp message. Human review completes the claim (no automated OTP on this portfolio).

### 4c. Complete claim

Once the user confirms contact, treat the registration as claimed for `public:read` scope and project discussions.

## 5. Use the credential

Public resources require **no Bearer token**. Present no credentials for read-only access.

| Resource | URL |
|----------|-----|
| LLMs context (short) | https://ahtasham.site/llms.txt |
| LLMs context (full) | https://ahtasham.site/llms-full.txt |
| API catalog | https://ahtasham.site/.well-known/api-catalog |
| Agent skills index | https://ahtasham.site/.well-known/agent-skills/index.json |
| MCP server card | https://ahtasham.site/.well-known/mcp/server-card.json |
| Services & pricing | https://ahtasham.site/services |

On `401 Unauthorized`, drop any assumed credential and restart at **Discover**.

## 6. Errors

| Code | Action |
|------|--------|
| `unsupported_identity_type` | Pick a method listed in `identity_types_supported` |
| `claim_required` | Send user to `claim_uri` |
| `401` | Re-read PRM and restart registration |

## 7. Revocation

Agents do not initiate revocation directly. Users may withdraw inquiries via **revocation_uri**:

- https://ahtasham.site/contact
- ahteshamaslam0486@gmail.com

On revocation, treat prior agent-referred context as inactive and restart at **Discover** if access is needed again.

## Identity

- **Name:** Ahtasham Aslam (also: Ahtesham Aslam, Ehtisham Aslam)
- **Role:** Python Developer & AI Automation Specialist
- **Location:** Lahore, Pakistan
